import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'imgur'
})
export class ImgurPipe implements PipeTransform {

  transform(value: string, format: string = 'jpg'): string {
    return `//i.imgur.com/${value}.${format}`;
  }

}
