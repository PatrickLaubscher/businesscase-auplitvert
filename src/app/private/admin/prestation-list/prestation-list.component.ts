import { Component, inject } from '@angular/core';
import { PrestationService } from '../../../shared/services/prestation.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { Prestation } from '../../../shared/entities';
import { CategoryListComponent } from '../category-list/category-list.component';
import { AddPrestationComponent } from "../add-prestation/add-prestation.component";
import { PrestationFormComponent } from "../prestation-form/prestation-form.component";
import { AddCategoryComponent } from "../add-category/add-category.component";
//import { EntityService } from '../../../shared/services/entity.service';

@Component({
  selector: 'app-prestation-list',
  standalone: true,
  imports: [CommonModule, RouterLink, CategoryListComponent, AddPrestationComponent, PrestationFormComponent, AddCategoryComponent],
  templateUrl: './prestation-list.component.html',
  styleUrl: './prestation-list.component.css',
  //providers: [EntityService, {provide: 'apiUrl', useValue: '/prestations/'}]
})
export class PrestationListComponent {

  //constructor(private service: EntityService<Prestation>) {}

  prestationService = inject(PrestationService);
  prestationlist$!: Observable<Prestation[]>;

  //prestations: Prestation[] = [];

  trackPrestation(id: number, prestation: Prestation): number {
    return prestation.id;
  }

  ngOnInit(): void {
    this.fetchAllPrestation();
  }

  fetchAllPrestation() {
    this.prestationlist$ = this.prestationService.fetchAllPrestation();
  }

  /*
  getProducts() {
    this.service.fetchAll().subscribe((data) => {
      this.prestations = data['hydra:member'];
      console.log(this.prestationlist$);
    })
  } */
  

  showModal(index: number): void {
    document.getElementById('form-prestation-' + index)?.classList.remove('hidden');
    document.getElementById('form-prestation-' + index)?.classList.add('flex');
    document.body.classList.add('overflow-y-hidden');
  }

}
