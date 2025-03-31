import { Component, EventEmitter, Output, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GiftService } from '../services/gift.service';
import { ThankYouEntry } from '../models/thankYouEntry.model';

@Component({
  selector: 'app-gift-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './gift-form.component.html',
  styleUrls: ['./gift-form.component.css'],
})
export class GiftFormComponent {
  @Output() formSubmitted = new EventEmitter<void>();

  entry: ThankYouEntry = {
    giverName: '',
    preferredName: '',
    giftDescription: '',
    giftNote: '',
    dateReceived: new Date().toISOString().split('T')[0],
    progress: {
      written: false,
      addressed: false,
      stuffed: false,
      stamped: false,
      sent: false,
    },
  };

  defaultGiftOptions = ['Cash', 'Gift Card', 'Other'];

  constructor(private giftService: GiftService) {}

  onSubmit() {
    if (this.existingGift && this.existingGift._id) {
      this.giftService
        .updateGift(this.existingGift._id, this.entry)
        .subscribe((updated) => {
          console.log('Gift updated!', updated);
          this.formSubmitted.emit();
        });
    } else {
      this.giftService.addGift(this.entry).subscribe((newEntry) => {
        console.log('Gift saved!', newEntry);
        this.formSubmitted.emit();
      });
    }
  }

  setGiftDescription(option: string) {
    this.entry.giftDescription = option;
  }

  @Input() existingGift: ThankYouEntry | null = null;

  ngOnInit() {
    if (this.existingGift) {
      this.entry = { ...this.existingGift };
    }
  }
}
