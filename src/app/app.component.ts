import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { initFlowbite } from 'flowbite';
import { SpinnerComponent } from './components/spinner/spinner.component';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SpinnerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Au Pli Vert - Pressing écologique';

  ngOnInit(): void {
    initFlowbite();
  }
}
