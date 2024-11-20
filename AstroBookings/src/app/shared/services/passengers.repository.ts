import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@app/env/environment';
import { PassengerDto } from '@app/models/passenger.dto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PassengersRepository {
  constructor(private http: HttpClient) {}

  getById$(id: string): Observable<PassengerDto> {
    const delay = Math.floor(Math.random() * 5000);
    const url = `${environment.apiUrl}/passengers/${id}?delay=${delay}`;
    return this.http.get<PassengerDto>(url);
  }
}
