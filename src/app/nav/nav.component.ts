import { Component, Input, OnInit } from '@angular/core';
import { WorkDataService } from 'shared/work-data.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  // TODO: resposive css
  // TODO: title animations
  // TODO: bar animations

  @Input('width') width: number;
  @Input('height') height: number;
  @Input('isXS') isXS: boolean;
  toggle: boolean;
  currentTitle: string;
  categories: Array<Category>;

  constructor(private workDataService: WorkDataService) { }

  ngOnInit() {
    this.toggle = false;
    this.categories = this.workDataService.categories;
    this.currentTitle = this.categories[0].title;
  }

  toggling() {
    this.toggle = !this.toggle;
  }

  selectCategory(category: Category) {
    this.toggling();
    this.currentTitle = category.title;
  }
}
