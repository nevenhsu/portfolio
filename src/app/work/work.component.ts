import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WorkDataService } from 'shared/work-data.service';
import { WorkItem } from 'shared/model/work-item';
import { SafeStyle } from '@angular/platform-browser';
import { BackgroundImagePipe } from 'shared/background-image.pipe';
import { animate, style } from '@angular/animations';
import { FADE, SLIDE } from 'shared/animation/animations';

@Component({
  selector: 'app-work',
  templateUrl: './work.component.html',
  styleUrls: ['./work.component.scss'],
  animations: [
      SLIDE,
      FADE
  ]
})
export class WorkComponent implements OnInit {

  // TODO: Detect isXS
  // TODO: Add images
  // TODO: Create full screen player component

  item: WorkItem;
  backgroundImage: SafeStyle;
  coverImage: SafeStyle;
  isXS: boolean;
  isShowPlayer: boolean;
  width: number;
  fadeAnimation = [
    style({opacity: 0, transform: 'translateY(16px)'}),
    animate('500ms ease-in-out', style({opacity: 1, transform: 'translateY(0px)'}))
  ];

  constructor(private route: ActivatedRoute,
              private workDataService: WorkDataService,
              private backgroundImagePipe: BackgroundImagePipe) { }

  ngOnInit() {
    this.getItem();
    this.width = window.innerWidth;
    this.isXS = this.width < 576;
    this.isShowPlayer = false;
  }

  getItem() {
    this.route.params.subscribe(params => {
      const LINK = params['link'];
      this.item = this.workDataService.getItem(LINK);
      this.getBackgroundImage();
    });
  }

  getCategoryIndex(): number {
    const CATEGORIES = this.workDataService.categories;
    for (let i = 0; i < CATEGORIES.length; i++) {
      const TITLE = CATEGORIES[i].title;
      if (this.item.category === TITLE) {
        return i;
      }
    }
  }

  getBackgroundImage() {
    const INDEX = this.getCategoryIndex();
    this.backgroundImage = this.backgroundImagePipe.transform(this.item.cover, INDEX);
    this.coverImage = this.backgroundImagePipe.transform(this.item.cover);
  }

  onResize(event) {
    this.width = event.width;
    this.isXS = this.width < 576;
  }

  playVideo() {
    this.isShowPlayer = true;
  }

  onStateChange(state) {
    //  UNSTARTED = -1,
    //  ENDED = 0,
    //  PLAYING = 1,
    //  PAUSED = 2,
    //  BUFFERING = 3,
    //  CUED = 5
    if (state === 0) {
      this.isShowPlayer = false;
    }
  }

  onTapClose() {
    this.isShowPlayer = false;
  }

}
