import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeFormat',
  standalone: true
})
export class TimeFormatPipe implements PipeTransform {
date:string='';
  transform(value: number|undefined): string|null {
    if(value!==undefined){
      let hour =Math.floor( value / 60 );
      let minutes = value-hour*60 ;
      this.date += hour > 0 ? `שעות: ${hour}  ` : ''; 
      this.date += minutes > 0 ? `דקות: ${minutes}  ` : '';
      return this.date;
    }
    else{
      return null;
    }
  }
}
