import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'starsDifficultyLevel',
  standalone: true
})
export class StarsDifficultyLevelPipe implements PipeTransform {
  str:string="";
  transform(value: number|undefined): string|null {
    if(value != undefined){
        for (let i = 0; i < value; i++) {
        this.str+='*';
        }
        for (let i = 0; i < 5-value; i++) {
          this.str+='+';
        }
        return this.str;
    }
    return null;
  }

}
