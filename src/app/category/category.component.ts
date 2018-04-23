import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { WorkDataService } from 'shared/work-data.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  // TODO: title animations
  // TODO: bar animations

  @Output('toggling') toggling = new EventEmitter<object>();
  @Input('currentTitle') currentTitle: string;
  toggle: boolean;
  categories: Array<Category>;

  constructor(private workDataService: WorkDataService) { }

  ngOnInit() {
    this.toggle = false;
    this.categories = this.workDataService.categories;
  }

  onToggling(category?: Category) {
    this.toggle = !this.toggle;
    this.toggling.emit({toggle: this.toggle, category: category});
  }

  selectCategory(category: Category) {
    this.onToggling(category);
    this.currentTitle = category.title;
  }
}
