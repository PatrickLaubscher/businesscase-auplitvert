import { Component, inject, OnInit } from '@angular/core';
import { CivilityService } from '../../../shared/services/civility.service';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { Civility, EmployeeStatus, newEmployee } from '../../../shared/entities';
import { EmployeeService } from '../../../shared/services/employee.service';
import { EmployeeStatusService } from '../../../shared/services/employee-status.service';
import { Router } from '@angular/router';


export const confirmPasswordValidator: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  return control.value.password === control.value.password_confirmation
    ? null
    : { PasswordNoMatch: true };
};


@Component({
  selector: 'app-add-employee',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './add-employee.component.html',
  styleUrl: './add-employee.component.css'
})
export class AddEmployeeComponent implements OnInit {

  private router = inject(Router);
  private civilityService = inject(CivilityService);
  private employeeService = inject(EmployeeService);
  private employeeStatusService = inject(EmployeeStatusService);

  civilities$!: Observable<Civility[]>;
  employeeStatus!:EmployeeStatus[];
  idActiveStatus!:string;


  form: FormGroup = new FormGroup({
    civility: new FormControl('', {validators: [Validators.required]}),
    firstname: new FormControl('', {validators: [Validators.required]}),
    lastname: new FormControl('', {validators: [Validators.required]}),
    email: new FormControl('', {validators: [Validators.required, Validators.email]}),
    phone: new FormControl('', {validators: [Validators.required]}),
    password: new FormControl('', {validators: [Validators.required, Validators.minLength(4)]}),
    password_confirmation: new FormControl('', {validators: [Validators.required]}),
    }, {validators: confirmPasswordValidator}
  )


  ngOnInit():void {
    this.civilities$ = this.civilityService.fetchAllCivilities();
    
    this.employeeStatusService.fetchAllEmployeeStatus().subscribe({    
      next: (data) => {this.employeeStatus = data, this.findActiveStatusId()},
      error: (error) => console.error('Erreur dans la récupération des status employés')
    });

  }

  findActiveStatusId(): void {
    const activeStatus = this.employeeStatus.find(status => status.name === 'Actif');
    if (activeStatus) {
      this.idActiveStatus = activeStatus.id.toString();
    } else {
      console.error('Statut "Actif" non trouvé');
    }
  }


  onSubmitForm() {
    if(this.form.valid) { 
      const date = new Date();
      const newEmployee:newEmployee = {
        creationDate: date.toISOString(),
        email : this.form.value.email,
        roles: ['ROLE_EMPLOYEE'],
        password : this.form.value.password,
        lastname: this.form.value.lastname,
        firstname : this.form.value.firstname,
        phone: this.form.value.phone,
        civility: 'api/civilities/' + this.form.value.civility,
        employee_status: 'api/employee_statuses/' + this.idActiveStatus
      };
      this.form.reset();
  
      this.employeeService.addNewEmployee(newEmployee).subscribe({    
        next: () => {console.log('Le compte de l\'employé(e) a bien été créé'),
          this.router.navigateByUrl('/espace-prive/admin/employes');
         },
        error: (error) => console.error('Il y a eu une erreur dans la création du compte'),
      });
    }
  }

}
