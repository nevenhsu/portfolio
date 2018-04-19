import { Directive, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[appWindowsSize]'
})
export class WindowsSizeDirective {

  @Output('onResize') resize = new EventEmitter<object>();

  constructor() { }

  @HostListener('window:resize', ['$event']) onResize(event) {
    this.resize.emit({x: event.target.innerWidth, y: event.target.innerHeight});
  }

}
