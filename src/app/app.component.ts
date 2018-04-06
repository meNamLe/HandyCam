import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { CameraPage } from '../pages/camera/camera';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = CameraPage;

  constructor(statusBar: StatusBar, splashScreen: SplashScreen, private platform: Platform) {
    this.platform.ready().then(() => {


      statusBar.styleDefault();
      splashScreen.hide();


    })
  }
  
}