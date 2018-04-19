import { AfterViewChecked, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewChecked {

  isXS: boolean;
  isChecked: boolean;

  constructor() { }

  ngOnInit() {
    this.isXS = window.innerWidth < 576;
  }

  ngAfterViewChecked() {
    if (!this.isChecked) {
      const INTERVAL = setTimeout(() => {
        this.isChecked = true;
        clearTimeout(INTERVAL);
      });
    }
  }

  recheck(event) {
    this.isXS = event.x < 576;
    this.isChecked = false;
  }


}
