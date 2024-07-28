import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthentificationService } from '../../../shared/services/authentification.service';

@Component({
  selector: 'app-customer-sidebar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './customer-sidebar.component.html',
  styleUrl: './customer-sidebar.component.css'
})
export class CustomerSidebarComponent {

  auth = inject(AuthentificationService);

}
