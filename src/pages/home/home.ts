import { Component, ViewChild } from '@angular/core';
import { ModalController, NavController, NavParams, Slides } from 'ionic-angular';
import { CameraPage } from '../camera/camera';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  @ViewChild(Slides) slides: Slides;
  callback = this.navParams.get("callback");
  easyBars = true;
  mediumBars = false;
  hardBars = false;

  bounceIn: boolean = true;
  currentIndex = 0;
  /* svgShow: boolean = false; */

  constructor(private navCtrl: NavController, private navParams: NavParams){
  }

  slideChanged() {
    this.currentIndex = this.slides.getActiveIndex();
    console.log('Current index is', this.currentIndex);

    if(this.currentIndex == 0){
      this.easyBars = true;
    }
    else{
      this.easyBars = false;
    }

    if(this.currentIndex == 1){
      this.mediumBars = true;
    }
    else{
      this.mediumBars = false;
    }

    if(this.currentIndex == 2){
      this.hardBars = true;
    }
    else{
      this.hardBars = false;
    }
  }

  ez(){
    this.callback(1, true).then(()=>{
      this.navCtrl.pop();
    });  
  }

  meh(){
    this.callback(2, true).then(()=>{
      this.navCtrl.pop();
    });  
  }

  wuut(){
    this.callback(3, true).then(()=>{
      this.navCtrl.pop();
    });  
  }

}

