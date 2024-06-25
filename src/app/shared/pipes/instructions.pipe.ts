import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'instructions',
  standalone: true
})
export class InstructionsPipe implements PipeTransform {

  transform(value: string[], ...args: unknown[]): string[]|null {
    return value.filter(str => str.length > 0);
  }
}
