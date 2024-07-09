import { inject, Injectable } from '@angular/core';
import { Employee, EmployeeStatus, newEmployee } from '../entities';
import { catchError, Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { OrderLineService } from './order-line.service';




@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;

  orderLineService = inject(OrderLineService);

  fetchAllEmployees (): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.apiUrl}/users?roles=EMPLOYEE`);
  }

  fetchOneEmployee (id:string|null): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.apiUrl}/users?roles=EMPLOYEE&id=${id}`);
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
    return this.http.post<newEmployee>(`${this.apiUrl}/employees`, newEmployee).pipe(
      catchError((error) => {
        console.error('Erreur lors de la création de votre compte', error);
        return throwError(() => error);
      })
    )
  }

  
}
