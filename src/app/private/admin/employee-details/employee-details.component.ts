import { Component, inject, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Civility, Employee, EmployeeStatus, patchEmployee} from '../../../shared/entities';
import { UserService } from '../../../shared/services/user.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CivilityService } from '../../../shared/services/civility.service';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { EmployeeStatusService } from '../../../shared/services/employee-status.service';
import { EmployeeService } from '../../../shared/services/employee.service';
import {
  MatDialog
} from '@angular/material/dialog';
import { DialogDeleteConfirmComponent } from '../../../dialog-delete-confirm/dialog-delete-confirm.component';



@Component({
  selector: 'app-employee-details',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, DialogDeleteConfirmComponent],
  templateUrl: './employee-details.component.html',
  styleUrl: './employee-details.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmployeeDetailsComponent implements OnInit {

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private userService = inject(UserService);
  private civilityService = inject(CivilityService);
  private employeeService = inject(EmployeeService);
  private employeeStatusService = inject(EmployeeStatusService);
  readonly dialog = inject(MatDialog);
  id!:string;
  employee$:Employee | undefined;
  civilities$!: Observable<Civility[]>;
  employeeStatus$!: Observable<EmployeeStatus[]>;
  

  form: FormGroup = new FormGroup({
    civility: new FormControl('', {validators: [Validators.required]}),
    firstname: new FormControl('', {validators: [Validators.required]}),
    lastname: new FormControl('', {validators: [Validators.required]}),
    email: new FormControl('', {validators: [Validators.required, Validators.email]}),
    phone: new FormControl('', {validators: [Validators.required]}),
    }
  )

  formStatus: FormGroup = new FormGroup({
    employee_status: new FormControl('', {validators: [Validators.required]})
  })

  fetchOneEmployee () {
    let idSearch = this.route.snapshot.paramMap.get('id');
    if(idSearch  != null) {
      this.userService.fetchOneUserEmployeeById(idSearch).subscribe({
        next: (data) => {this.employee$ = data;
          this.loadFormDefaultValues();
          this.loadFormStatusDefaultValues();
          this.id = idSearch;},
        error: () => {
          console.log('Erreur dans la récupération des données');
        }
        } 
      ) 
    } else {
      console.error('Aucune ID dans les paramètres');
    }
    
  }

  loadFormDefaultValues() {
    if (this.employee$) {
      this.form.patchValue({
        lastname: this.employee$.lastname,
        firstname: this.employee$.firstname,
        phone: this.employee$.phone,
        email: this.employee$.email,
        civility: this.employee$.civility.id
      });
    }
  }

  loadFormStatusDefaultValues() {
    if (this.employee$) {
      this.formStatus.patchValue({
        employee_status: this.employee$.employee_status.id
      });
    }
  }

  ngOnInit():void {
    this.civilities$ = this.civilityService.fetchAllCivilities();
    this.employeeStatus$ = this.employeeStatusService.fetchAllEmployeeStatus();
    this.fetchOneEmployee();
  }

  updateEmpoyeeDetails(id: string, employee:patchEmployee): Observable<patchEmployee|undefined> {
    return this.userService.updateUserEmployee(id, employee);
  }
  
  onSubmitForm(event: Event) {
    event.preventDefault();
    if(this.form.valid) { 
      const employee:patchEmployee = {
        lastname: this.form.value.lastname,
        firstname : this.form.value.firstname,
        phone: this.form.value.phone,
        email: this.form.value.email,
        civility: 'api/civilities/' + this.form.value.civility
      };
      this.updateEmpoyeeDetails(this.id, employee).subscribe(
        {    
          next: (validation) => {console.log('Les modifications ont été effectuées') 
            this.form.reset();
            location.reload();
          },
          error: (error) => console.error('Il y a eu une erreur lors de la modification des informations du compte'),
        });
    }
  }

  onSubmitFormStatus(event: Event) {
    event.preventDefault();
    if(this.formStatus.valid) { 
      const newStatus:object = {
        employee_status: 'api/employee_statuses/' + this.formStatus.value.employee_status
      };
      console.log(newStatus);
      this.employeeService.updateStatusEmployee(this.id, newStatus).subscribe(
        {    
          next: () => {console.log('Les modifications ont été effectuées') 
            this.form.reset();
            location.reload();
          },
          error: (error) => console.error('Il y a eu une erreur lors de la modification des informations du compte'),
        });
    }
  }

  
  deleteEmployeeAccount() {
    const employee:patchEmployee = {
      lastname: 'anonyme',
      firstname : 'anonyme',
      phone: ' ',
      email: 'anonyme@mail.com',
      civility: 'api/civilities/' + this.form.value.civility
    };

    return this.updateEmpoyeeDetails(this.id, employee).subscribe(
    {    
      next: (validation) => {console.log('Le compte a été supprimé') 
        this.form.reset();
        location.reload();
      },
      error: (error) => console.error('Il y a eu une erreur lors de la modification des informations du compte'),
    });

  }

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    const dialogRef = this.dialog.open(DialogDeleteConfirmComponent, {
      width: '500px',
      enterAnimationDuration,
      exitAnimationDuration,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.deleteEmployeeAccount();
      }
    });

  }


} 
