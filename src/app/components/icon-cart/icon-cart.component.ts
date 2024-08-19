import { AfterViewChecked, AfterViewInit, ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { CartService } from '../../shared/services/cart.service';
import { CommonModule } from '@angular/common';
import { CartLineOrder } from '../../shared/entities';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-icon-cart',
  standalone: true,
  imports: [ CommonModule, RouterLink ],
  templateUrl: './icon-cart.component.html',
  styleUrl: './icon-cart.component.css'
})
export class IconCartComponent implements OnInit, AfterViewInit, AfterViewChecked {

  cartItems:CartLineOrder[] = [];
  totalQty:number = 0;

  constructor(private cdr: ChangeDetectorRef) { }

  cartService = inject(CartService);

  ngOnInit(): void {
    this.displayCart();
    this.displayTotalQty();
  }

  ngAfterViewInit(): void {
    this.displayCart();
    this.displayTotalQty();
  }

  ngAfterViewChecked(): void {
    this.displayCart();
    this.displayTotalQty();
  }

  displayCart() {
    this.cartService.loadCart();
    this.cartItems = this.cartService.getItems();
    this.cdr.detectChanges();
  }

  displayTotalQty() {
    this.cartService.loadTotalQty();
    this.totalQty = this.cartService.getTotalQty();
    this.cdr.detectChanges();
  }

}
