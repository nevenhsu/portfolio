import { Directive, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[appWindowsEvent]'
})
export class WindowsEventDirective {

  @Output('resize') resize = new EventEmitter<object>();
  @Output('wheel') wheel = new EventEmitter<object>();

  constructor() { }

  @HostListener('window:resize', ['$event']) onResize(event) {
    this.resize.emit({width: event.target.innerWidth, height: event.target.innerHeight});
  }

  @HostListener('mousewheel', ['$event']) onMousewheel(event) {
    this.wheel.emit(event.wheelDelta);
  }



}
