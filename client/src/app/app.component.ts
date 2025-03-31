import { Component } from '@angular/core';
import { GiftListComponent } from './components/gift-list.component';

@Component({
  selector: 'app-root',
  imports: [GiftListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'client';
}
