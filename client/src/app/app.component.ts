import { Component } from '@angular/core';
import { GiftListComponent } from './components/gift-list.component';
import { GiftFormComponent } from './components/gift-form.component';

@Component({
  selector: 'app-root',
  imports: [GiftFormComponent, GiftListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'client';
}
