import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryService } from '../../../shared/services/category.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NewCategory } from '../../../shared/entities';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-category',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './add-category.component.html',
  styleUrl: './add-category.component.css'
})
export class AddCategoryComponent {

  private router = inject(Router);
  private categoryService = inject(CategoryService);

  form: FormGroup = new FormGroup({
    name: new FormControl('', {validators: [Validators.required]}),
    base_price: new FormControl('', {validators: [Validators.required]})
    }, 
  )


  onSubmit() {
    if(this.form.valid) { 
      const category:NewCategory = {
        name : this.form.value.name,
        coef_price : parseInt(this.form.value.base_price)
      };
    
      this.categoryService.addNewCategory(category).subscribe({    
        next: () => { console.log('La catégorie a bien été créé') },
        error: (error) => console.error('Il y a eu une erreur dans la création de la catégorie'),
        complete : () => { 
          this.form.reset(); 
          location.reload(); }
      });
    }
  }

}
