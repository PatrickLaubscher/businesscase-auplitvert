import { Component, inject } from '@angular/core';
import { OrderLineService } from '../../../shared/services/order-line.service';
import { BehaviorSubject, Observable, switchMap } from 'rxjs';
import { OrderLine } from '../../../shared/entities';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-order-line-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './order-line-list.component.html',
  styleUrl: './order-line-list.component.css'
})
export class OrderLineListComponent {

  orderLineService = inject(OrderLineService);

  currentPage$ = new BehaviorSubject<number>(1);
  currentPageData$!: Observable<OrderLine[]>;
  itemPerPage:number = 15;

  ngOnInit(): void {
    this.fetchAllOrderLines();
  }

  fetchAllOrderLines() {
    this.currentPageData$ = this.currentPage$.pipe(
      switchMap((currentPage) =>
        this.orderLineService.fetchAllOrderLinesPaginate(currentPage, this.itemPerPage)
    ));
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
