import { Pipe, PipeTransform } from '@angular/core';
import { ImgurPipe } from 'shared/imgur.pipe';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';
import { getGradient } from 'shared/gradients';

@Pipe({
  name: 'backgroundImage'
})
export class BackgroundImagePipe implements PipeTransform {

  constructor(private sanitizer: DomSanitizer,
              private imgur: ImgurPipe) {}

  transform(url: string, gradient?: number): SafeStyle {
    const URL = this.imgur.transform(url);
    if (gradient) {
      return this.sanitizer.bypassSecurityTrustStyle(`${getGradient(gradient)}, url(${URL})`);
    }
    return this.sanitizer.bypassSecurityTrustStyle(`url(${URL})`);
  }
}
