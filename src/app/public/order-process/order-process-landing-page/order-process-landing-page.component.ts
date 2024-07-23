import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { PrestationService } from '../../../shared/services/prestation.service';
import { BehaviorSubject, map, Observable, take } from 'rxjs';
import { Prestation, Product } from '../../../shared/entities';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../../shared/services/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-process-landing-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './order-process-landing-page.component.html',
  styleUrl: './order-process-landing-page.component.css'
})
export class OrderProcessLandingPageComponent {

  prestationService = inject(PrestationService);
  productService = inject(ProductService);
  prestationList$!: Observable<Prestation[]>;
  productList$!: Observable<Product[]>;
  prestationSelected = new BehaviorSubject<Prestation | null>(null);
  productSelected = new BehaviorSubject<Product | null>(null);    
  prestationIndex:number = 0;

  quantity:number = 1;

  constructor(private cdr: ChangeDetectorRef, private router: Router) { }


  ngOnInit(): void {
    this.fetchAllPrestation();
    this.fetchAllProduct();
    this.prestationList$.pipe(
      map(prestations => prestations[this.prestationIndex])
      ).subscribe(firstPrestation => {
        this.prestationSelected.next(firstPrestation);
      });
    this.productList$.pipe(
      map(product=> product[0])
      ).subscribe(firstProduct => {
        this.productSelected.next(firstProduct);
      });
  }

  fetchAllPrestation() {
    this.prestationList$ = this.prestationService.fetchAllPrestation();
  }

  fetchAllProduct() {
    this.productList$ = this.productService.fetchAllProduct();
  }

  selectPrestation(prestation: Prestation): void {
    this.prestationSelected.next(prestation);
  }

  selectProduct(product: Product): void {
    this.productSelected.next(product);
  }


  addQuantity() {
    this.quantity ++;
    this.cdr.detectChanges();
  }

  diminishQuantity() {
    if(this.quantity <= 1) {
      this.quantity = 1;
    } else {
      this.quantity --;
    }
    this.cdr.detectChanges();
  }


}
