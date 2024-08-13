import { Component, inject, OnInit } from '@angular/core';
import { OrderService } from '../../../shared/services/order.service';
import { BehaviorSubject, map, Observable, switchMap } from 'rxjs';
import { Order } from '../../../shared/entities';
import { CommonModule } from '@angular/common';
import { CountPipe } from '../../../shared/services/pipes/count.pipe';
import { StatusOrderLineCountPipe } from '../../../shared/services/pipes/status-order-line-count.pipe';
import { CheckIfOrderFinishedStatusLinePipe } from '../../../shared/services/pipes/check-if-order-finished-status-line.pipe';


@Component({
  selector: 'app-order-list',
  standalone: true,
  imports: [CommonModule, CountPipe, StatusOrderLineCountPipe, CheckIfOrderFinishedStatusLinePipe],
  templateUrl: './order-list.component.html',
  styleUrl: './order-list.component.css'
})
export class OrderListComponent implements OnInit{

  orderService = inject(OrderService);

  currentPage$ = new BehaviorSubject<number>(1);
  currentPageData$!: Observable<Order[]>;
  itemPerPage:number = 10;

  ngOnInit(): void {
    this.fetchAllOrders();
  }

  fetchAllOrders() {
    this.currentPageData$ = this.currentPage$.pipe(
      switchMap((currentPage) =>
        this.orderService.fetchAllOrders(currentPage, this.itemPerPage)
      ));
    /*this.currentPageData$.subscribe({
      next: (data:Order[]) => {data},
      complete: () => {
        console.log("Liste des commandes chargées")
      }
    })*/
  }

  nextPage() {
    this.currentPage$.next(this.currentPage$.value + 1);
  }

  prevPage() {
    if (this.currentPage$.value > 1) {
      this.currentPage$.next(this.currentPage$.value - 1);
    }
  }

}
