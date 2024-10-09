import { AfterViewChecked, AfterViewInit, ChangeDetectorRef, ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { CartService } from '../../../shared/services/cart.service';
import { CartLineOrder } from '../../../shared/entities';
import { Router, RouterLink } from '@angular/router';
import { TtcPricePipe } from '../../../shared/services/pipes/ttc-price.pipe';
import { CommonModule } from '@angular/common';
import { AuthentificationService } from '../../../shared/services/authentification.service';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MAT_DATE_LOCALE, provideNativeDateAdapter} from '@angular/material/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { OrderService } from '../../../shared/services/order.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  providers: [provideNativeDateAdapter(), {provide: MAT_DATE_LOCALE, useValue: 'fr-FR'}],
  imports: [CommonModule, TtcPricePipe, RouterLink, MatFormFieldModule, MatInputModule, MatDatepickerModule, ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit, AfterViewInit, AfterViewChecked {

  cartService = inject(CartService);
  orderService = inject(OrderService);
  auth = inject(AuthentificationService);

  cartItems:CartLineOrder[] = [];
  totalNetPrice:number = 0;
  totalQty:number = 0;


  constructor(private cdr: ChangeDetectorRef, private router: Router) { }

  form: FormGroup = new FormGroup({
    depositDate: new FormControl('', {validators: [Validators.required]})
  });


  ngOnInit(): void {
    this.displayCart();
    this.displayTotalNet();
    this.displayTotalQty();
  }
  
  ngAfterViewInit(): void {
    this.displayCart();
    this.displayTotalNet();
    this.displayTotalQty();
  }

  ngAfterViewChecked(): void {
    this.displayCart();
    this.displayTotalNet();
    this.displayTotalQty();
  }

  displayCart() {
    this.cartService.loadCart();
    this.cartItems = this.cartService.getItems();
    this.cdr.detectChanges();
  }

  displayTotalNet() {
    this.cartService.loadTotalNetPrice();
    this.totalNetPrice = this.cartService.getTotalNetPrice();
    this.cdr.detectChanges();
  }

  displayTotalQty() {
    this.cartService.loadTotalQty();
    this.totalQty = this.cartService.getTotalQty();
    this.cdr.detectChanges();
  }

  goToSelectPage() {
    this.router.navigateByUrl('faire-un-dépot');
  }

  onSubmit() {
    if(this.auth.checkIfAuthenticated() && this.form.valid) {
      this.orderService.setDepositDate(this.form.value.depositDate);
      this.router.navigateByUrl('/paiement');
    } else {
      this.router.navigateByUrl('/confirmer-connexion');
    }
  }


}
