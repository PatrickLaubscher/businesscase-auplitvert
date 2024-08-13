import { inject, Injectable } from '@angular/core';
import { ApiRessource, Customer, newCustomer, Order } from '../entities';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, Observable, of, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;
  private headers = new HttpHeaders({
    'Content-Type': 'application/ld+json'
  });

  addNewCustomer(newCustomer: newCustomer): Observable<newCustomer> {
    return this.http.post<newCustomer>(`${this.apiUrl}/customers`, newCustomer, {'headers': this.headers}).pipe(
      catchError((error) => {
        console.error('Erreur lors de la création de votre compte', error);
        return throwError(() => error);
      })
    )
  }

  fetchOrderByCustomerId (id:number): Observable<Order[]> {
    const customerId = id.toString();
    return this.http.get<Customer>(`${this.apiUrl}/customers/${customerId}`).pipe(
      map( customer => customer.orders || [] ),
      catchError(error => {
        console.error('Erreur lors de la récupération des lignes de commandes', error);
        return of([]); 
    })
    )
  }

}
