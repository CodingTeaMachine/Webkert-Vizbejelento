import { Pipe, PipeTransform } from '@angular/core';
import {FirebaseDate} from "../../../types/Report";

@Pipe({
  name: 'dateFormat'
})
export class DateFormatPipe implements PipeTransform {

  transform(date: Date | FirebaseDate | undefined | string, ...args: unknown[]): string {
      if(date === undefined || typeof date === 'string') return  '';
      if('seconds' in date) date = new Date(date.seconds * 1000);
      
      return `${date.getFullYear()}.${date.getMonth() + 1}.${date.getDate()}.`;
  }

}
