import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GiftListComponent } from './components/gift-list.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, GiftListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'client';
}
