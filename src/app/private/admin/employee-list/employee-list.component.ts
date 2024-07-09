import { Component, inject, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Employee, OrderLine } from '../../../shared/entities';
import { EmployeeService } from '../../../shared/services/employee.service';
import { OrderLineService } from '../../../shared/services/order-line.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.css'
})
export class EmployeeListComponent implements OnInit {

  employeesService = inject(EmployeeService);
  orderLineService = inject(OrderLineService);

  employees$!: Observable<Employee[]>;
  orderLinesCoursMap: Map<string, OrderLine[]> = new Map<string, OrderLine[]>();
  orderLinesAttenteMap: Map<string, OrderLine[]> = new Map<string, OrderLine[]>();

  ngOnInit(): void {
    this.fetchAllEmployees();
  }

  fetchAllEmployees() {
    this.employees$ = this.employeesService.fetchAllEmployees();
    this.employees$.subscribe(employees => {
      employees.forEach(employee => {
        this.fetchLineEnCours(employee.firstname);
        this.fetchLineEnAttente(employee.firstname);
      });
    });
  }

  fetchLineEnCours(firstName: string) {
    this.orderLineService.fetchOrderLineByStatusAndEmployee(firstName, 'cours').subscribe(
      (data: OrderLine[]) => {
        this.orderLinesCoursMap.set(firstName, data);
      }
    );
  }

  fetchLineEnAttente(firstName: string) {
    this.orderLineService.fetchOrderLineByStatusAndEmployee(firstName, 'attente').subscribe(
      (data: OrderLine[]) => {
        this.orderLinesAttenteMap.set(firstName, data); 
      }
    );
  }

}
