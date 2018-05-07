import { AfterViewChecked, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { WorkItem } from 'shared/model/work-item';
import { WorkDataService } from 'shared/work-data.service';
import { CarouselComponent } from '../carousel/carousel.component';
import { SafeStyle } from '@angular/platform-browser';
import { BackgroundImagePipe } from 'shared/background-image.pipe';
import { VideoPlayerComponent } from 'shared/video-player/video-player.component';
import { FADE, SLIDE } from 'shared/animation/animations';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    SLIDE,
    FADE
  ]
})
export class HomeComponent implements OnInit, AfterViewChecked {

  // TODO: Show video player animation

  @ViewChild('bgVideoPlayerComponent') bgVideoPlayerComponent: VideoPlayerComponent;
  items: Array<WorkItem>;
  item: WorkItem;
  playItem: WorkItem;
  currentIndex: number;
  xsSize = 576;
  isXS: boolean;
  windowWidth: number;
  windowHeight: number;
  videoId: string;
  start: number;
  end: number;
  bgCoverImage: SafeStyle;
  isBgVideoChanged: boolean;
  isBgVideoPlaying: boolean;
  isShowCarousel: boolean;
  isShowCategory: boolean;
  isShowPlayer: boolean;
  isPanning: boolean;

  constructor(private workDataService: WorkDataService,
              private cd: ChangeDetectorRef,
              private backgrondImage: BackgroundImagePipe) { }

  ngOnInit() {
    this.windowWidth = window.innerWidth;
    this.windowHeight = window.innerHeight;
    this.isXS = this.windowWidth < this.xsSize;
    this.isShowCarousel = this.isXS;
    this.isShowCategory = false;
    this.items = this.workDataService.items;
    this.currentIndex = 0;
    this.setItem(this.currentIndex);
    this.isBgVideoChanged = true;
  }

  ngAfterViewChecked() {
    if (!this.isBgVideoChanged) {
      this.isBgVideoChanged = true;
      this.cd.detectChanges();
    }
  }

  recheck(event) {
    this.windowWidth = event.width;
    this.windowHeight = event.height;
    this.isXS = this.windowWidth < this.xsSize;
    this.isShowCarousel = this.isXS;
  }

  togglingCarousel(event) {
    console.log(event);
    if (event.target.className.includes('carousel-back')) {
      this.isShowCarousel = this.isXS ? true : !this.isShowCarousel;
    }
  }

  checkShowCarousel(): boolean {
    return !this.isXS ? !this.isShowCarousel : true;
  }

  setItem(index) {
    this.isBgVideoChanged = false;
    this.isBgVideoPlaying = false;

    const INDEX = CarouselComponent.loopIndex(index, this.items);
    this.currentIndex = INDEX;
    this.item = this.items[INDEX];
    this.videoId = this.item.videoId;
    this.start = this.item.startSeconds;
    this.end = this.item.endSeconds;
    this.bgCoverImage = this.backgrondImage.transform(this.item.cover);

    this.cd.detectChanges();
  }

  togglingCategory(event) {
    this.isShowCategory = event.toggle;

    if (!event.category) {return; }
    this.setItem(event.category.startIndex);

    if (!this.isXS) {return; }
    this.isShowCarousel = !this.isShowCategory;
  }

  onTapPlay(item) {
    this.isShowPlayer = true;
    this.playItem = item;
  }

  onTapClose() {
    this.isShowPlayer = false;
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

  onBgStateChange(state) {
    switch (state) {
      case 0: {
        if (this.isXS) {return; }
        this.setItem(this.currentIndex + 1);
        break;
      }

      case 1: {
        this.isBgVideoPlaying = true;
        break;
      }
      case 3: {
        break;
      }
      default: {
        this.isBgVideoPlaying = false;
      }
    }
  }

  onWheeling(data) {
    if (this.isShowCarousel) {return; }

    if (data.deltaY > 80) {
      this.setItem(this.currentIndex + 1);
    }

    if (data.deltaY < -80) {
      this.setItem(this.currentIndex - 1);
    }
  }

}
