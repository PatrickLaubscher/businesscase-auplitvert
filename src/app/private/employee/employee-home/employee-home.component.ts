import { Component, inject } from '@angular/core';
import { UserService } from '../../../shared/services/user.service';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { OrderLineService } from '../../../shared/services/order-line.service';
import { Router } from '@angular/router';
import { OrderLineStatusService } from '../../../shared/services/order-line-status.service';
import { Observable } from 'rxjs';
import { OrderLine, OrderLineStatus } from '../../../shared/entities';
import { EmployeeService } from '../../../shared/services/employee.service';
import { StatusOrderLineCountPipe } from '../../../shared/services/pipes/status-order-line-count.pipe';


@Component({
  selector: 'app-employee-home',
  standalone: true,
  imports: [ RouterLink, CommonModule, StatusOrderLineCountPipe ],
  templateUrl: './employee-home.component.html',
  styleUrl: './employee-home.component.css'
})
export class EmployeeHomeComponent {
  
  userService = inject(UserService);
  employeeService = inject(EmployeeService);
  orderLineService = inject(OrderLineService);
  orderLineStatusService = inject(OrderLineStatusService);

  orderLineStatus$!: Observable<OrderLineStatus[]>;
  employeeOrderLine$!: Observable<OrderLine[]>;
  orderLines : OrderLine[] = [];

  user = this.userService.getUser();

  ngOnInit(): void {
    this.fetchAllOrderLineStatus();
    this.fetchEmployeeOrderLine();
  }

  fetchEmployeeOrderLine() {
    if(this.user) {
      this.employeeOrderLine$ = this.employeeService.fetchOrderLinesByEmployeeId(this.user.id);
      this.employeeOrderLine$.subscribe(
        data => {this.orderLines = data}
      )
    }
  }

  fetchAllOrderLineStatus() {
    this.orderLineStatus$ = this.orderLineStatusService.fetchAllOrderLineStatus();
  }


}
