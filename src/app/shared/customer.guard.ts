import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserService } from './services/user.service';

export const customerGuard: CanActivateFn = (route, state) => {
  
  const userService = inject(UserService);
  const router = inject(Router);

  if(!userService.getRoles()?.includes('ROLE_CUSTOMER')) {
      router.navigateByUrl('login')
      return false
  }
  return true;

};
