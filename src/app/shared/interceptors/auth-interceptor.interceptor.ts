import { inject, Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { AuthentificationService } from '../services/authentification.service';
import { AllowedUrl } from '../entities';
import { catchError, Observable, switchMap, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';


export const allowedUrls: AllowedUrl[] = [
  { url: '/login_check', methods: ['POST'] },
  { url: '/customers', methods: ['POST'] }, 
  { url: '/cities', methods: ['GET'] },
  { url: '/prestations', methods: ['GET'] },
  { url: '/products', methods: ['GET'] },
  { url: '/categories', methods: ['GET'] },
  { url: '/civilities', methods: ['GET'] },

  { url: '/token/refresh', methods: ['POST'] }
];


Injectable({
  providedIn: 'root'
})
export function AuthInterceptor (req: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {

  const apiUrl = environment.apiUrl;
  const authService = inject(AuthentificationService);
  const authToken = authService.getToken();
  const router = inject(Router);
  
  const isAllowedRequest = allowedUrls.some(allowed => 
    req.url.includes(allowed.url) && allowed.methods.includes(req.method)
  );

  if(isAllowedRequest) {
    return next(req);
  } else {
    const authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${authToken}`
      }
    });
    
    return next(authReq).pipe(catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        return authService.refreshAccessToken().pipe(
          switchMap((response:any) => {
            const newAccessToken = response.token;
            const newAuthReq = req.clone({
              setHeaders: {
                Authorization: `Bearer ${newAccessToken}`
              }
            });
            return next(newAuthReq);
          }),
          catchError((error) => {
            console.error('Error handling expired access token:', error);
            router.navigateByUrl('login');
            return throwError(() => error);
          })
         );
      }
      return throwError(() => error);
      })
    )
  }


};

