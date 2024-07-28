import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, Observable, tap, throwError } from 'rxjs';
import { Credentials, Token } from '../entities';
import { environment } from '../../../environments/environment';



@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {

  private apiUrl = environment.apiUrl;
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  private isAuthenticated = new BehaviorSubject<boolean>(this.checkIfAuthenticated());
  isAuthenticated$ = this.isAuthenticated.asObservable();
  private router = inject(Router);
  private http = inject(HttpClient);

  login(credentials: Credentials): Observable<Token> {
    return this.http
      .post<Token>(`${this.apiUrl}/login_check`, credentials)
      .pipe(
        tap(response => {
          if (response.token != null) {
            this.isAuthenticated.next(true);
            this.setToken(response.token);
            this.setRefreshToken(response.refresh_token);
          }
        }),
        catchError((error) => {
          return throwError(() => error);
        }
        )
      )
  }

  logout():void {
    this.isAuthenticated.next(false);
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
    this.router.navigateByUrl('/');
  }

  setToken(token: string):void  {
    return localStorage.setItem('accessToken', token);
  }

  getToken():string | null {
    return localStorage.getItem('accessToken');
  }

  setRefreshToken(refreshToken: string):void  {
    if(this.getRefreshToken()) {
      localStorage.removeItem('refreshToken');
    }
    return localStorage.setItem('refreshToken', refreshToken);
  }

  getRefreshToken():string | null {
    return localStorage.getItem('refreshToken');
  }


  refreshAccessToken(): Observable<Token> {
    localStorage.removeItem('accessToken');
    const refreshToken = this.getRefreshToken();
    return this.http
      .post<Token>(`${this.apiUrl}/token/refresh`, {refresh_token: refreshToken })
      .pipe(
      tap(response => { 
        this.setToken(response.token);
      }),
      catchError(error => {
        console.error('Error refreshing access token:', error);
        return throwError(() => error);
      })
    );
  }

  checkIfAuthenticated(): boolean {
    const token = this.getRefreshToken();
    return !!token;
  }

}
