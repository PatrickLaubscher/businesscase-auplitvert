import { inject, Injectable } from '@angular/core';
import { ApiListResponse, Employee, newEmployee } from '../entities';
import { catchError, map, Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { OrderLineService } from './order-line.service';




@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;
  private headers = new HttpHeaders({
    'Content-Type': 'application/ld+json'
  });

  orderLineService = inject(OrderLineService);

  fetchAllEmployees (): Observable<Employee[]> {
    return this.http.get<ApiListResponse<Employee>>(`${this.apiUrl}/users?roles=EMPLOYEE`).pipe(
      map(response => response['hydra:member'])
    );
  }

  fetchOneEmployee (id:string|null): Observable<Employee> {
    return this.http.get<Employee>(`${this.apiUrl}/users?roles=EMPLOYEE&id=${id}`);
  }
  
  
  updateStatusEmployee (id:string, idNewStatus:object): Observable<Object|undefined> {
    return this.http.patch<Object>(`${this.apiUrl}/employees/${id}`, idNewStatus,{
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
  

  addNewEmployee(newEmployee: newEmployee): Observable<newEmployee> {
    return this.http.post<newEmployee>(`${this.apiUrl}/employees`, newEmployee, {'headers': this.headers}).pipe(
      catchError((error) => {
        console.error('Erreur lors de la création de votre compte', error);
        return throwError(() => error);
      })
    )
  }

  deleteEmployee(id:string) {
    return this.http.delete(`${this.apiUrl}/employees/${id}`).pipe(
      catchError((error) => {
        console.error('Erreur lors de la suppression du compte', error);
        return throwError(() => error);
      })
    );
  }

  
}
