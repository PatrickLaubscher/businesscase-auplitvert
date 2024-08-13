import { Component, inject, OnInit } from '@angular/core';
import { OrderService } from '../../../shared/services/order.service';
import { BehaviorSubject, map, Observable, switchMap } from 'rxjs';
import { Order } from '../../../shared/entities';
import { CommonModule } from '@angular/common';
import { CountPipe } from '../../../shared/services/pipes/count.pipe';
import { StatusOrderLineCountPipe } from '../../../shared/services/pipes/status-order-line-count.pipe';
import { CheckIfOrderFinishedStatusLinePipe } from '../../../shared/services/pipes/check-if-order-finished-status-line.pipe';
import { RouterLink } from '@angular/router';
import { UserService } from '../../../shared/services/user.service';
import { CustomerService } from '../../../shared/services/customer.service';



@Component({
  selector: 'app-order-list-customer',
  standalone: true,
  imports: [CommonModule, CountPipe, StatusOrderLineCountPipe, CheckIfOrderFinishedStatusLinePipe, RouterLink],
  templateUrl: './order-list-customer.component.html',
  styleUrl: './order-list-customer.component.css'
})
export class OrderListCustomerComponent {
  
  userService = inject(UserService);
  customerService = inject(CustomerService);
  orderService = inject(OrderService);
  orderListCustomer$! : Observable<Order[]>;

  ngOnInit(): void {
    this.fetchAllOrders();
  }

  fetchAllOrders() {
    let user = this.userService.getUser();
    if (user) {
      this.orderListCustomer$ = this.customerService.fetchOrderByCustomerId(user.id);
    }
    this.orderListCustomer$.subscribe(
      data => console.log(data)
    )
  }



}

