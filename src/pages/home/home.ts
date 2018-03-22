import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { CameraPreviewPictureOptions, CameraPreview } from '@ionic-native/camera-preview';
// import { PicModalPage } from '../pic-modal/pic-modal';
import { ClarifaiService } from '../../services/clarifai.service';

import * as Clarifai from 'clarifai';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  app = new Clarifai.App({
    apiKey: 'baec139d8dc34e64bcfd3ecac2bcf1b6'
  });
  


  //picture options
  pictureOpts: CameraPreviewPictureOptions = {
    width: 1280,
    height: 1280,
    quality: 85
  }
  picArr = [
    'get dunked on',
    'get dunked on',
    'get dunked on',
    'get dunked on',
    'get dunked on',
    'get dunked on',
    'get dunked on',
    'get dunked on',
    'get dunked on',
    'get dunked on'
  ]
  picNum = 0;
/*   results = [
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    ''
  ] */
  results = [
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0
  ]

  constructor(public navCtrl: NavController,
              private cameraPreview: CameraPreview,
              private modalCtrl: ModalController,
              private clarifaiService: ClarifaiService) {}

  //setup code
  async allTogetherNow(){
    this.clarifaiService.setupInputs();
    this.clarifaiService.trainMachine();
  }


  //clarifai predict function
  predict = (base64: string) => {
      //let imageData = base64.replace(/^data:image\/(.*);base64,/, '');
      let imageData = 'https://i.imgur.com/C3lTlqU.jpg';
      this.app.models.predict("read-hands", [imageData]).then(
  
          (response) => {
                  console.log('predit');
                  console.log(response);
                  console.log(response.outputs[0].data.concepts[0]);
                  if(response.outputs[0].data.concepts[0].value > .4){
                    this.results[this.picNum] = response.outputs[0].data.concepts[0].value
                  }
                  this.picNum = this.picNum + 1;
          },
          (err) => {
                  console.log(err);

          }
      )
    }
  //cameraPreview capture picture function
  async takePicture(){
    // take a picture
/*       await this.cameraPreview.takePicture(this.pictureOpts).then((imageData) => {
      this.picArr[this.picNum] = ('data:image/jpeg;base64,' + imageData);
    }, (err) => {
      console.log(err);
    }); */
    this.predict(this.picArr[this.picNum]);
  }

  startPictures(){

    setTimeout(() => this.takePicture() , 1000);
    setTimeout(() => this.takePicture() , 2000);
    setTimeout(() => this.takePicture() , 3000);
    setTimeout(() => this.takePicture() , 4000);
    setTimeout(() => this.takePicture() , 5000);
    setTimeout(() => this.takePicture() , 6000);
    setTimeout(() => this.takePicture() , 7000);
    setTimeout(() => this.takePicture() , 8000);
    setTimeout(() => this.takePicture() , 9000);
    setTimeout(() => this.takePicture() , 10000);
  }

}

/*   async openModal(){
    let modal = this.modalCtrl.create(PicModalPage, { base64Image: this.picture });
    modal.present();
  }
  
  async refresh(){
    window['location'].reload();
  }
   */