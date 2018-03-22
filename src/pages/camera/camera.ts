import { Component } from '@angular/core';
import { NavController, ModalController, Platform } from 'ionic-angular';
import { CameraPreviewPictureOptions, CameraPreview } from '@ionic-native/camera-preview';
// import { PicModalPage } from '../pic-modal/pic-modal';
import { ClarifaiService } from '../../services/clarifai.service';

import * as Clarifai from 'clarifai';

@Component({
  selector: 'page-camera',
  templateUrl: 'camera.html',
})
export class CameraPage {
  app = new Clarifai.App({
    apiKey: 'f23cf468e2534c13958642c7612ae166'
  });
  


  //picture options
  pictureOpts: CameraPreviewPictureOptions = {
    width: 1280,
    height: 1280,
    quality: 85
  }
  picArr = [
    //me
    'https://i.imgur.com/PXe8Sny.jpg',
    //thank you
    'https://i.imgur.com/ldre2vF.jpg',
    //sad
    'https://i.imgur.com/kSX3ugH.jpg',
    //where
    'https://i.imgur.com/OWHA7n5.jpg',
    //tired
    'https://i.imgur.com/glqpBXr.jpg',
    'https://i.imgur.com/C3lTlqU.jpg',
    'https://i.imgur.com/C3lTlqU.jpg',
    'https://i.imgur.com/C3lTlqU.jpg',
    'https://i.imgur.com/C3lTlqU.jpg',
    'https://i.imgur.com/C3lTlqU.jpg'
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
  results = []

  constructor(public navCtrl: NavController,
              private cameraPreview: CameraPreview,
              private modalCtrl: ModalController,
              private clarifaiService: ClarifaiService,
              private platform: Platform) {
      this.platform.ready().then(()=> {
        let options = {
          x: 0,
          y: 0,
          width: window.screen.width,
          height: window.screen.height,
          camera: 'rear',
          tapPhoto: true,
          previewDrag: true,
          toBack: true,
        }
        this.cameraPreview.startCamera(options).then(
          (res)=> {
            console.log(res)
          },
          (err) => {
            console.log(err)
          });
      })
    }
  

  //setup code
  async allTogetherNow(){
    this.clarifaiService.setupInputs();
    this.clarifaiService.trainMachine();
  }

  switchCamera(){
    this.cameraPreview.switchCamera();
  }


  //clarifai predict function
  predict = (base64: string) => {
      //let imageData = base64.replace(/^data:image\/(.*);base64,/, '');
      let imageData = base64;
      this.app.models.predict("sign", [imageData]).then(
  
          (response) => {
                  console.log('predit');
                  console.log(response.outputs[0].data);
                  if(response.outputs[0].data.concepts[0].value > .3){
                    this.results.push(response.outputs[0].data.concepts[0].name)
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
       await this.cameraPreview.takePicture(this.pictureOpts).then((imageData) => {
      this.picArr[this.picNum] = ('data:image/jpeg;base64,' + imageData);
    }, (err) => {
      console.log(err);
    });
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