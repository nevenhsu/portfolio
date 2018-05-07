import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild
} from '@angular/core';
import { Sliding } from 'shared/enums';
import { CarouselItemComponent } from './carousel-item/carousel-item.component';
import { animate, query, stagger, style, transition, trigger } from '@angular/animations';
import { WorkItem } from 'shared/model/work-item';


@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css'],
  animations: [
      trigger('listAnimation', [
          transition(':enter', [
              query('.slide-item', [
                  style({opacity: 0}),
                  stagger(100, [
                      animate('150ms ease-out')
                  ])
              ])
          ]),
          transition(':leave', [
              animate('250ms ease-out',
                  style({opacity: 0}))
          ])
      ]),

      trigger('slideState', [

          transition('void => horizon', [
              style({width: 0}),
              animate('0.25s ease-out')
          ]),

          transition('horizon => void', [
            animate('0.25s ease-out', style({width: 0}))
          ]),

          transition('void => vertical', [
            style({height: 0}),
            animate('0.25s ease-out')
          ]),

          transition('vertical => void', [
            animate('0.25s ease-out', style({height: 0}))
          ])
      ])
  ]
})

export class CarouselComponent implements OnInit {

  @ViewChild(CarouselItemComponent, {read: ElementRef}) carouselItem: ElementRef;
  @Output('update') update = new EventEmitter<number>();
  @Output('tapPlay') tapPlay = new EventEmitter<WorkItem>();
  @Output('tapCarousel') tapCarousel = new EventEmitter<WorkItem>();
  @Output('startPanning') startPanning =  new EventEmitter<boolean>();
  @Output('stopPanning') stopPanning =  new EventEmitter<boolean>();
  @Input('isXS') isXS: boolean;
  @Input('currentIndex') currentIndex: number;
  @Input('items') items: Array<WorkItem>;
  slides: Array<WorkItem>;
  totalSlides = 5;

  sliding = Sliding;
  isPanning = false;
  distanceX = 0;
  distanceY = 0;
  updateState = 0;
  slideState: string;

  static loopIndex(value: number, array: Array<any>): number {
    while (value < 0) {
      value += array.length;
    }
    return value % array.length;
  }

  constructor() { }

  ngOnInit() {
    this.resetSlides(this.currentIndex);
  }

  get itemWidth(): number {
    return this.carouselItem.nativeElement.offsetWidth;
  }

  get itemHeight(): number {
    return this.carouselItem.nativeElement.offsetHeight;
  }

  get totalItems(): number {
    return this.items ? this.items.length : 0;
  }

  get centerDistance(): number {
    return Math.floor(this.totalSlides / 2);
  }

  getPrevIndex(index: number): number {
    // if total = 12; current = 0;  PREV = -3; result = 9;
    const PREV = index - this.centerDistance - 1;
    return CarouselComponent.loopIndex(PREV, this.items);
  }

  getNextIndex(index: number): number {
    // if total = 12; current = 11;  NEXT = 14; result = 2;
    const NEXT = index + this.centerDistance + 1;
    return CarouselComponent.loopIndex(NEXT, this.items);
  }

  resetSlides(center: number) {
    if (this.totalItems === 0) {
      return;
    }

    this.currentIndex = center;
    this.slides = [];
    let index = this.getPrevIndex(center + 1);

    for (let i = 0; i < this.totalSlides; i++) {
      index = index < this.totalItems ? index : 0;
      this.slides.push(this.items[index]);
      index++;
    }
  }

  updateSlides(sliding: Sliding) {
    switch (sliding) {
      case Sliding.Right : {
        this.slideAnimate('horizon');
        this.slideToNext();
        break;
      }

      case Sliding.Left : {
        this.slideAnimate('horizon');
        this.slideToPrev();
        break;
      }

      case Sliding.Down: {
        this.slideAnimate('vertical');
        this.slideToNext();
        break;
      }

      case Sliding.Up: {
        this.slideAnimate('vertical');
        this.slideToPrev();
        break;
      }
    }
    this.update.emit(this.currentIndex);
  }

  slideAnimate(orientation) {
    if (this.isPanning) {
      this.slideState = '';
      return;
    }
    this.slideState = orientation;
  }

  slideToNext() {
    const NEXT = this.getNextIndex(this.currentIndex);
    this.slides.push(this.items[NEXT]);
    this.currentIndex = CarouselComponent.loopIndex(this.currentIndex + 1, this.items);
    this.slides.splice(0, 1);
  }

  slideToPrev() {
    const PREV = this.getPrevIndex(this.currentIndex);
    this.slides.unshift(this.items[PREV]);
    this.currentIndex = CarouselComponent.loopIndex(this.currentIndex - 1, this.items);
    this.slides.splice(-1, 1);
  }

  panSlides(event, sliding: Sliding) {
    const MULTIPLE = 1.5;
    const VALUE = this.isXS ? event.deltaX * MULTIPLE : event.deltaY * MULTIPLE;
    this.distanceX = this.isXS ? VALUE % this.itemWidth : 0;
    this.distanceY = this.isXS ? 0 : VALUE % this.itemHeight;

    const UNIT = this.isXS ? this.itemWidth : this.itemHeight;
    const STATE = this.calculateTimes(VALUE, UNIT);
    if (STATE !== this.updateState) {
      this.updateSlides(sliding);
      this.updateState = STATE;
    }
  }

  calculateTimes(value: number, unit: number): number {
    return value >= 0 ? Math.floor(value / unit) : Math.ceil(value / unit);
  }

  slideToItem(item: any) {
    const INDEX = this.slides.indexOf(item);

    for (let i = INDEX; i > this.centerDistance; i--) {
      this.updateNextSlide();
    }
    for (let i = INDEX; i < this.centerDistance; i++) {
      this.updatePrevSlide();
    }
  }

  slideThreshold() {
    const DENOMINATOR = 1.25;
    const X = this.distanceX % this.itemWidth;
    const Y = this.distanceY % this.itemHeight;
    if (Y > this.itemHeight / DENOMINATOR || X > this.itemWidth / DENOMINATOR) {
      this.updatePrevSlide();
    } else if (Y < -this.itemHeight / DENOMINATOR || X < -this.itemWidth / DENOMINATOR) {
      this.updateNextSlide();
    }
  }

  updateNextSlide() {
    if (this.isXS) {
      this.updateSlides(this.sliding.Right);
      return;
    }
    this.updateSlides(this.sliding.Down);
  }

  updatePrevSlide() {
    if (this.isXS) {
      this.updateSlides(this.sliding.Left);
      return;
    }
    this.updateSlides(this.sliding.Up);
  }

  resetState() {
    this.slideThreshold();
    this.distanceX = 0;
    this.distanceY = 0;
    this.isPanning = false;
    this.updateState = 0;
    this.stopPanning.emit(false);
  }

  onTapPlay(event) {
    this.tapPlay.emit(event);
  }

  onTap(event) {
    console.log('1: ', event);
    this.tapCarousel.emit(event);
  }

  onPanning() {
    this.isPanning = true;
    this.startPanning.emit(true);
  }


}
