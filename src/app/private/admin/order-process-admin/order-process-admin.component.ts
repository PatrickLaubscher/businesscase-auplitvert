import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { StatusOrderLineCountPipe } from '../../../shared/services/pipes/status-order-line-count.pipe';
import { OrderlineStatusPipe } from '../../../shared/services/pipes/orderline-status.pipe';
import { OrderLineService } from '../../../shared/services/order-line.service';
import { OrderLineStatusService } from '../../../shared/services/order-line-status.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { OrderLine, OrderLineStatus } from '../../../shared/entities';

@Component({
  selector: 'app-order-process-admin',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, StatusOrderLineCountPipe, OrderlineStatusPipe],
  templateUrl: './order-process-admin.component.html',
  styleUrl: './order-process-admin.component.css'
})
export class OrderProcessAdminComponent implements OnInit {

  orderLineService = inject(OrderLineService);
  orderLineStatusService = inject(OrderLineStatusService);
  private router = inject(Router);

  orderLineStatus$!: Observable<OrderLineStatus[]>;
  orderLines$!: Observable<OrderLine[]>;
  orderLines : OrderLine[] = [];


  form: FormGroup = new FormGroup({
    orderStatusId: new FormControl('', {validators: [Validators.required]})
    }, 
  )

  ngOnInit(): void {
    this.fetchAllOrderLineStatus();
    this.fetchOrderLines();
  }

  fetchOrderLines() {
    this.orderLines$ = this.orderLineService.fetchAllOrderLines();
    this.orderLines$.subscribe(
      data => {this.orderLines = data;}
    )
  }

  fetchAllOrderLineStatus() {
    this.orderLineStatus$ = this.orderLineStatusService.fetchAllOrderLineStatus();
  }


  onSubmit(orderLineId:number) {
    if(this.form.valid) { 

      const orderStatusId:number = this.form.value.orderStatusId;
      this.form.reset();

      this.orderLineService.updateOrderLineStatus(orderLineId, orderStatusId).subscribe({    
        next: () => {console.log('Le statut a bien été modifié'); 
          this.router.navigateByUrl('/espace-prive/admin/traitement-commandes');
         },
        error: (error) => console.error('Il y a eu une erreur dans la modification'),
        complete: () => {location.reload()}
      });
    }
  }

}
