import { Component } from '@angular/core';
import { CustomerSidebarComponent } from "../customer-sidebar/customer-sidebar.component";
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-customer-dashboard',
  standalone: true,
  imports: [RouterLink, RouterOutlet, CustomerSidebarComponent],
  templateUrl: './customer-dashboard.component.html',
  styleUrl: './customer-dashboard.component.css'
})
export class CustomerDashboardComponent {

}
