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
    apiKey: 'd9cc99d9decb4b8ab1d5ccbe657a0b98'
  });
  
  base64Image: string;

  //picture options
  pictureOpts: CameraPreviewPictureOptions = {
    width: 1280,
    height: 1280,
    quality: 85
  }

  results: string;
  resultsVal: any;
  hit: string = "";
  difficulty = 1;

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

  switchCamera(){
    this.cameraPreview.switchCamera();
  }


  //cameraPreview capture picture function
  async takePicture(){
    // take a picture
      await this.cameraPreview.takePicture(this.pictureOpts).then((imageData) => {
      this.base64Image = ('data:image/jpeg;base64,' + imageData);
    }, (err) => {
      console.log(err);
    });
    this.predict(this.base64Image)

  }

   //clarifai predict function
  predict = (base64: string) => {
      let imageData = base64.replace(/^data:image\/(.*);base64,/, '');
      this.app.models.predict("read-pls", [imageData]).then(
  
          (response) => {
                  console.log('predit');
                  console.log(response.outputs[0].data.concepts);
                  console.log(response.outputs[0].input.data);
                  this.results = response.outputs[0].data.concepts[0].name;
                  this.resultsVal = response.outputs[0].data.concepts[0].value;
                  this.hit = "hit";

          }, 
          (err) => {
                  console.log(err);

          }
      )
    }
} 


/*   startPictures(){

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
  
      if(this.difficulty == 1){
    console.log('matty cox');
    }
    else if(this.difficulty == 2){
      console.log('betalpha male');
    }
    else{
      console.log('big man')
    }

  */