import { Component, DoCheck, Input, OnInit } from '@angular/core';
import SuggestedVideoQuality = YT.SuggestedVideoQuality;

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.scss']
})
export class VideoPlayerComponent implements OnInit, DoCheck {

  // TODO: add cover
  // TODO: detect id change

  @Input('isXS') isXS: boolean;
  @Input('isBG') isBG: boolean;
  @Input('videoId') videoId: string;
  @Input('width') width: number;
  @Input('height') height: number;

  player: YT.Player;
  quality: SuggestedVideoQuality;
  playerVars: YT.PlayerVars;
  isPlaying: boolean;
  scaleRange = 200;

  constructor() {}

  ngOnInit() {
    this.quality = this.isXS ? 'hd720' : 'hd1080';
    this.playerVars = this.isBG ? {
      autohide: 1,
      autoplay: 1,
      controls: 0,
      disablekb: 1,
      fs: 0,
      loop: 1,
      modestbranding: 1,
      playsinline: 1,
      rel: 0,
      showinfo: 0
    } : {
      autohide: 1,
      modestbranding: 1,
    };
  }

  ngDoCheck() {
    if ( this.player) {
      this.scale(this.width, this.height);
    }
  }

  initPlayer(player) {
    this.player = player;
    this.setQuality();
    this.scale(this.width, this.height);

    if (this.isBG) {
      this.player.mute();
      this.player.playVideo();
    }
  }

  onStateChange(event) {
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
