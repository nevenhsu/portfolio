import { BrowserModule, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { YoutubePlayerModule } from 'ngx-youtube-player';
import { ScrollToModule } from '@nicky-lenaers/ngx-scroll-to';
import 'hammerjs';
import 'hammer-timejs';

import { WorkDataService } from 'shared/work-data.service';
import { WindowsEventDirective } from 'shared/windows-event.directive';
import { ImgurPipe } from 'shared/imgur.pipe';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { WorkComponent } from './work/work.component';
import { CarouselComponent } from './carousel/carousel.component';
import { CarouselItemComponent } from './carousel/carousel-item/carousel-item.component';
import { VideoPlayerComponent } from 'shared/video-player/video-player.component';
import { CategoryComponent } from './category/category.component';
import { ProgressBarComponent } from './progress-bar/progress-bar.component';
import { MyHammerConfig } from './my-hammer-config';
import { FullscreenPlayerComponent } from 'shared/fullscreen-player/fullscreen-player.component';
import { PreviewComponent } from './preview/preview.component';
import { BackgroundImagePipe } from 'shared/background-image.pipe';
import { AnimateInModule } from 'ngx-animate-in';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    WorkComponent,
    CarouselComponent,
    CarouselItemComponent,
    WindowsEventDirective,
    VideoPlayerComponent,
    CategoryComponent,
    ProgressBarComponent,
    FullscreenPlayerComponent,
    PreviewComponent,
    BackgroundImagePipe,
    ImgurPipe
  ],
  imports: [
    BrowserModule,
    NgbModule.forRoot(),
    AppRoutingModule,
    BrowserAnimationsModule,
    YoutubePlayerModule,
    ScrollToModule.forRoot(),
    AnimateInModule
  ],
  providers: [{
    provide: HAMMER_GESTURE_CONFIG,
    useClass: MyHammerConfig
  },
    WorkDataService,
    BackgroundImagePipe,
    ImgurPipe],
  bootstrap: [AppComponent]
})
export class AppModule {
}
