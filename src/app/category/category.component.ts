import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { WorkDataService } from 'shared/work-data.service';
import { SafeStyle } from '@angular/platform-browser';
import { BackgroundImagePipe } from 'shared/background-image.pipe';

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
  backgroundImages: Array<SafeStyle>;

  constructor(private workDataService: WorkDataService,
              private backgroundImagePipe: BackgroundImagePipe) { }

  ngOnInit() {
    this.toggle = false;
    this.backgroundImages = [];
    this.categories = this.workDataService.categories;

    for (let i = 0; i < this.categories.length; i++) {
      const CATEGORY = this.categories[i];
      const IMAGEURL = CATEGORY.image;
      const BGIMAGE = this.backgroundImagePipe.transform(IMAGEURL, i, -135);
      this.backgroundImages.push(BGIMAGE);
    }
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
