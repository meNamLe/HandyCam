import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { CameraPreview } from '@ionic-native/camera-preview';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = HomePage;

  constructor(statusBar: StatusBar, splashScreen: SplashScreen, private cameraPreview: CameraPreview, private platform: Platform) {
    this.platform.ready().then(() => {


      statusBar.styleDefault();
      splashScreen.hide();

      let options = {
        x: 0,
        y: 0,
        width: window.screen.width,
        height: window.screen.height,
        camera: 'front',
        toBack: true,
        tapPhoto: false,
        previewDrag: false
      };
      this.cameraPreview.startCamera(options);
    })
  }
}