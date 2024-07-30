import { Component, inject } from '@angular/core';
import { AuthentificationService } from '../../../shared/services/authentification.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-employee-sidebar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './employee-sidebar.component.html',
  styleUrl: './employee-sidebar.component.css'
})
export class EmployeeSidebarComponent {
  auth = inject(AuthentificationService);
}
