import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-fullscreen-player',
  templateUrl: './fullscreen-player.component.html',
  styleUrls: ['./fullscreen-player.component.scss']
})
export class FullscreenPlayerComponent implements OnInit {

  @Output('changeState') changeState = new EventEmitter<YT.PlayerEvent>();
  @Output('tapClose') tapClose = new EventEmitter<boolean>();
  @Input('videoId') videoId: string;
  @Input('width') width: string;
  @Input('height') height: string;
  @Input('isXS') isXS: boolean;

  constructor() { }

  ngOnInit() {
  }

  onStateChange(event) {
    this.changeState.emit(event);
  }

  onTapClose() {
    this.tapClose.emit(false);
  }

}
