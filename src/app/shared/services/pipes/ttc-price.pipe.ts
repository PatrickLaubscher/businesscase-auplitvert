import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ttcPrice',
  standalone: true
})
export class TtcPricePipe implements PipeTransform {

  transform(value: number, tva: number): number {
    if(tva === 1) {
      return (value * 0.1) + value;
    } else if (tva === 2) {
      return (value * 0.2) + value;
    } else {
      return value;
    }
  }

}
