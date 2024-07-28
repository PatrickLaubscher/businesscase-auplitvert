import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { PrestationService } from '../../../shared/services/prestation.service';
import { Observable } from 'rxjs';
import { CartLineOrder, Category, PrestationWithAttribution, Product } from '../../../shared/entities';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../../shared/services/product.service';
import { Router } from '@angular/router';
import { CartService } from '../../../shared/services/cart.service';


@Component({
  selector: 'app-order-process-selection',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './order-process-selection.component.html',
  styleUrl: './order-process-selection.component.css'
})
export class OrderProcessSelectionComponent implements OnInit {

  prestationService = inject(PrestationService);
  productService = inject(ProductService);
  cartService = inject(CartService);

  prestationList$!: Observable<PrestationWithAttribution[]>;
  prestationSelected!: PrestationWithAttribution; 
  productSelected!: Product|null;
  categorySelected!: Category|null;


  prestationIndex:number = 0;
  quantity:number = 1;

  constructor(private cdr: ChangeDetectorRef, private router: Router) { }


  ngOnInit(): void {
    this.fetchAllPrestation();

    this.prestationList$.subscribe(prestations => {
      if (prestations.length > this.prestationIndex) {
        this.prestationSelected = prestations[this.prestationIndex];
      }
    });

  }

  
  fetchAllPrestation() {
    this.prestationList$ = this.prestationService.fetchAllPrestationWithAttribution();
  }

  
  selectPrestation(prestation: PrestationWithAttribution): void {
    this.prestationSelected = prestation;
    this.changeProductSelect(null, null);
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

  changeProductSelect (product:Product|null, category:Category|null) {
    this.hideModalProduct();
    this.categorySelected = category;
    this.productSelected = product;
  }


  hideModalProduct(): void {
    document.getElementById('product-list')?.classList.add('hidden');
    document.body.classList.remove('overflow-y-hidden');
  }

  onBackdropClickProduct(event: MouseEvent): void {
    if ((event.target as HTMLElement).id === 'product-list') {
      this.hideModalProduct();
    }
  }

  showModalProduct(): void {
    document.getElementById('product-list')?.classList.remove('hidden');
    document.getElementById('product-list')?.classList.add('flex');
    document.body.classList.add('overflow-y-hidden');
  }


  addItemToCart(prestation: PrestationWithAttribution, product: Product, category:Category, qty:number) {
    this.cartService.addToCart(prestation, product, category, qty);
  }

  hideModalValidation(): void {
    document.getElementById('selection-validation')?.classList.add('hidden');
    document.body.classList.remove('overflow-y-hidden');
  }

  onBackdropClickValidation(event: MouseEvent): void {
    if ((event.target as HTMLElement).id === 'selection-validation') {
      this.hideModalValidation();
    }
  }

  showModalValidation(): void {
    document.getElementById('selection-validation')?.classList.remove('hidden');
    document.getElementById('selection-validation')?.classList.add('flex');
    document.body.classList.add('overflow-y-hidden');
  }

  reloadPage() {
    this.router.navigateByUrl('faire-un-dépot');
    this.changeProductSelect(null, null);
    this.quantity = 1;
  }

  goToCart() {
    this.router.navigateByUrl('panier');
  }

}
