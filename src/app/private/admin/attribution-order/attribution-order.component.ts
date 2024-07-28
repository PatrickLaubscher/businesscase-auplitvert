import { Component, inject } from '@angular/core';
import { OrderLineService } from '../../../shared/services/order-line.service';
import { BehaviorSubject, Observable, switchMap } from 'rxjs';
import { OrderLine } from '../../../shared/entities';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-attribution-order',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './attribution-order.component.html',
  styleUrl: './attribution-order.component.css'
})
export class AttributionOrderComponent {

  orderLineService = inject(OrderLineService);
  noEmployeeOrderLineList$!: Observable<OrderLine[]>;


  ngOnInit(): void {
    this.fetchOrderLineWithoutEmployee();
  }


  fetchOrderLineWithoutEmployee() {
    return this.noEmployeeOrderLineList$ = this.orderLineService.fetchOrderLineWithoutEmployee();
  }


}
