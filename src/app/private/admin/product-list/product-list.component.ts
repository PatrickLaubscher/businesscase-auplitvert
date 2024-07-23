import { Component, inject } from '@angular/core';
import { ProductService } from '../../../shared/services/product.service';
import { Observable } from 'rxjs';
import { Product } from '../../../shared/entities';
import { AddProductComponent } from "../add-product/add-product.component";
import { CommonModule, NgFor } from '@angular/common';
import { ProductFormComponent } from "../product-form/product-form.component";

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [AddProductComponent, CommonModule, ProductFormComponent],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent {

  productService = inject(ProductService);

  productlist$!: Observable<Product[]>;


  ngOnInit(): void {
    this.fetchAllproduct();
  }

  fetchAllproduct() {
    this.productlist$ = this.productService.fetchAllProduct();
  }
  

  trackproduct(id: number, product: Product): number {
    return product.id;
  }


  showModal(index: number): void {
    document.getElementById('form-product-' + index)?.classList.remove('hidden');
    document.getElementById('form-product-' + index)?.classList.add('flex');
    document.body.classList.add('overflow-y-hidden');
  }


}
