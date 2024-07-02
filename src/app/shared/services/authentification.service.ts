import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { UserAuthen } from '../entities';
import { apiUrl } from '../../app.config';

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {

  headers = new HttpHeaders().set('Content-Type', 'application/json');

  private isAuthenticated = new BehaviorSubject<boolean>(this.checkIfAuthenticated());
  isAuthenticated$ = this.isAuthenticated.asObservable();
  private router = inject(Router);
  private http = inject(HttpClient);

  login(userAuthen: UserAuthen): Observable<any> {
    return this.http
      .post<any>(`${apiUrl}/login_check`, userAuthen)
      .pipe(
        tap(response => {
          if (response.token != null) {
            this.isAuthenticated.next(true);
            localStorage.setItem('access_token', response.token);
            this.router.navigateByUrl('/');
          }
        })
      )
  }

  logout() {
    this.isAuthenticated.next(false);
    localStorage.removeItem('access_token');
    localStorage.removeItem('user');
    this.router.navigateByUrl('/');
  }

  getToken() {
    return localStorage.getItem('access_token');
  }

  checkIfAuthenticated(): boolean {
    return localStorage.getItem('access_token') != null ? true : false;
  }

}
