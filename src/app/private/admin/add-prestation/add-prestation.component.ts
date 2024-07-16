import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PrestationService } from '../../../shared/services/prestation.service';
import { NewPrestation } from '../../../shared/entities';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-prestation',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './add-prestation.component.html',
  styleUrl: './add-prestation.component.css'
})
export class AddPrestationComponent {

  private router = inject(Router);
  private prestationService = inject(PrestationService);

  form: FormGroup = new FormGroup({
    name: new FormControl('', {validators: [Validators.required]}),
    base_price: new FormControl('', {validators: [Validators.required]})
    }, 
  )


  onSubmit() {
    if(this.form.valid) { 
      const prestation:NewPrestation = {
        name : this.form.value.name,
        base_price : parseInt(this.form.value.base_price)
      };
    
      this.prestationService.addNewPrestation(prestation).subscribe({    
        next: () => { console.log('La prestation a bien été créé') },
        error: (error) => console.error('Il y a eu une erreur dans la création de la prestation'),
        complete : () => { 
          this.form.reset(); 
          location.reload(); }
      });
    }
  }

}
