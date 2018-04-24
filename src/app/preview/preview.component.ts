import { Component, Input, OnInit } from '@angular/core';
import { WorkItem } from 'shared/model/work-item';
import { Router } from '@angular/router';
import { SafeStyle } from '@angular/platform-browser';
import { BackgroundImagePipe } from 'shared/background-image.pipe';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss']
})
export class PreviewComponent implements OnInit {

  @Input('item') item: WorkItem;
  bgImage: SafeStyle;

  constructor(private router: Router, private backgrondImage: BackgroundImagePipe) { }

  ngOnInit() {
    this.bgImage = this.backgrondImage.transform(this.item.cover);
  }

  onTapCase() {
    this.router.navigateByUrl(this.item.link);
  }

}
