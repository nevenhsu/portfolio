import { Component, OnInit } from '@angular/core';
import { WorkItem } from 'shared/model/work-item';
import { WorkDataService } from 'shared/work-data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  items: Array<WorkItem>;
  item: WorkItem;
  currentIndex: number;
  xsSize = 576;
  isXS: boolean;
  windowWidth: number;
  windowHeight: number;
  videoId: string;

  constructor(private workDataService: WorkDataService) { }

  ngOnInit() {
    this.windowWidth = window.innerWidth;
    this.windowHeight = window.innerHeight;
    this.isXS = this.windowWidth < this.xsSize;

    this.items = this.workDataService.items;
    this.currentIndex = 0;
    this.item = this.items[this.currentIndex];
    this.videoId = this.item.videoId;
  }

  recheck(event) {
    this.windowWidth = event.width;
    this.windowHeight = event.height;
    this.isXS = this.windowWidth < this.xsSize;
  }

  changeItem(index) {
    this.item = this.items[index];
    this.currentIndex = index;
  }
}
