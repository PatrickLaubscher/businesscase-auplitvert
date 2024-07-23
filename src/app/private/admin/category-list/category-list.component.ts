import { Component, inject } from '@angular/core';
import { CategoryService } from '../../../shared/services/category.service';
import { Observable } from 'rxjs';
import { Category } from '../../../shared/entities';
import { AsyncPipe, NgFor } from '@angular/common';
import { CategoryFormComponent } from "../category-form/category-form.component";

@Component({
  selector: 'app-category-list',
  standalone: true,
  imports: [AsyncPipe, CategoryFormComponent, NgFor],
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.css'
})
export class CategoryListComponent {

  private categoryService = inject(CategoryService);

  public categorylist$!: Observable<Category[]>;


  ngOnInit(): void {
    this.fetchAllCategory();
  }

  fetchAllCategory() {
    this.categorylist$ = this.categoryService.fetchAllCategory();
  }
  

  trackCategory(id: number, category: Category): number {
    return category.id;
  }


  showModal(index: number): void {
    document.getElementById('form-category-' + index)?.classList.remove('hidden');
    document.getElementById('form-category-' + index)?.classList.add('flex');
    document.body.classList.add('overflow-y-hidden');
  }

}
