import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { CameraPreviewPictureOptions, CameraPreview } from '@ionic-native/camera-preview';

import * as Clarifai from 'clarifai';

@Component({
  selector: 'page-camera',
  templateUrl: 'camera.html',
})
export class CameraPage {
  app = new Clarifai.App({
    apiKey: 'da60c697e9b7404f9192684ffca0c146'
  });
  
  base64Image: string;
  base64Image2: string;

  //picture options
  pictureOpts: CameraPreviewPictureOptions = {
    width: 1280,
    height: 1280,
    quality: 85
  }

  word = ["k","i","t","e"];
  picArr = ['','','','','','','','','',''];
  picArrNum = 0;
  results: string = '';
  hit = 0;
  difficulty = 1;

  stats = false;
  bool = false;

  constructor(public navCtrl: NavController,
              private cameraPreview: CameraPreview,
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

  statsSwitch(){
    this.stats = !this.stats;
    if(this.bool == false){
      this.bool = true;
    }
  }


  //cameraPreview capture picture function
  async takePicture(){
    // take a picture
    await this.cameraPreview.takePicture(this.pictureOpts).then((imageData) => {
      this.picArr[this.picArrNum] = ('data:image/jpeg;base64,' + imageData);
    }, (err) => {
      console.log(err);
    });
  }

   //clarifai predict function
  predict = (picArr) => {
      let imageData = picArr.map((base64) => base64.replace(/^data:image\/(.*);base64,/, ''));
      this.app.models.predict("reddy", imageData ).then(
  
          (response) => {
                  console.log('predit');
                  for(let i = 0; i< 4; i++){
                    if(response.outputs[i].data.concepts[0].name == this.word[i]){
                      this.results = this.results + response.outputs[i].data.concepts[0].name;
                      console.log(response.outputs[i].data.concepts[0].name)
                      console.log(this.results);
                    }
                  }
                  this.hit = this.hit + 1;

          }, 
          (err) => {
                  console.log(err);

          }
      )
    }

    startPictures(){
      let testArr = ['https://i.imgur.com/zkYJgbU.jpg', 'https://i.imgur.com/JxHBIJn.jpg','https://i.imgur.com/xocAXh0.jpg','https://i.imgur.com/Po7idoZ.jpg'];    

      setTimeout(() => this.takePicture() , 1000);
      setTimeout(() => this.takePicture() , 2000);
      setTimeout(() => this.takePicture() , 3000);
      setTimeout(() => this.takePicture() , 4000);
      setTimeout(() => this.predict(this.picArr), 5000);
 /*      setTimeout(() => this.takePicture() , 5000);
      setTimeout(() => this.takePicture() , 6000);
      setTimeout(() => this.takePicture() , 7000);
      setTimeout(() => this.takePicture() , 8000);
      setTimeout(() => this.takePicture() , 9000);
      setTimeout(() => this.takePicture() , 10000); */
/*       setTimeout(() => this.predict(testArr) , 11000);
 */    }
} 
/*   
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