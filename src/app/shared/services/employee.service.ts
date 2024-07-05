import { inject, Injectable } from '@angular/core';
import { Employee } from '../entities';
import { map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';




@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;

  employees:Employee[] = [];

  fetchAllEmployees (): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.apiUrl}/users?roles=EMPLOYEE`);
  }

}
