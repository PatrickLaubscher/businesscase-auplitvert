import { Component, inject, Input } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryService } from '../../../shared/services/category.service';
import { Category } from '../../../shared/entities';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-category-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './category-form.component.html',
  styleUrl: './category-form.component.css'
})
export class CategoryFormComponent {

  @Input() i!: number;
  @Input() idCategory!: number;

  private router = inject(Router);
  private categoryService = inject(CategoryService);

  category$!:Category;

  form: FormGroup = new FormGroup({
    name: new FormControl('', {validators: [Validators.required]}),
    coef_price: new FormControl('', {validators: [Validators.required]})
    }, 
  )

  fetchOneCategory() {
    this.categoryService.fetchOneCategory(this.idCategory).subscribe({
      next: (data) => {this.category$ = data;
        this.loadFormDefaultValues();},
      error: () => {
        console.log('Erreur dans la récupération des données');
      }
      } 
    ) 
  }

  loadFormDefaultValues() {
    if (this.category$) {
      this.form.patchValue({
        name: this.category$.name,
        coef_price: this.category$.coef_price
      });
    }
  }

  ngOnInit(): void {
    this.fetchOneCategory();
  }


  onSubmit() {
    if(this.form.valid) { 
      const category:Category = {
        id : this.idCategory,
        name : this.form.value.name,
        coef_price : parseInt(this.form.value.coef_price)
      };
      this.form.reset();
      this.router.navigateByUrl('/espace-prive/admin/prestations');
  
      this.categoryService.updateCategory(this.idCategory, category).subscribe({    
        next: () => {console.log('La catégorie a bien été modifiée')
         },
        error: (error) => console.error('Il y a eu une erreur dans la modification'),
        complete: () => {location.reload()}
      });
    }
  }


  deleteCategory() {
          return this.categoryService.deleteCategory(this.idCategory).subscribe(
      {    
        next: () => {console.log('La catégorie a bien été supprimée')},
        error: (error) => console.error('Il y a eu une erreur lors de la suppression'),
        complete: () => {location.reload()}
      });
    
  }

  hideModal(index: number): void {
    document.getElementById('form-category-' + index)?.classList.add('hidden');
    document.body.classList.remove('overflow-y-hidden');
  }

  onBackdropClick(event: MouseEvent, index: number): void {
    if ((event.target as HTMLElement).id === 'form-category-' + index) {
      this.hideModal(index);
    }
  }


}
