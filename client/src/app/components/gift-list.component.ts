import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GiftService } from '../services/gift.service';
import { Gift } from '../models/gift.model';

@Component({
  selector: 'app-gift-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './gift-list.component.html',
  styleUrls: ['./gift-list.component.css'],
})
export class GiftListComponent implements OnInit {
  gifts: Gift[] = [];

  constructor(private giftService: GiftService) {}

  ngOnInit() {
    this.giftService.getGifts().subscribe((data) => {
      this.gifts = data;
    });
  }
}
