import { inject, Injectable } from '@angular/core';
import { EmployeeStatus } from '../entities';
import { catchError, Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmployeeStatusService {

  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;

  fetchAllEmployeeStatus (): Observable<EmployeeStatus[]> {
    return this.http.get<EmployeeStatus[]>(`${this.apiUrl}/employee_statuses`);
  }

}
