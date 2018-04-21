import { Component, OnInit } from '@angular/core';
import * as data from 'shared/works.json';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';

  ngOnInit() {
    const works = (<any>data).items;
    console.log('json: ', works);
  }

}
