import { Component, inject } from '@angular/core';
import { UserService } from '../../../shared/services/user.service';

@Component({
  selector: 'app-customer-home',
  standalone: true,
  imports: [],
  templateUrl: './customer-home.component.html',
  styleUrl: './customer-home.component.css'
})
export class CustomerHomeComponent {
  private userService = inject(UserService);

  user = this.userService.getUser();

}
