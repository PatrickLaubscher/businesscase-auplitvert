import { Pipe, PipeTransform } from '@angular/core';
import { OrderLine } from '../../entities';

@Pipe({
  name: 'totalOrder',
  standalone: true
})
export class TotalOrderPipe implements PipeTransform {

  transform(value: number, orderLines: OrderLine[]): number {

    orderLines.forEach ( orderLine => value += orderLine.price);

    return value;
  }

}
