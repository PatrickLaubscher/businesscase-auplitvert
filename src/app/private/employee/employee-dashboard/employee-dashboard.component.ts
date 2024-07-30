import { Component, inject } from '@angular/core';
import { AuthentificationService } from '../../../shared/services/authentification.service';
import { EmployeeSidebarComponent } from '../employee-sidebar/employee-sidebar.component';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-employee-dashboard',
  standalone: true,
  imports: [RouterLink, RouterOutlet, EmployeeDashboardComponent, EmployeeSidebarComponent],
  templateUrl: './employee-dashboard.component.html',
  styleUrl: './employee-dashboard.component.css'
})
export class EmployeeDashboardComponent {
  auth = inject(AuthentificationService);
}
