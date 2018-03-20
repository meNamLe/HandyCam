import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { CameraPreviewPictureOptions, CameraPreview } from '@ionic-native/camera-preview';
import { PicModalPage } from '../pic-modal/pic-modal';
import { ClarifaiService } from '../../services/clarifai.service';
 
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  intervally: any;

  err: string = "buttface";
  success: number = 1738;
  results: any;

  //picture options
  pictureOpts: CameraPreviewPictureOptions = {
    width: 1280,
    height: 1280,
    quality: 85
  }
  picture: string;

  constructor(public navCtrl: NavController,
              private cameraPreview: CameraPreview,
              private modalCtrl: ModalController,
              private clarifaiService: ClarifaiService) {}

  allTogetherNow(){
    this.clarifaiService.setupInputs();
    this.clarifaiService.createMachine();
    this.clarifaiService.trainMachine();
  }

  predict(){
    this.results = this.clarifaiService.machinePredict2();
  }

  takePicture(){

    // take a picture
    this.cameraPreview.takePicture(this.pictureOpts).then((imageData) => {
      this.picture = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
      console.log(err);
    });

  }

  openModal(){
    let modal = this.modalCtrl.create(PicModalPage, { base64Image: this.picture });
    modal.present();
  }
  
  refresh(){
    window['location'].reload();
  }
  
  reload(){
    console.log(this.success)
  }

}

/*   testStarter(){
    this.intervally = setInterval(this.test, 1000);
  }

  test(){
    console.log('setInterval timer works and is ready to go!!');
  }
  testStopper(){
    clearInterval(this.intervally);
  } */
