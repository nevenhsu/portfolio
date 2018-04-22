import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-carousel-item',
  templateUrl: './carousel-item.component.html',
  styleUrls: ['./carousel-item.component.css'],
})
export class CarouselItemComponent implements OnInit {

  @Input('slideItem') slideItem: any;
  @Output('clickItem') clickItem = new EventEmitter<any>();
  @Input('isXS') isXS: boolean;

  constructor() { }

  ngOnInit() {
  }

  onClick() {
    this.clickItem.emit(this.slideItem);
  }

}
