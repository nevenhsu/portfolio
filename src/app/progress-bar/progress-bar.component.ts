import { Component, Input, OnInit } from '@angular/core';
import { FADE } from 'shared/animation/animations';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.scss'],
  animations: [
      FADE
  ]
})
export class ProgressBarComponent implements OnInit {

  // TODO: Change Color

  @Input('totalItems') totalItems: number;
  @Input('currentIndex') currentIndex: number;

  constructor() { }

  ngOnInit() {
  }

  get number(): number {
    return this.currentIndex + 1;
  }

  get percentage(): number {
    return this.number / this.totalItems * 100;
  }
}
