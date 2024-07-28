import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { ApiListResponse, ApiRessource, OrderLineStatus } from '../entities';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderLineStatusService {

  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;

  orderLineStatus:OrderLineStatus[] = [];

  fetchAllOrderLineStatus (): Observable<OrderLineStatus[]> {
    return this.http.get<ApiListResponse<OrderLineStatus>>(`${this.apiUrl}/order_line_statuses`).pipe(
      map(response => response['hydra:member'])
    );
  }

  searchOrderLineStatusByName (name: string): Observable<OrderLineStatus> {
    return this.http.get<ApiRessource<OrderLineStatus>>(`${this.apiUrl}/order_line_statuses?name=${name}`).pipe(
      map(response => response['hydra:member'][0])
    );
  }

}
