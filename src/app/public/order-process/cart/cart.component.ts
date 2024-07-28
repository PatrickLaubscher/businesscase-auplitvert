import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { CartService } from '../../../shared/services/cart.service';
import { CartLineOrder } from '../../../shared/entities';
import { Router, RouterLink } from '@angular/router';
import { TtcPricePipe } from '../../../shared/services/pipes/ttc-price.pipe';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, TtcPricePipe, RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {

  cartService = inject(CartService);

  cartItems:CartLineOrder[] = [];
  totalNetPrice:number = 0;
  totalQty:number = 0;


  constructor(private cdr: ChangeDetectorRef, private router: Router) { }

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

}
