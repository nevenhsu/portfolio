import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { WorkItem } from 'shared/model/work-item';
import { Router } from '@angular/router';
import { SafeStyle } from '@angular/platform-browser';
import { BackgroundImagePipe } from 'shared/background-image.pipe';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss']
})
export class PreviewComponent implements OnInit, OnChanges {

  @Input('item') item: WorkItem;
  bgImage: SafeStyle;

  constructor(private router: Router, private backgrondImage: BackgroundImagePipe) { }

  ngOnInit() {
    this.setBackgroundImage();
  }

  ngOnChanges() {
    this.setBackgroundImage();
  }

  onTapCase() {
    this.router.navigateByUrl(this.item.link);
  }

  setBackgroundImage() {
    this.bgImage = this.backgrondImage.transform(this.item.cover);
  }

}
