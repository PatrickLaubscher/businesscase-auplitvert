import { inject, Injectable } from '@angular/core';
import { ApiListResponse, Order } from '../entities';
import { catchError, map, Observable, throwError } from 'rxjs';
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
    return this.http.get<ApiListResponse<Order>>(`${this.apiUrl}/orders?page=${pageParam}&size=${sizeParam}`).pipe(
      map(response => response['hydra:member'])
    );
  }

}
