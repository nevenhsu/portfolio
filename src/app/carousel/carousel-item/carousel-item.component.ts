import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-carousel-item',
  templateUrl: './carousel-item.component.html',
  styleUrls: ['./carousel-item.component.css'],
})
export class CarouselItemComponent implements OnInit {

  @Input('slideItem') slideItem: any;
  @Output('onClick') onClick = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }

  clickItem() {
    this.onClick.emit(this.slideItem);
  }

}
