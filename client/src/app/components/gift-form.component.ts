import { Component } from '@angular/core';
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
  entry: ThankYouEntry = {
    giverName: '',
    preferredName: '',
    giftDescription: '',
    giftNote: '',
    dateReceived: new Date().toISOString().split('T')[0], // default to today
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
    this.giftService.addGift(this.entry).subscribe((newEntry) => {
      console.log('Gift saved!', newEntry);
      // optionally reset the form
    });
  }
}
