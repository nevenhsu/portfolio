import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-prograss-bar',
  templateUrl: './prograss-bar.component.html',
  styleUrls: ['./prograss-bar.component.scss']
})
export class PrograssBarComponent implements OnInit {

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
