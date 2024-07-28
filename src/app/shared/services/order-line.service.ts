import { inject, Injectable } from '@angular/core';
import { ApiListResponse, NewOrderLine, OrderLine } from '../entities';
import { catchError, map, Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';



@Injectable({
  providedIn: 'root'
})
export class OrderLineService {

  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;
  private headers = new HttpHeaders({
    'Content-Type': 'application/ld+json'
  });

  orderLines:OrderLine[] = [];


  fetchAllOrderLines(): Observable<OrderLine[]> {
    return this.http.get<ApiListResponse<OrderLine>>(`${this.apiUrl}/order_lines`).pipe(
      map(response => response['hydra:member'])
    );
  }


  fetchAllOrderLinesPaginate(page:number, size:number=30): Observable<OrderLine[]> {
    let pageParam = page.toString();
    let sizeParam = size.toString();
    return this.http.get<ApiListResponse<OrderLine>>(`${this.apiUrl}/order_lines?page=${pageParam}&size=${sizeParam}`).pipe(
      map(response => response['hydra:member'])
    );
  }


  fetchOneOrderLine(id:number|null): Observable<OrderLine> {
    let idParam = id?.toString();
    return this.http.get<OrderLine>(`${this.apiUrl}/order_lines/${idParam}`);
  }


  fetchOrderLineWithoutEmployee(): Observable<OrderLine[]> {
    return this.http.get<ApiListResponse<OrderLine>>(`${this.apiUrl}/order_lines/?exists[employee]=false`).pipe(
      map(response => response['hydra:member'])
    );
  }


  fetchOrderLineByStatusAndEmployee(firstname: string, status:string): Observable<OrderLine[]> {
    return this.http.get<ApiListResponse<OrderLine>>(`${this.apiUrl}/order_lines/?employee.firstname=${firstname}&order_line_status.name=${status}`).pipe(
      map(response => response['hydra:member'])
    );;
  }


  updateOrderLine (id:number, orderLine:OrderLine): Observable<OrderLine> {
    let idParam = id?.toString();
    return this.http.patch<OrderLine>(`${this.apiUrl}/order_lines/${idParam}`, orderLine,{
      headers: {
        'Content-Type': 'application/merge-patch+json'
      }
    }).pipe(
      catchError((error) => {
        console.error('Erreur lors de la modification des informations', error);
        return throwError(() => error);
      })
    )
  }

  addNewOrderLine (newOrderLine: NewOrderLine): Observable<OrderLine> {
    return this.http.post<OrderLine>(`${this.apiUrl}/order_lines`, newOrderLine, {'headers': this.headers}).pipe(
      catchError((error) => {
        console.error('Erreur lors de la création de la ligne de commande', error);
        return throwError(() => error);
      })
    )
  }

  deleteOrderLine (id:number) {
    let idParam = id?.toString();
    return this.http.delete(`${this.apiUrl}/order_lines/${idParam}`).pipe(
      catchError((error) => {
        console.error('Erreur lors de la suppression de la ligne de commande', error);
        return throwError(() => error);
      })
    );
  }

}
