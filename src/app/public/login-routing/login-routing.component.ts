import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CartService } from '../../shared/services/cart.service';
import { CartLineOrder } from '../../shared/entities';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-login-routing',
  standalone: true,
  imports: [RouterLink, NgIf],
  templateUrl: './login-routing.component.html',
  styleUrl: './login-routing.component.css'
})
export class LoginRoutingComponent implements OnInit {

  cartService = inject(CartService);

  cartItems:CartLineOrder[] = [];

  ngOnInit(): void {
    this.cartService.loadCart();
    this.cartItems = this.cartService.getItems();
  }

}
