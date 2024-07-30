import { Pipe, PipeTransform } from '@angular/core';
import { Category } from '../../entities';

@Pipe({
  name: 'existingAttribution',
  standalone: true
})
export class ExistingAttributionPipe implements PipeTransform {

  transform(categories: Category[], idPrestation: number): Category[] {

    return categories.filter(category => {
        category.attributionPrestationCategories.some( attribution => 
          attribution.Prestation.some(
        prestation => prestation.id !== idPrestation
          )
        )
    });
    
  } 

}
