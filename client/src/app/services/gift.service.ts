import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ThankYouEntry } from '../models/thankYouEntry.model';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class GiftService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getGifts(): Observable<ThankYouEntry[]> {
    return this.http.get<ThankYouEntry[]>(this.apiUrl);
  }

  addGift(gift: ThankYouEntry): Observable<ThankYouEntry> {
    return this.http.post<ThankYouEntry>(this.apiUrl, gift);
  }

  updateGift(
    id: string,
    gift: Partial<ThankYouEntry>
  ): Observable<ThankYouEntry> {
    return this.http.put<ThankYouEntry>(`${this.apiUrl}/${id}`, gift);
  }

  deleteGift(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
