import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'count',
  standalone: true
})
export class CountPipe implements PipeTransform {

  transform(value: any[]): number {

    if(value === null) {
      return 0;
    }
    
    return value.length;
  }

}
