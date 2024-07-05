import { Component, inject } from '@angular/core';
import { AuthentificationService } from '../../../shared/services/authentification.service';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AdminSidebarComponent } from '../admin-sidebar/admin-sidebar.component';
import { AdminHomeComponent } from '../admin-home/admin-home.component';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [RouterLink, RouterOutlet, AdminSidebarComponent, AdminHomeComponent],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent {
  auth = inject(AuthentificationService);

}
