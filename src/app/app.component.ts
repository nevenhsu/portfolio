import { Component, OnInit } from '@angular/core';
import { WorkItem } from 'shared/model/work-item';
import { WorkDataService } from 'shared/work-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Portfolio';
  items: Array<WorkItem>;

  constructor(private workDataService: WorkDataService) {}

  ngOnInit() {
    this.items = this.workDataService.items;
  }

}
