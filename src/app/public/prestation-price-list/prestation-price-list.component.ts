import { Component, inject } from '@angular/core';
import { PrestationService } from '../../shared/services/prestation.service';
import { Observable } from 'rxjs';
import { PrestationWithAttribution } from '../../shared/entities';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-prestation-price-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './prestation-price-list.component.html',
  styleUrl: './prestation-price-list.component.css'
})
export class PrestationPriceListComponent {

  prestationService = inject(PrestationService);
  prestationList$!: Observable<PrestationWithAttribution[]>;

  ngOnInit(): void {
    this.fetchAllPrestation();
  }

  fetchAllPrestation() {
    this.prestationList$ = this.prestationService.fetchAllPrestationWithAttribution();
  }

}
