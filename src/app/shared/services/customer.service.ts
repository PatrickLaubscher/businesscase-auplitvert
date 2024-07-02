import { inject, Injectable } from '@angular/core';
import { newCustomer } from '../entities';
import { apiUrl } from '../../app.config';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private http = inject(HttpClient);
  private headers = new HttpHeaders({
    'Content-Type': 'application/ld+json',
    'Accept': 'application/ld+json'
  });

  addNewCustomer(newCustomer: newCustomer): Observable<newCustomer> {
    return this.http.post<newCustomer>(`${apiUrl}/customers`, newCustomer, {'headers': this.headers})
  }



}
