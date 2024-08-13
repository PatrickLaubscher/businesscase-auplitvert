import { Pipe, PipeTransform } from '@angular/core';
import { OrderLine } from '../../entities';

@Pipe({
  name: 'orderlineStatus',
  standalone: true
})
export class OrderlineStatusPipe implements PipeTransform {

  transform(orderLines:OrderLine[], status:number): OrderLine[] {
    let statusName:string = "";

    if(status === 1) {
      statusName = "En cours";
    } else if (status === 2) {
      statusName = "En attente";
    } else if (status === 3) {
      statusName = "Terminée";
    }

    return orderLines.filter(orderLine =>
      orderLine.order_line_status.name.toLowerCase().includes(statusName.toLowerCase())
    );

  }

}
