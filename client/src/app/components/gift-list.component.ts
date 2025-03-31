import { Component, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GiftService } from '../services/gift.service';
import { ThankYouEntry } from '../models/thankYouEntry.model';
import { FormsModule } from '@angular/forms';
import { GiftFormComponent } from '../components/gift-form.component';

@Component({
  selector: 'app-gift-list',
  standalone: true,
  imports: [CommonModule, FormsModule, GiftFormComponent],
  templateUrl: './gift-list.component.html',
  styleUrls: ['./gift-list.component.css'],
})
export class GiftListComponent implements OnInit {
  gifts: ThankYouEntry[] = [];
  progressKeys: (keyof ThankYouEntry['progress'])[] = [
    'written',
    'addressed',
    'stuffed',
    'stamped',
    'sent',
  ];
  private _progressFilter: string = 'all';
  get progressFilter(): string {
    return this._progressFilter;
  }
  set progressFilter(value: string) {
    this._progressFilter = value;
    localStorage.setItem('progressFilter', value);
  }

  private _sortOption: string = 'dateDesc';
  get sortOption(): string {
    return this._sortOption;
  }
  set sortOption(value: string) {
    this._sortOption = value;
    localStorage.setItem('sortOption', value);
  }

  mustBeDone: string = '';
  mustBeNotDone: string = '';

  constructor(private giftService: GiftService) {}

  ngOnInit() {
    const savedProgress = localStorage.getItem('progressFilter');
    const savedSort = localStorage.getItem('sortOption');

    if (savedProgress) this.progressFilter = savedProgress;
    if (savedSort) this.sortOption = savedSort;

    this.giftService.getGifts().subscribe((data) => {
      this.gifts = data;
    });
  }

  saveFilters() {
    localStorage.setItem('progressFilter', this.progressFilter);
    localStorage.setItem('sortOption', this.sortOption);
  }

  toggleProgress(gift: ThankYouEntry, step: keyof ThankYouEntry['progress']) {
    const updatedGift: ThankYouEntry = {
      ...gift,
      progress: {
        ...gift.progress,
        [step]: !gift.progress[step],
      },
    };

    this.giftService.updateGift(gift._id!, updatedGift).subscribe((res) => {
      gift.progress[step] = !gift.progress[step]; // update locally on success
    });
  }

  get filteredGifts(): ThankYouEntry[] {
    let filtered = this.gifts;

    // Apply progress filter (excluding archived from the main list)
    if (this.progressFilter !== 'all') {
      filtered = filtered.filter((gift) => {
        if (this.progressFilter === 'complete') {
          return Object.values(gift.progress).every((v) => v);
        }
        return !gift.progress[
          this.progressFilter as keyof ThankYouEntry['progress']
        ];
      });
    }

    // 🧼 Filter out archived gifts so they don't show twice
    return filtered
      .filter((gift) => !this.isArchived(gift))
      .sort((a, b) => {
        if (this.sortOption === 'dateAsc') {
          return a.dateReceived.localeCompare(b.dateReceived);
        }
        if (this.sortOption === 'dateDesc') {
          return b.dateReceived.localeCompare(a.dateReceived);
        }
        const nameA = (a.giverName || '').toLowerCase();
        const nameB = (b.giverName || '').toLowerCase();

        if (this.sortOption === 'nameAsc') {
          return nameA.localeCompare(nameB);
        }
        if (this.sortOption === 'nameDesc') {
          return nameB.localeCompare(nameA);
        }
        return 0;
      });
  }

  isArchived(gift: ThankYouEntry): boolean {
    return Object.values(gift.progress).every((step) => step === true);
  }

  archivedGifts(): ThankYouEntry[] {
    return this.gifts
      .filter((gift) => this.isArchived(gift))
      .sort((a, b) => b.dateReceived.localeCompare(a.dateReceived));
  }

  showForm = false;

  editGift: ThankYouEntry | null = null;

  startEdit(gift: ThankYouEntry) {
    this.editGift = gift;
    this.showForm = true;
  }

  handleFormClose() {
    this.editGift = null;
    this.showForm = false;

    // Refresh the gift list to reflect new/updated data
    this.giftService.getGifts().subscribe((data) => {
      this.gifts = data;
    });
  }

  openMenuGift: ThankYouEntry | null = null;

  toggleMenu(gift: ThankYouEntry) {
    this.openMenuGift = this.openMenuGift === gift ? null : gift;
  }

  closeMenu() {
    this.openMenuGift = null;
  }

  deleteGift(gift: ThankYouEntry) {
    if (confirm(`Delete gift from ${gift.preferredName || gift.giverName}?`)) {
      this.giftService.deleteGift(gift._id!).subscribe(() => {
        this.gifts = this.gifts.filter((g) => g._id !== gift._id);
        this.closeMenu();
      });
    }
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (!target.closest('.card-menu-wrapper')) {
      this.openMenuGift = null;
    }
  }

  @HostListener('document:keydown.escape', ['$event'])
  onEscape(event: KeyboardEvent) {
    this.openMenuGift = null;
  }
}
