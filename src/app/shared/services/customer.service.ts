import { inject, Injectable } from '@angular/core';
import { newCustomer } from '../entities';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;

  addNewCustomer(newCustomer: newCustomer): Observable<newCustomer> {
    return this.http.post<newCustomer>(`${this.apiUrl}/customers`, newCustomer).pipe(
      catchError((error) => {
        console.error('Erreur lors de la création de votre compte', error);
        return throwError(() => error);
      })
    )
  }

}
