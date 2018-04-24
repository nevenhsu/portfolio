import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FullscreenPlayerComponent } from './fullscreen-player.component';

describe('FullscreenPlayerComponent', () => {
  let component: FullscreenPlayerComponent;
  let fixture: ComponentFixture<FullscreenPlayerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FullscreenPlayerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FullscreenPlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
