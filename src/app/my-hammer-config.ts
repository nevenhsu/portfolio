import { HammerGestureConfig } from '@angular/platform-browser';

export class MyHammerConfig extends HammerGestureConfig {
  overrides = <any>{
    'pan': {
      direction: 30
    },
    'swipe': {
      velocity: 0.4,
      threshold: 20,
      direction: 30
    }
  };
}
