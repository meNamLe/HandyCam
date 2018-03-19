import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the PicModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pic-modal',
  templateUrl: 'pic-modal.html',
})
export class PicModalPage {
  picture: string;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.picture = navParams.get('base64Image');
    console.log(this.picture);
  }

  pop(){
    this.navCtrl.pop();
  }

}
