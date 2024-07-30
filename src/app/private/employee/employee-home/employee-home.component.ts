import { Component, inject } from '@angular/core';
import { UserService } from '../../../shared/services/user.service';

@Component({
  selector: 'app-employee-home',
  standalone: true,
  imports: [],
  templateUrl: './employee-home.component.html',
  styleUrl: './employee-home.component.css'
})
export class EmployeeHomeComponent {
  private userService = inject(UserService);

  user = this.userService.getUser();
}
