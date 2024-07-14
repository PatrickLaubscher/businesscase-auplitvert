import { inject, Injectable } from '@angular/core';
import { Order } from '../entities';
import { catchError, Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;

  fetchAllOrders (page:number, size:number=30): Observable<Order[]> {
    let pageParam = page.toString();
    let sizeParam = size.toString();
    return this.http.get<Order[]>(`${this.apiUrl}/orders?page=${pageParam}&size=${sizeParam}`);
  }

}
