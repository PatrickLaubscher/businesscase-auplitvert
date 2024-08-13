import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from '../../../shared/services/order.service';
import { Order } from '../../../shared/entities';
import { CommonModule } from '@angular/common';
import { TotalOrderPipe } from '../../../shared/services/pipes/total-order.pipe';

@Component({
  selector: 'app-order-details',
  standalone: true,
  imports: [CommonModule, TotalOrderPipe],
  templateUrl: './order-details.component.html',
  styleUrl: './order-details.component.css'
})
export class OrderDetailsComponent implements OnInit {

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private orderService = inject(OrderService);
  id!:string;
  order$! : Order;
  totalNetOrder: number = 0;

  ngOnInit():void {
    this.fetchOneOrder();
  }


  fetchOneOrder() {
    let idSearch = this.route.snapshot.paramMap.get('id');
    if(idSearch  != null) {
      this.orderService.fetchOneOrder(idSearch).subscribe ({
        next: (data) => {this.order$ = data;
          this.id = idSearch;
          console.log(this.order$);},
          error: () => {
            console.log('Erreur dans la récupération des données');
          }
      }) 
    } else {
        console.error('Aucune ID dans les paramètres');
      }    
    }

}
