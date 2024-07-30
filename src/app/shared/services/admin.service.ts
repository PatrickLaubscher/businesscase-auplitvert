import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { newAdmin } from '../entities';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;
  private headers = new HttpHeaders({
    'Content-Type': 'application/ld+json'
  });


  addNewAdmin(newAdmin: newAdmin): Observable<newAdmin> {
    return this.http.post<newAdmin>(`${this.apiUrl}/admins`, newAdmin, {'headers': this.headers}).pipe(
      catchError((error) => {
        console.error('Erreur lors de la création du compte', error);
        return throwError(() => error);
      })
    )
  }




}
