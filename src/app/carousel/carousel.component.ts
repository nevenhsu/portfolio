import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Sliding } from 'shared/Enums';
import { CarouselItemComponent } from './carousel-item/carousel-item.component';


@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css'],
})

export class CarouselComponent implements OnInit {

  @ViewChild(CarouselItemComponent, {read: ElementRef}) carouselItem: ElementRef;
  @Input('isXS') isXS: boolean;

  items: Array<any> = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
  centerIndex: number;
  slides: Array<any>;
  totalSlides: number;

  sliding = Sliding;
  carouselState: string;
  isPanning = false;
  distanceX = 0;
  distanceY = 0;
  updateState = 0;
  animating: boolean;

  constructor() { }

  ngOnInit() {
    this.totalSlides = 5;
    // FIXME: should await loading items
    this.centerIndex = 0;
    this.resetSlides(this.centerIndex);
  }

  get itemWidth(): number {
    return this.carouselItem.nativeElement.offsetWidth;
  }

  get itemHeight(): number {
    return this.carouselItem.nativeElement.offsetHeight;
  }

  get totalItems(): number {
    if (!this.items) { return 0; }
    return this.items.length;
  }
  get centerDistance(): number {
    return Math.floor(this.totalSlides / 2);
  }

  loopIndex(value: number, array: Array<any> = this.items): number {
    while ( value < 0 ) {
      value += array.length;
    }
    return value % array.length;
  }

  getPrevIndex(index: number): number {
    // if total = 12; current = 0;  PREV = -3; result = 9;
    const PREV = index - this.centerDistance - 1;
    return this.loopIndex(PREV);
  }

  getNextIndex(index: number): number {
    // if total = 12; current = 11;  NEXT = 14; result = 2;
    const NEXT = index + this.centerDistance + 1;
    return this.loopIndex(NEXT);
  }

  resetSlides(center: number) {
    if (this.totalItems === 0) {return; }

    this.centerIndex = center;
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
        if (!this.isXS) {break; }
        this.slideToNext();
        break;
      }

      case Sliding.Left : {
        if (!this.isXS) {break; }
        this.slideToPrev();
        this.distanceX = -this.itemWidth;
        this.animating = true;
        this.distanceX = 0;
        break;
      }

      case Sliding.Down: {
        if (this.isXS) {break; }
        this.slideToNext();
        break;
      }

      case Sliding.Up: {
        if (this.isXS) {break; }
        this.slideToPrev();
        break;
      }
    }
  }

  slideToNext() {
    const NEXT = this.getNextIndex(this.centerIndex);
    this.slides.push(this.items[NEXT]);
    this.centerIndex = this.loopIndex(this.centerIndex + 1);
    this.slides.splice(0, 1);
  }

  slideToPrev() {
    const PREV = this.getPrevIndex(this.centerIndex);
    this.slides.unshift(this.items[PREV]);
    this.centerIndex = this.loopIndex(this.centerIndex - 1);
    this.slides.splice(-1, 1);
  }

  panSlides(event, sliding: Sliding) {
    let value = this.isXS ? event.deltaX : event.deltaY;
    value *= 1.5;
    this.distanceX = this.isXS ? value % this.itemWidth : 0;
    this.distanceY = this.isXS ? 0 : value % this.itemHeight;

    const BASE = this.isXS ? this.itemWidth : this.itemHeight;
    const STATE = this.calculateTimes(value, BASE);
    if (STATE !== this.updateState) {
      this.updateSlides(sliding);
      this.updateState = STATE;
    }
  }

  calculateTimes(value: number, base: number): number {
    return value >= 0 ? Math.floor(value / base) : Math.ceil(value / base);
  }

  slideToItem(item: any) {
    const INDEX = this.slides.indexOf(item);
    if ( INDEX > this.centerDistance ) {
      this.updateNextSlide();
    } else {
      this.updatePrevSlide();
    }
  }

  slideThreshold() {
    const X = this.distanceX % this.itemWidth;
    const Y = this.distanceY % this.itemHeight;
    if (Y > this.itemHeight / 2 || X > this.itemWidth / 2) {
      this.updatePrevSlide();
    } else if (Y < -this.itemHeight / 2 || X < -this.itemWidth / 2 ) {
      this.updateNextSlide();
    }
  }

  updateNextSlide() {
    this.updateSlides(this.sliding.Down);
    this.updateSlides(this.sliding.Right);
  }

  updatePrevSlide() {
    this.updateSlides(this.sliding.Up);
    this.updateSlides(this.sliding.Left);
  }
}
