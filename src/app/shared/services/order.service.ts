import { inject, Injectable } from '@angular/core';
import { ApiListResponse, NewOrder, Order } from '../entities';
import { catchError, map, Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;
  private headers = new HttpHeaders({
    'Content-Type': 'application/ld+json'
  });

  fetchAllOrders (page:number, size:number=30): Observable<Order[]> {
    let pageParam = page.toString();
    let sizeParam = size.toString();
    return this.http.get<ApiListResponse<Order>>(`${this.apiUrl}/orders?page=${pageParam}&size=${sizeParam}`).pipe(
      map(response => response['hydra:member'])
    );
  }

  fetchOneOrder (id:string): Observable<Order> {
    return this.http.get<Order>(`${this.apiUrl}/orders/${id}`);
  }

  addNewOrder (newOrder: NewOrder): Observable<Order> {
    return this.http.post<Order>(`${this.apiUrl}/orders`, newOrder, {'headers': this.headers}).pipe(
      catchError((error) => {
        console.error('Erreur lors de la création de la commande', error);
        return throwError(() => error);
      })
    )
  }

  deleteOrder (id:number) {
    let idParam = id?.toString();
    return this.http.delete(`${this.apiUrl}/orders/${idParam}`).pipe(
      catchError((error) => {
        console.error('Erreur lors de la suppression de la commande', error);
        return throwError(() => error);
      })
    );
  }

  setDepositDate(depositDate: string):void  {
    return localStorage.setItem('depositDate', depositDate);
  }

  getDepositDate(): string|null {
    return localStorage.getItem('depositDate');
  }

  removeDepositDate(): void {
    localStorage.removeItem('depositeDate');
  }

}
