import { Directive, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[appWindowsSize]'
})
export class WindowsSizeDirective {

  @Output('onResize') resize = new EventEmitter<object>();

  constructor() { }

  @HostListener('window:resize', ['$event']) onResize(event) {
    this.resize.emit({width: event.target.innerWidth, height: event.target.innerHeight});
  }

}
