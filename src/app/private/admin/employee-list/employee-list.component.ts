import { Component, inject, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from '../../../shared/entities';
import { EmployeeService } from '../../../shared/services/employee.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.css'
})
export class EmployeeListComponent implements OnInit {

  employeeServuce = inject(EmployeeService);

  employees$!: Observable<Employee[]>;

  ngOnInit(): void {
    this.employees$ = this.employeeServuce.fetchAllEmployees();

    console.log(this.employees$);
  }


}
