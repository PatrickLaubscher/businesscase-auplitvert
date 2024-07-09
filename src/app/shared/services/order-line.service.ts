import { inject, Injectable } from '@angular/core';
import { Employee, OrderLine } from '../entities';
import { forkJoin, map, Observable, switchMap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';




@Injectable({
  providedIn: 'root'
})
export class OrderLineService {

  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;

  orderLines:OrderLine[] = [];

  fetchAllOrderLines(): Observable<OrderLine[]> {
    return this.http.get<OrderLine[]>(`${this.apiUrl}/order_lines`);
  }

  fetchOneOrderLine(id: string): Observable<OrderLine> {
    return this.http.get<OrderLine>(`${this.apiUrl}/order_lines/${id}`);
  }

  fetchOrderLineByStatusAndEmployee(firstname: string, status:string): Observable<OrderLine[]> {
    return this.http.get<OrderLine[]>(`${this.apiUrl}/order_lines/?employee.firstname=${firstname}&order_line_status.name=${status}`);
  }

}
