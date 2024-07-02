import { Component, inject, OnInit } from '@angular/core';
import { CityService } from '../shared/services/city.service';
import { City, Civility, newCustomer } from '../shared/entities';
import { CivilityService } from '../shared/services/civility.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CustomerService } from '../shared/services/customer.service';

@Component({
  selector: 'app-subscription',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './subscription.component.html',
  styleUrl: './subscription.component.css'
})
export class SubscriptionComponent implements OnInit {

  cityService = inject(CityService);
  civilityService = inject(CivilityService);
  customerService = inject(CustomerService);

  form: FormGroup = new FormGroup({
    civility: new FormControl('', {validators: [Validators.required]}),
    firstname: new FormControl('', {validators: [Validators.required]}),
    lastname: new FormControl('', {validators: [Validators.required]}),
    address: new FormControl('', {validators: [Validators.required]}),
    city: new FormControl('', {validators: [Validators.required]}),
    email: new FormControl('', {validators: [Validators.required, Validators.email]}),
    password: new FormControl('', {validators: [Validators.required, Validators.minLength(4)]}),
    phone: new FormControl('', {validators: [Validators.required]})
  });

  cities:City[]|undefined = [];
  civilities:Civility[]|undefined = [];
  

  getAllCities() {
    this.cityService.fetchAllCities().subscribe(
      (data) => {this.cities = data}
    )
  }

  getAllCivilities() {
    this.civilityService.fetchAllCivilities().subscribe(
      (data) => {this.civilities = data}
    )
  }

  ngOnInit(): void {
    this.getAllCities();
    this.getAllCivilities();
  }

  onSubmit() {
    const date = new Date();
    const newCustomer:newCustomer = {
      address: this.form.value.address,
      city: 'api/cities/' + this.form.value.city,
      creationDate: date.toISOString(),
      discr: 'customer',
      email : this.form.value.email,
      roles: ['ROLE_CUSTOMER'],
      password : this.form.value.password,
      lastname: this.form.value.lastname,
      firstname : this.form.value.firstname,
      phone: this.form.value.phone,
      civility: 'api/civilities/' + this.form.value.civility,
    };
    console.log(newCustomer);
    this.form.reset();

    this.customerService.addNewCustomer(newCustomer).subscribe();

  }

}
