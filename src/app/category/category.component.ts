import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { WorkDataService } from 'shared/work-data.service';
import { SafeStyle } from '@angular/platform-browser';
import { BackgroundImagePipe } from 'shared/background-image.pipe';
import { animate, query, stagger, style, transition, trigger } from '@angular/animations';
import { SMALLSLIDE } from 'shared/animation/animations';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
  animations: [
      trigger('menuAnimation', [
          transition(':enter', [
              query('.category-item', [
                  style({opacity: 0, top: '-16px'}),
                  stagger(100, [
                      animate('250ms ease-out')
                  ])
              ])
          ]),
        transition(':leave', [
          query('.category-item', [
              animate('200ms ease-out', style({opacity: 0}))
          ])
        ])
      ]),
      SMALLSLIDE
  ]
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
              private backgroundImagePipe: BackgroundImagePipe,
              private cd: ChangeDetectorRef) { }

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
    this.cd.detectChanges();
  }

  selectCategory(category: Category) {
    this.onToggling(category);
    this.currentTitle = category.title;
  }
}
