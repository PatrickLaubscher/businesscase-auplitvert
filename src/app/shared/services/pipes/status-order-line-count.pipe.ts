import { Pipe, PipeTransform } from '@angular/core';
import { OrderLine } from '../../entities';

@Pipe({
  name: 'statusOrderLineCount',
  standalone: true
})
export class StatusOrderLineCountPipe implements PipeTransform {

  transform(value:OrderLine[], status:number): number {
    let statusName:string = "";
    let count:number = 0;

    if(status === 1) {
      statusName = "En cours";
    } else if (status === 2) {
      statusName = "En attente";
    } else if (status === 3) {
      statusName = "Terminée";
    }

    for(let i = 0; i < value.length; i++) {
      if (value[i].order_line_status.name === statusName) {
        count++;
      } 
    }

    return count;
  }

}
