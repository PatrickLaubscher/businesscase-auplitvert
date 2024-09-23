import { Component, inject, OnInit } from '@angular/core';
import { CartService } from '../../../shared/services/cart.service';
import { PaymentModeService } from '../../../shared/services/payment-mode.service';
import { CartLineOrder, NewOrder, NewOrderLine, OrderLineStatus, PaymentMode, User } from '../../../shared/entities';
import { Observable } from 'rxjs';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../../shared/services/user.service';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { OrderService } from '../../../shared/services/order.service';
import { OrderLineService } from '../../../shared/services/order-line.service';
import { OrderLineStatusService } from '../../../shared/services/order-line-status.service';

@Component({
  selector: 'app-payment-selection',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule],
  templateUrl: './payment-selection.component.html',
  styleUrl: './payment-selection.component.css'
})
export class PaymentSelectionComponent implements OnInit {

  cartService = inject(CartService);
  paymentModeService = inject(PaymentModeService);
  userService = inject(UserService);
  orderService = inject(OrderService);
  orderLineService = inject(OrderLineService);
  orderLineStatusService = inject(OrderLineStatusService);
  router = inject(Router);

  paymentModeList$!: Observable<PaymentMode[]>;
  user!: User|null;
  itemsCart!: CartLineOrder[];
  statusNewOrderLine!: OrderLineStatus;

  ngOnInit(): void {
    if(this.orderService.getDepositDate() == null) {
      this.router.navigateByUrl('/panier');
    } 
    this.paymentModeList$ = this.paymentModeService.fetchAllPaymentMode();
    this.user = this.userService.getUser();
    this.orderLineStatusService.searchOrderLineStatusByName('attente').subscribe(
      (data) => {this.statusNewOrderLine = data;}
    );

    if(!localStorage.getItem("cart_items")) {
      this.router.navigateByUrl('/panier');
    }
  }

  form: FormGroup = new FormGroup({
    paymentMode: new FormControl('', {validators: [Validators.required]})
  });

  onSubmit() {
    if(this.form.valid && this.user) {
      const depositDate = this.orderService.getDepositDate();
      if (depositDate) {
        const [day, month, year] = depositDate.split('-');
        const formattedDate = new Date(`${year}-${month}-${day}`);
        const isoFormattedDate = formattedDate.toISOString();
        const date = new Date();
        const newOrder:NewOrder = {
          date: date.toISOString(),
          deposit_date: isoFormattedDate,
          customer: 'api/customers/' + this.user.id,
          paymentMode: 'api/payment_modes/' + this.form.value.paymentMode
        };
        this.form.reset();
    
        this.orderService.addNewOrder(newOrder).subscribe({    
          next: (response) => {
            const orderId = response.id;
            const OrderStatusId = this.statusNewOrderLine.id.toString();
            this.itemsCart = this.cartService.loadCart();

            this.itemsCart.forEach( (itemCart) => {
                let newOrderLine:NewOrderLine = {
                  main_order: 'api/orders/' + orderId,
                  product: 'api/products/' + itemCart.product.id,
                  prestation: 'api/prestations/' + itemCart.prestation.id,
                  order_line_status: 'api/order_line_statuses/' + this.statusNewOrderLine.id,
                  qty: itemCart.quantity,
                  price: itemCart.totalPrice,
                } 
                this.orderLineService.addNewOrderLine(newOrderLine).subscribe();
            });
            this.cartService.clearCart();
            this.orderService.removeDepositDate();
            console.log('La commande a bien été créée'); 
            this.router.navigateByUrl('/confirmation-commande')},
          error: (error) => console.error('Il y a eu une erreur dans la validation de la commande'),
          complete() {
            (prompt:string) => {prompt = "La commande a bien été créée, merci!"}
          },
        });
      }
    }
  }

}
