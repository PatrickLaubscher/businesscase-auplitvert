import { Component, inject, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../../../shared/services/product.service';
import { Category, PatchProduct, Product } from '../../../shared/entities';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { CategoryService } from '../../../shared/services/category.service';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.css'
})
export class ProductFormComponent {

  @Input() i!: number;
  @Input() idProduct!: number;

  private router = inject(Router);
  private productService = inject(ProductService);
  private categoryService = inject(CategoryService);
  public categorylist$!: Observable<Category[]>;

  product$!:Product;

  form: FormGroup = new FormGroup({
    name: new FormControl('', {validators: [Validators.required]}),
    category: new FormControl('', {validators: [Validators.required]})
    }, 
  )

  fetchOneproduct() {
    this.productService.fetchOneProduct(this.idProduct).subscribe({
      next: (data) => {this.product$ = data;
        this.loadFormDefaultValues();},
      error: () => {
        console.log('Erreur dans la récupération des données');
      }
      } 
    ) 
  }

  loadFormDefaultValues() {
    if (this.product$) {
      this.form.patchValue({
        name: this.product$.name,
        category: this.product$.category.id
      });
    }
  }

  ngOnInit(): void {
    this.fetchAllCategory();
    this.fetchOneproduct();
  }

  fetchAllCategory() {
    this.categorylist$ = this.categoryService.fetchAllCategory();
  }


  onSubmit() {
    if(this.form.valid) { 
      const product:PatchProduct = {
        id : this.idProduct,
        name : this.form.value.name,
        category : 'api/categories/' + this.form.value.category
      };
      this.form.reset();

      this.productService.updateProduct(this.idProduct, product).subscribe({    
        next: () => {console.log('L\'article a bien été modifiée')
         },
        error: (error) => console.error('Il y a eu une erreur dans la modification'),
        complete: () => {location.reload()}
      });
    }
  }


  deleteProduct() {
          return this.productService.deleteProduct(this.idProduct).subscribe(
      {    
        next: () => {console.log('L\'article a bien été supprimée')},
        error: (error) => console.error('Il y a eu une erreur lors de la suppression'),
        complete: () => {location.reload()}
      });
    
  }

  hideModal(index: number): void {
    document.getElementById('form-product-' + index)?.classList.add('hidden');
    document.body.classList.remove('overflow-y-hidden');
  }

  onBackdropClick(event: MouseEvent, index: number): void {
    if ((event.target as HTMLElement).id === 'form-product-' + index) {
      this.hideModal(index);
    }
  }


}
