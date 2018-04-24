import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WorkDataService } from 'shared/work-data.service';
import { WorkItem } from 'shared/model/work-item';
import { SafeStyle } from '@angular/platform-browser';
import { BackgroundImagePipe } from 'shared/background-image.pipe';

@Component({
  selector: 'app-work',
  templateUrl: './work.component.html',
  styleUrls: ['./work.component.css']
})
export class WorkComponent implements OnInit {

  // TODO: Detect isXS
  // TODO: Add images
  // TODO: Create full screen player component

  item: WorkItem;
  backgroundImage: SafeStyle;
  isXS: boolean;
  isShowPlayer: boolean;
  width: number;

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

  getBackgroundImage() {
    const RANDOM = Math.floor(Math.random() * 3);
    this.backgroundImage = this.backgroundImagePipe.transform(this.item.cover, RANDOM);
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
