import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'time',
  standalone: true
})
export class TimePipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): unknown {
    return value.slice(0,5);
  }

}
