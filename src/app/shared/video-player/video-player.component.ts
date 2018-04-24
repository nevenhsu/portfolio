import { Component, DoCheck, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import SuggestedVideoQuality = YT.SuggestedVideoQuality;

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.scss']
})
export class VideoPlayerComponent implements OnInit, DoCheck {

  @Output('changeState') changeState = new EventEmitter<YT.PlayerEvent>();
  @Input('isXS') isXS: boolean;
  @Input('isBG') isBG: boolean;
  @Input('videoId') videoId: string;
  @Input('width') width: number;
  @Input('height') height: number;
  @Input('autoPlay') autoPlay = true;
  @Input('start') start: number;
  @Input('end') end: number;

  player: YT.Player;
  quality: SuggestedVideoQuality;
  isPlaying: boolean;
  scaleRange = 200;
  playerVars: YT.PlayerVars;
  bgVars: YT.PlayerVars;
  defaultVars = {
    autohide: 1,
    modestbranding: 1,
    rel: 0
  };

  constructor() {}

  ngOnInit() {
    if (!this.width) {
      this.width = window.innerWidth;
    }
    this.quality = this.isXS ? 'hd720' : 'hd1080';
    this.checkVars();
  }

  ngDoCheck() {
    this.checkVars();

    if ( this.player) {
      this.scale(this.width, this.height);
    }
  }

  checkVars() {
    this.bgVars = {
      autohide: 1,
      autoplay: 1,
      controls: 0,
      disablekb: 1,
      fs: 0,
      loop: 1,
      modestbranding: 1,
      playsinline: 1,
      rel: 0,
      showinfo: 0,
      start: this.start,
      end: this.end
    };
    this.playerVars = this.isBG ? this.bgVars : this.defaultVars;
  }

  initPlayer(player) {
    this.player = player;
    this.setQuality();
    this.scale(this.width, this.height);

    if (this.isBG) {
      this.player.mute();
    }

    if (this.autoPlay) {
      this.player.playVideo();
    }
  }

  onStateChange(event) {
    this.changeState.emit(event.data);
    //  UNSTARTED = -1,
    //  ENDED = 0,
    //  PLAYING = 1,
    //  PAUSED = 2,
    //  BUFFERING = 3,
    //  CUED = 5
    switch (event.data) {
      case -1: case 0: {
        this.isPlaying = false;

        if (this.isBG) {
          this.player.mute();
          this.player.seekTo(this.start, true);
          this.player.playVideo();
        }
        break;
      }
      case 1: {
        this.isPlaying = true;
        break;
      }
      case 3: {
        this.isPlaying = false;
        break;
      }
    }
  }

  scale(w: number, h: number) {
    this.setQuality();

    if (this.isBG) {
      w += this.scaleRange;
      h += this.scaleRange;
      if (w / h > 16 / 9) {
        this.player.setSize(w, w * 9 / 16);
        return;
      } else {
        this.player.setSize(h * 16 / 9, h);
        return;
      }
    }

    this.player.setSize(w, w * 9 / 16);
  }

  setQuality() {
    if (!this.player) {return; }
    this.quality = this.isXS ? 'hd720' : 'hd1080';
    this.player.setPlaybackQuality(this.quality);
  }

}
