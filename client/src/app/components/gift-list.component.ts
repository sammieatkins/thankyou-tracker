import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GiftService } from '../services/gift.service';
import { ThankYouEntry } from '../models/thankYouEntry.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-gift-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
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
  progressFilter: string = 'all';
  sortOption: string = 'dateDesc';
  mustBeDone: string = '';
  mustBeNotDone: string = '';

  constructor(private giftService: GiftService) {}

  ngOnInit() {
    this.giftService.getGifts().subscribe((data) => {
      this.gifts = data;
    });
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

    // Progress Filter
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

    // Sorting
    return filtered.sort((a, b) => {
      if (this.sortOption === 'dateAsc') {
        return a.dateReceived.localeCompare(b.dateReceived);
      }
      if (this.sortOption === 'dateDesc') {
        return b.dateReceived.localeCompare(a.dateReceived);
      }
      const nameA = (a.preferredName || a.giverName || '').toLowerCase();
      const nameB = (b.preferredName || b.giverName || '').toLowerCase();
      if (this.sortOption === 'nameAsc') {
        return nameA.localeCompare(nameB);
      }
      if (this.sortOption === 'nameDesc') {
        return nameB.localeCompare(nameA);
      }
      return 0;
    });
  }
}
