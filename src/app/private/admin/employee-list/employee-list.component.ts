import { Component, inject, OnInit, Pipe } from '@angular/core';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Employee, OrderLine } from '../../../shared/entities';
import { EmployeeService } from '../../../shared/services/employee.service';
import { OrderLineService } from '../../../shared/services/order-line.service';
import { RouterLink } from '@angular/router';
import { StatusOrderLineCountPipe } from '../../../shared/services/pipes/status-order-line-count.pipe';


@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [CommonModule, RouterLink, StatusOrderLineCountPipe],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.css'
})
export class EmployeeListComponent implements OnInit {

  employeesService = inject(EmployeeService);

  employees$!: Observable<Employee[]>;


  ngOnInit(): void {
    this.fetchAllEmployees();
  }

  fetchAllEmployees() {
    this.employees$ = this.employeesService.fetchAllEmployees();
  }


}
