import { inject, Injectable } from '@angular/core';
import { ApiListResponse, EmployeeStatus } from '../entities';
import { catchError, map, Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmployeeStatusService {

  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;

  fetchAllEmployeeStatus (): Observable<EmployeeStatus[]> {
    return this.http.get<ApiListResponse<EmployeeStatus>>(`${this.apiUrl}/employee_statuses`).pipe(
      map(response => response['hydra:member'])
    );
  }

  
}
