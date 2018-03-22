import { Component } from '@angular/core';
import { ModalController, NavController } from 'ionic-angular';
import { CameraPage } from '../camera/camera';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  constructor(private navCtrl: NavController){

  }

  openCamera(){
    this.navCtrl.pop();
  }
}

