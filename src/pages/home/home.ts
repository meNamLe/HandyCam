import { Component } from '@angular/core';
import { ModalController, NavController, NavParams } from 'ionic-angular';
import { CameraPage } from '../camera/camera';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  callback = this.navParams.get("callback");
  constructor(private navCtrl: NavController, private navParams: NavParams){
  }


  openCamera(){
    this.callback(true).then(()=>{
      this.navCtrl.pop();
    });  
  }
}

