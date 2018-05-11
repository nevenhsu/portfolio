import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FADE } from 'shared/animation/animations';

@Component({
  selector: 'app-fullscreen-player',
  templateUrl: './fullscreen-player.component.html',
  styleUrls: ['./fullscreen-player.component.scss'],
  animations: [
    FADE
  ]
})
export class FullscreenPlayerComponent implements OnInit {

  @Output('changeState') changeState = new EventEmitter<YT.PlayerEvent>();
  @Output('tapClose') tapClose = new EventEmitter<boolean>();
  @Input('videoId') videoId: string;
  @Input('isXS') isXS: boolean;
  width: number;
  height: number;

  constructor() { }

  ngOnInit() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
  }

  onStateChange(event) {
    this.changeState.emit(event);
  }

  onTapClose() {
    this.tapClose.emit(false);
  }

  setSize(event) {
    this.width = event.width;
    this.height = event.height;
  }

}
