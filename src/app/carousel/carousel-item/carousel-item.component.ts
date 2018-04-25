import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { WorkItem } from 'shared/model/work-item';
import { SafeStyle } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { BackgroundImagePipe } from 'shared/background-image.pipe';

@ Component({
  selector: 'app-carousel-item',
  templateUrl: './carousel-item.component.html',
  styleUrls: ['./carousel-item.component.scss'],
})
export class CarouselItemComponent implements OnInit {

  @Output('clickItem') clickItem = new EventEmitter<WorkItem>();
  @Output('tapPlay') tapPlay = new EventEmitter<WorkItem>();
  @Input('item') item: WorkItem;
  @Input('isXS') isXS: boolean;
  backgroundImg: SafeStyle;

  constructor(private router: Router,
              private backgroundImagePipe: BackgroundImagePipe) { }

  ngOnInit() {
    this.backgroundImg = this.backgroundImagePipe.transform(this.item.thumbnail);
  }

  onClick() {
    this.clickItem.emit(this.item);
  }

  onTapPlay() {
    this.tapPlay.emit(this.item);
  }

  onTapCase() {
    this.router.navigateByUrl(this.item.link);
  }

}
