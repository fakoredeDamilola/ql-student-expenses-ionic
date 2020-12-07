import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'minus'})

export class MinusPipe implements PipeTransform {
  transform(num: number, args?: any): any {
    return -Math.abs(num);
  }


}
