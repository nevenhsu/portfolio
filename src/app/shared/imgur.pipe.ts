import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'imgur'
})
export class ImgurPipe implements PipeTransform {

  transform(value: string): string {
    return `//i.imgur.com/${value}.jpg`;
  }

}
