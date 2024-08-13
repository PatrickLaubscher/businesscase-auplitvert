import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CivilityService } from '../../../shared/services/civility.service';
import { AdminService } from '../../../shared/services/admin.service';
import { Observable } from 'rxjs';
import { Civility, newAdmin } from '../../../shared/entities';

export const confirmPasswordValidator: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  return control.value.password === control.value.password_confirmation
    ? null
    : { PasswordNoMatch: true };
};


@Component({
  selector: 'app-add-admin',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './add-admin.component.html',
  styleUrl: './add-admin.component.css'
})
export class AddAdminComponent {

  
  private router = inject(Router);
  private civilityService = inject(CivilityService);
  private adminService = inject(AdminService);
 
  civilities$!: Observable<Civility[]>;


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

  }



  onSubmitForm() {
    if(this.form.valid) { 
      const date = new Date();
      const newAdmin:newAdmin = {
        email : this.form.value.email,
        roles: ['ROLE_ADMIN'],
        password : this.form.value.password,
        lastname: this.form.value.lastname,
        firstname : this.form.value.firstname,
        phone: this.form.value.phone,
        civility: 'api/civilities/' + this.form.value.civility
      };
      this.form.reset();
  
      this.adminService.addNewAdmin(newAdmin).subscribe({    
        next: () => {console.log('Le compte du manager a bien été créé'),
          this.router.navigateByUrl('/espace-prive/admin');
         },
        error: (error) => console.error('Il y a eu une erreur dans la création du compte'),
      });
    }
  }


}
