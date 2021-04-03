import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'answer'
})
export class AnswerPipe implements PipeTransform {

  transform(n: boolean): string {
      if(n) return 'Yes';
      return 'No';
  }

}
