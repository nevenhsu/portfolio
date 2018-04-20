import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  xsSize = 576;
  isXS: boolean;
  windowWidth: number;
  windowHeight: number;
  videoId: string;

  constructor() { }

  ngOnInit() {
    this.windowWidth = window.innerWidth;
    this.windowHeight = window.innerHeight;
    this.isXS = this.windowWidth < this.xsSize;

    this.videoId = 'tCCY31XxN_Y';
  }

  recheck(event) {
    this.windowWidth = event.width;
    this.windowHeight = event.height;
    this.isXS = this.windowWidth < this.xsSize;
  }


}
