import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../../../shared/services/product.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Category, NewProduct } from '../../../shared/entities';
import { CategoryService } from '../../../shared/services/category.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css'
})
export class AddProductComponent implements OnInit {

  private router = inject(Router);
  private productService = inject(ProductService);
  private categoryService = inject(CategoryService);
  public categorylist$!: Observable<Category[]>;

  form: FormGroup = new FormGroup({
    name: new FormControl('', {validators: [Validators.required]}),
    category: new FormControl('', {validators: [Validators.required]})
    }, 
  )

  ngOnInit(): void {
    this.fetchAllCategory();
  }

  fetchAllCategory() {
    this.categorylist$ = this.categoryService.fetchAllCategory();
  }

  onSubmit() {
    if(this.form.valid) { 
      const product:NewProduct = {
        name : this.form.value.name,
        category : 'api/categories/' + this.form.value.category
      };
    
      this.productService.addNewProduct(product).subscribe({    
        next: () => { console.log('L\'article a bien été créé') },
        error: (error) => console.error('Il y a eu une erreur dans la création de l\'article'),
        complete : () => { 
          this.form.reset(); 
          location.reload(); }
      });
    }
  }

}
