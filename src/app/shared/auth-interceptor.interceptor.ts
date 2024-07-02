import { inject, Injectable } from '@angular/core';
import { HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { AuthentificationService } from './services/authentification.service';
import { AllowedUrl } from './entities';

export const allowedUrls: AllowedUrl[] = [
  { url: '/login_check', methods: ['POST'] },
  { url: '/customers', methods: ['POST'] }, 
  { url: '/cities', methods: ['GET'] },
  { url: '/civilities', methods: ['GET'] }
];

Injectable({
  providedIn: 'root'
})
export const AuthInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next) => {

  const authService = inject(AuthentificationService);
  const authToken = authService.getToken();
  
  const isAllowedRequest = allowedUrls.some(allowed => 
    req.url.includes(allowed.url) && allowed.methods.includes(req.method)
  );

  if(isAllowedRequest) {

    return next(req);

  } else {
    const authReq = req.clone({
      setHeaders: {
        Authorization: "Bearer " + authToken
      }
    });
  
    return next(authReq);
  }


};

