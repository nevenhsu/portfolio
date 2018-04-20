import { Component, Input, OnInit } from '@angular/core';
import SuggestedVideoQuality = YT.SuggestedVideoQuality;

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.scss']
})
export class VideoPlayerComponent implements OnInit {

  @Input('isXS') isXS: boolean;
  @Input('videoId') videoId: string;
  @Input('width') width: number;
  @Input('height') height: number;
  player: YT.Player;
  quality: SuggestedVideoQuality;
  playerVars: YT.PlayerVars;
  isPlaying: boolean;

  constructor() {}

  ngOnInit() {
    this.quality = this.isXS ? 'hd720' : 'hd1080';
    this.playerVars = {
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
    };
  }

  initPlayer(player) {
    this.player = player;
    this.player.mute();
    this.player.setPlaybackQuality(this.quality);
    this.player.playVideo();

    console.log(player.playerVars, this.playerVars);
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
        this.player.mute();
        this.player.playVideo();
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
    console.log(event.data);
  }
}
