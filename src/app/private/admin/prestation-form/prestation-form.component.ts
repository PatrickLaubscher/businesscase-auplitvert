import { Component, inject, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PrestationService } from '../../../shared/services/prestation.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AttributionPrestationCategory, Category, PatchPrestation, Prestation } from '../../../shared/entities';
import { CommonModule } from '@angular/common';
import { map, Observable } from 'rxjs';
import { CategoryService } from '../../../shared/services/category.service';
import { AttributionPrestationCategoryService } from '../../../shared/services/attribution-prestation-category.service';
import { ExistingAttributionPipe } from '../../../shared/services/pipes/existing-attribution.pipe';


@Component({
  selector: 'app-prestation-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './prestation-form.component.html',
  styleUrl: './prestation-form.component.css',
  providers : [ ExistingAttributionPipe ]
})
export class PrestationFormComponent implements OnInit {

  @Input() i!: number;
  @Input() idPrestation!: number;

  router = inject(Router);
  prestationService = inject(PrestationService);
  categoryService = inject(CategoryService);
  attributionService = inject(AttributionPrestationCategoryService);

  constructor(private existingAttributionPipe: ExistingAttributionPipe) { }

  prestation$!:Prestation;
  categoryList$!: Observable<Category[]>;
  categoryAvailableList$!: Observable<Category[]>;
  prestationAttribution: AttributionPrestationCategory[] = [];

  form: FormGroup = new FormGroup({
    name: new FormControl('', {validators: [Validators.required]}),
    base_price: new FormControl('', {validators: [Validators.required]})
    }, 
  )

  attributionForm: FormGroup = new FormGroup({
    categoryId: new FormControl('', {validators: [Validators.required]})
    }, 
  )

  fetchOnePrestation() {
    this.prestationService.fetchOnePrestation(this.idPrestation).subscribe({
      next: (data) => {this.prestation$ = data;
        this.loadFormDefaultValues();},
      error: () => {
        console.log('Erreur dans la récupération des données');
      }
      } 
    ) 
  }

  fetchAttributionCategories() {
    this.prestationService.fetchOnePrestationWithAttribution(this.idPrestation).subscribe(
      data => {this.prestationAttribution = data.attributionPrestationCategories}
    );
  }

  fetchAllCategories() {
    this.categoryList$ = this.categoryService.fetchAllCategory();
    this.categoryAvailableList$ = this.categoryList$.pipe(
      map(categories => this.existingAttributionPipe.transform(categories, this.idPrestation) )
    )
  }


  loadFormDefaultValues() {
    if (this.prestation$) {
      this.form.patchValue({
        name: this.prestation$.name,
        base_price: this.prestation$.base_price
      });
    }
  }

  ngOnInit(): void {
    this.fetchOnePrestation();
    this.fetchAllCategories();
    this.fetchAttributionCategories();
  }


  onSubmit() {
    if(this.form.valid) { 
      const prestation:PatchPrestation = {
        id : this.idPrestation,
        name : this.form.value.name,
        base_price : parseInt(this.form.value.base_price)
      };
      this.form.reset();
      this.router.navigateByUrl('/espace-prive/admin/prestations-et-catégories');
  
      this.prestationService.updatePrestation(this.idPrestation, prestation).subscribe({    
        next: () => {console.log('La prestation a bien été modifiée'),
          this.router.navigateByUrl('/espace-prive/admin/prestations-et-catégories');
         },
        error: (error) => console.error('Il y a eu une erreur dans la modification'),
      });
    }
  }

  onSubmitAttribution() {
    if(this.form.valid) { 
      
      const categoryId = this.attributionForm.value.categoryId;
      this.form.reset();
      this.router.navigateByUrl('/espace-prive/admin/prestations-et-catégories');
  
      this.attributionService.addNewAttributionCategoryForPrestation(this.idPrestation, categoryId).subscribe({    
        next: () => {console.log('La prestation a bien été modifiée'),
          this.router.navigateByUrl('/espace-prive/admin/prestations-et-catégories');
         },
        error: (error) => console.error('Il y a eu une erreur dans la modification'),
      });
    }
  }

  deleteAttribution(id:number) {
    this.attributionService.deleteAttributionCategoryForPrestation(id).subscribe(
      {    
        next: () => {console.log('L\'attribution avec la catégorie a bien été supprimée') 
          this.router.navigateByUrl('/espace-prive/admin/prestations-et-catégories');
          location.reload();
        },
        error: (error) => console.error('Il y a eu une erreur lors de la suppression'),
      });
  }


  deletePrestation() {
    if(this.prestation$.name != "Repassage classique" && this.prestation$.name != "Repassage et Reprisage" && this.prestation$.name != "Repassage avec Tâches difficiles") {
          return this.prestationService.deletePrestation(this.idPrestation).subscribe(
      {    
        next: () => {console.log('La prestation a bien été supprimée') 
          this.router.navigateByUrl('/espace-prive/admin/prestations');
          location.reload();
        },
        error: (error) => console.error('Il y a eu une erreur lors de la suppression'),
      });
    } else {
      return console.log('La suppression des prestations de base n\'est pas réalisable ici')
    }
  }

  hideModal(index: number): void {
    document.getElementById('form-prestation-' + index)?.classList.add('hidden');
    document.body.classList.remove('overflow-y-hidden');
  }

  onBackdropClick(event: MouseEvent, index: number): void {
    if ((event.target as HTMLElement).id === 'form-prestation-' + index) {
      this.hideModal(index);
    }
  }

}
