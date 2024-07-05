import { CanActivateFn } from '@angular/router';
import { inject } from "@angular/core";
import { Router } from "@angular/router";
import { AuthentificationService } from './services/authentification.service';

export const authGuard: CanActivateFn = () => {

  const auth = inject(AuthentificationService);
  const router = inject(Router);

  if(!auth.checkIfAuthenticated()) {
      router.navigateByUrl('login')
      return false
  }
  return true
  
};
