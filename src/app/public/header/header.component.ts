import { AfterViewInit, ChangeDetectorRef, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthentificationService } from '../../shared/services/authentification.service';
import { CommonModule } from '@angular/common';
import { UserService } from '../../shared/services/user.service';
import { IconCartComponent } from "../../components/icon-cart/icon-cart.component";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, CommonModule, IconCartComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements AfterViewInit {
  auth = inject(AuthentificationService);
  userService = inject(UserService);
  isAuthenticated!: boolean;
  role?:string|null;

  constructor(private cdr: ChangeDetectorRef){}

  ngAfterViewInit(): void {
    this.auth.isAuthenticated$.subscribe(isAuthenticated => {
      this.isAuthenticated = isAuthenticated;
      if(this.userService.getRoles()?.includes('ROLE_ADMIN')){
        this.role = "admin";
      } else if (this.userService.getRoles()?.includes('ROLE_EMPLOYEE')){
        this.role = "employe";
      } else if (this.userService.getRoles()?.includes('ROLE_CUSTOMER')){
        this.role = "client";
      }
      this.cdr.detectChanges();
    })

  }


  
}
