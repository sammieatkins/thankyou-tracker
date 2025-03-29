import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Gift } from '../models/gift.model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class GiftService {
  private apiUrl = 'http://localhost:3000/api/gifts';

  constructor(private http: HttpClient) {}

  getGifts(): Observable<Gift[]> {
    return this.http.get<Gift[]>(this.apiUrl);
  }

  addGift(gift: Gift): Observable<Gift> {
    return this.http.post<Gift>(this.apiUrl, gift);
  }

  updateGift(id: string, gift: Partial<Gift>): Observable<Gift> {
    return this.http.put<Gift>(`${this.apiUrl}/${id}`, gift);
  }

  deleteGift(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
