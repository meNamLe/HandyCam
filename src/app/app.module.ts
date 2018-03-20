import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { CameraPreview } from '@ionic-native/camera-preview'

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { PicModalPage } from '../pages/pic-modal/pic-modal';
import { ClarifaiService } from '../services/clarifai.service';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    PicModalPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    PicModalPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    CameraPreview,
    ClarifaiService,
  ]
})
export class AppModule {}
