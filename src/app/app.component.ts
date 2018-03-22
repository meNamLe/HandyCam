import { Component } from '@angular/core';
import { Platform, ModalController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { CameraPage } from '../pages/camera/camera';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = CameraPage;

  constructor(statusBar: StatusBar, splashScreen: SplashScreen, private platform: Platform, private modalCtrl: ModalController) {
    this.platform.ready().then(() => {


      statusBar.styleDefault();
      splashScreen.hide();

      let modal = modalCtrl.create(HomePage);
      modal.present();
    })
  }
}