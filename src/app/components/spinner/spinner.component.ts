import { Component, OnInit, ViewEncapsulation, inject } from '@angular/core';
import { LoaderService } from '../../shared/services/loader.service';
import { CommonModule, NgIf } from '@angular/common';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-spinner',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './spinner.component.html',
  styleUrl: './spinner.component.css',
  encapsulation: ViewEncapsulation.ShadowDom
})
export class SpinnerComponent implements OnInit{

  loaderService = inject(LoaderService);
  loading:boolean = false;

  ngOnInit(): void {
    this.loaderService.loading$.subscribe((loading) => {
      this.loading = loading;
    });
  }

}
