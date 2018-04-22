import { Injectable } from '@angular/core';
import { WorkItem } from 'shared/model/work-item';
import * as data from 'shared/works.json';

@Injectable()
export class WorkDataService {

  constructor() { }

  get items(): Array<WorkItem> {
    const ITEMS = [];
    for (const ITEM of (<any>data).items) {
      ITEMS.push(ITEM);
    }
    return ITEMS;
  }

  get categories(): Array<Category> {
    const CATEGORIES = [];
    for (const CATEGORY of (<any>data).categories) {
      CATEGORIES.push(CATEGORY);
    }
    return CATEGORIES;
  }



}
