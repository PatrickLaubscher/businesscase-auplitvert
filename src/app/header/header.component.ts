import { AfterContentInit, AfterViewInit, ChangeDetectorRef, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthentificationService } from '../shared/services/authentification.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements AfterViewInit {
  auth = inject(AuthentificationService);
  isAuthenticated!: boolean;

  constructor(private cdr: ChangeDetectorRef){}

  ngAfterViewInit(): void {
    this.auth.isAuthenticated$.subscribe(isAuthenticated => {
      this.isAuthenticated = isAuthenticated;
      this.cdr.detectChanges();
    })
  }
  
}
