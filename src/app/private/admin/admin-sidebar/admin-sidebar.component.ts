import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthentificationService } from '../../../shared/services/authentification.service';

@Component({
  selector: 'app-admin-sidebar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './admin-sidebar.component.html',
  styleUrl: './admin-sidebar.component.css'
})
export class AdminSidebarComponent {
  auth = inject(AuthentificationService);
}
