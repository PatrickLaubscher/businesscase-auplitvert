import { Component, inject } from '@angular/core';
import { OrderLineService } from '../../../shared/services/order-line.service';
import { Observable } from 'rxjs';
import { Employee, OrderLine } from '../../../shared/entities';
import { CommonModule } from '@angular/common';
import { EmployeeService } from '../../../shared/services/employee.service';
import { StatusOrderLineCountPipe } from '../../../shared/services/pipes/status-order-line-count.pipe';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-attribution-order',
  standalone: true,
  imports: [CommonModule, StatusOrderLineCountPipe, ReactiveFormsModule],
  templateUrl: './attribution-order.component.html',
  styleUrl: './attribution-order.component.css'
})
export class AttributionOrderComponent {

  orderLineService = inject(OrderLineService);
  employeesService = inject(EmployeeService);
  private router = inject(Router);

  noEmployeeOrderLineList$!: Observable<OrderLine[]>;
  employees$! : Observable<Employee[]>;

  form: FormGroup = new FormGroup({
    employeeId: new FormControl('', {validators: [Validators.required]})
    }, 
  )

  ngOnInit(): void {
    this.fetchOrderLineWithoutEmployee();
    this.fetchAllEmployees();
  }


  fetchOrderLineWithoutEmployee() {
    this.noEmployeeOrderLineList$ = this.orderLineService.fetchOrderLineWithoutEmployee();
  }

  fetchAllEmployees() {
    this.employees$ = this.employeesService.fetchAllEmployees();
  }

  
  onSubmit(orderLineId:number) {
    if(this.form.valid) { 

      const employeeId:number = this.form.value.employeeId;

      this.form.reset();
      this.router.navigateByUrl('/espace-prive/admin/attribution-commandes');
  
      this.orderLineService.updateOrderLineEmployee(orderLineId ,employeeId).subscribe({    
        next: () => {console.log('La catégorie a bien été modifiée')
         },
        error: (error) => console.error('Il y a eu une erreur dans la modification'),
        complete: () => {location.reload()}
      });
    }
  }



}
