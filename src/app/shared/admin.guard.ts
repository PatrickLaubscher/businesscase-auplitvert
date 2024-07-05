import { CanActivateFn } from '@angular/router';
import { inject } from "@angular/core";
import { Router } from "@angular/router";
import { UserService } from './services/user.service';

export const adminGuard: CanActivateFn = () => {

  const userService = inject(UserService);
  const router = inject(Router);

  if(!userService.getRoles()?.includes('ROLE_ADMIN')) {
      router.navigateByUrl('login')
      return false
  }
  return true;

};
