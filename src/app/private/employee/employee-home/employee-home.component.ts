import { Component, inject } from '@angular/core';
import { UserService } from '../../../shared/services/user.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-employee-home',
  standalone: true,
  imports: [ RouterLink ],
  templateUrl: './employee-home.component.html',
  styleUrl: './employee-home.component.css'
})
export class EmployeeHomeComponent {
  private userService = inject(UserService);

  user = this.userService.getUser();
}
