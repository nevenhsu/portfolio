import { BrowserModule, HAMMER_GESTURE_CONFIG, HammerGestureConfig } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { YoutubePlayerModule } from 'ngx-youtube-player';
import 'hammerjs';
import 'hammer-timejs';

import { WorkDataService } from 'shared/work-data.service';
import { WindowsSizeDirective } from 'shared/windows-size.directive';
import { ImgurPipe } from 'shared/imgur.pipe';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { WorkComponent } from './work/work.component';
import { CarouselComponent } from './carousel/carousel.component';
import { CarouselItemComponent } from './carousel/carousel-item/carousel-item.component';
import { VideoPlayerComponent } from 'shared/video-player/video-player.component';
import { NavComponent } from './nav/nav.component';


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


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    WorkComponent,
    CarouselComponent,
    CarouselItemComponent,
    WindowsSizeDirective,
    VideoPlayerComponent,
    NavComponent,
    ImgurPipe
  ],
  imports: [
    BrowserModule,
    NgbModule.forRoot(),
    AppRoutingModule,
    BrowserAnimationsModule,
    YoutubePlayerModule
  ],
  providers: [{
      provide: HAMMER_GESTURE_CONFIG,
      useClass: MyHammerConfig
    },
    WorkDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
