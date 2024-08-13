import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { OrderLineService } from '../../../shared/services/order-line.service';
import { UserService } from '../../../shared/services/user.service';
import { Router } from '@angular/router';
import { OrderLineStatusService } from '../../../shared/services/order-line-status.service';
import { Observable } from 'rxjs';
import { Employee, OrderLine, OrderLineStatus } from '../../../shared/entities';
import { EmployeeService } from '../../../shared/services/employee.service';
import { StatusOrderLineCountPipe } from '../../../shared/services/pipes/status-order-line-count.pipe';
import { OrderlineStatusPipe } from '../../../shared/services/pipes/orderline-status.pipe';

@Component({
  selector: 'app-order-process-employee',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, StatusOrderLineCountPipe, OrderlineStatusPipe],
  templateUrl: './order-process-employee.component.html',
  styleUrl: './order-process-employee.component.css'
})
export class OrderProcessEmployeeComponent {

  userService = inject(UserService);
  employeeService = inject(EmployeeService);
  orderLineService = inject(OrderLineService);
  orderLineStatusService = inject(OrderLineStatusService);
  private router = inject(Router);

  orderLineStatus$!: Observable<OrderLineStatus[]>;
  employeeOrderLine$!: Observable<OrderLine[]>;
  orderLines : OrderLine[] = [];


  form: FormGroup = new FormGroup({
    orderStatusId: new FormControl('', {validators: [Validators.required]})
    }, 
  )

  ngOnInit(): void {
    this.fetchAllOrderLineStatus();
    this.fetchEmployeeOrderLine();
  }

  fetchEmployeeOrderLine() {
    let user = this.userService.getUser();
    if(user) {
      this.employeeOrderLine$ = this.employeeService.fetchOrderLinesByEmployeeId(user.id);
      this.employeeOrderLine$.subscribe(
        data => {this.orderLines = data}
      )
    }
  }

  fetchAllOrderLineStatus() {
    this.orderLineStatus$ = this.orderLineStatusService.fetchAllOrderLineStatus();
  }


  onSubmit(orderLineId:number) {
    if(this.form.valid) { 

      const orderStatusId:number = this.form.value.orderStatusId;
      this.form.reset();

      this.orderLineService.updateOrderLineStatus(orderLineId, orderStatusId).subscribe({    
        next: () => {console.log('Le statut a bien été modifié'); 
          this.router.navigateByUrl('/espace-prive/employe/traitement-commandes');
         },
        error: (error) => console.error('Il y a eu une erreur dans la modification'),
        complete: () => {location.reload()}
      });
    }
  }

}
