import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pronunciationOfWord'
})
export class PronunciationOfWordPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return 'http://dict.youdao.com/dictvoice?type=2&audio='+value;
  }

}
