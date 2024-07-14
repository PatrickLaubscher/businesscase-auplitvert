import { Pipe, PipeTransform } from '@angular/core';
import { OrderLine } from '../../entities';

@Pipe({
  name: 'checkIfOrderFinishedStatusLine',
  standalone: true
})
export class CheckIfOrderFinishedStatusLinePipe implements PipeTransform {

  transform(value: OrderLine[]): boolean {
    let count:number = 0;

    for(let i = 0; i < value.length; i++) {
      if (value[i].order_line_status.name === "Terminée") {
        count ++
      }
    }

    return value.length > count ? true : false;
  }

}
