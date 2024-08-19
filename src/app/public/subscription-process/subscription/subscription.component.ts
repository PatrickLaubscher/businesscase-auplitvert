import { Component, inject, OnInit } from '@angular/core';
import { CityService } from '../../../shared/services/city.service';
import { City, Civility, newCustomer } from '../../../shared/entities';
import { CivilityService } from '../../../shared/services/civility.service';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { CustomerService } from '../../../shared/services/customer.service';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AuthentificationService } from '../../../shared/services/authentification.service';
import { UserService } from '../../../shared/services/user.service';


export const confirmPasswordValidator: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  return control.value.password === control.value.password_confirmation
    ? null
    : { PasswordNoMatch: true };
};

@Component({
  selector: 'app-subscription',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './subscription.component.html',
  styleUrl: './subscription.component.css'
})
export class SubscriptionComponent implements OnInit {

  cityService = inject(CityService);
  civilityService = inject(CivilityService);
  customerService = inject(CustomerService);
  router = inject(Router);



  form: FormGroup = new FormGroup({
    civility: new FormControl('', {validators: [Validators.required]}),
    firstname: new FormControl('', {validators: [Validators.required]}),
    lastname: new FormControl('', {validators: [Validators.required]}),
    address: new FormControl('', {validators: [Validators.required]}),
    city: new FormControl('', {validators: [Validators.required]}),
    email: new FormControl('', {validators: [Validators.required, Validators.email]}),
    password: new FormControl('', {validators: [Validators.required, Validators.minLength(4)]}),
    password_confirmation: new FormControl('', {validators: [Validators.required]}),
    phone: new FormControl('', {validators: [Validators.required]})
    }, {validators: confirmPasswordValidator},
  );

  cities$!: Observable<City[]>;
  civilities$!: Observable<Civility[]>;
  

  ngOnInit(): void {
    this.cities$ = this.cityService.fetchAllCities();
    this.civilities$ = this.civilityService.fetchAllCivilities();
  }

  onSubmit() {
    if(this.form.valid) { 
      const date = new Date();

      const newCustomer:newCustomer = {
        address: this.form.value.address,
        city: 'api/cities/' + this.form.value.city,
        creationDate: date.toISOString(),
        email : this.form.value.email,
        roles: ['ROLE_CUSTOMER'],
        password : this.form.value.password,
        lastname: this.form.value.lastname,
        firstname : this.form.value.firstname,
        phone: this.form.value.phone,
        civility: 'api/civilities/' + this.form.value.civility,
      };
      this.form.reset();

  
      this.customerService.addNewCustomer(newCustomer).subscribe({    
        next: () => {
          console.log('Le compte a bien été créé');
          this.router.navigateByUrl('/confirmation-inscription');
        },
        error: (error) => console.error('Il y a eu une erreur dans la création de votre compte'),
        complete() {
          (prompt:string) => prompt = "Votre compte client a bien été créé, merci!" 
        },
      });
    }
  }

}
