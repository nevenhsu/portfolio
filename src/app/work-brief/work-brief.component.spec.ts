import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkBriefComponent } from './work-brief.component';

describe('WorkBriefComponent', () => {
  let component: WorkBriefComponent;
  let fixture: ComponentFixture<WorkBriefComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkBriefComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkBriefComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
