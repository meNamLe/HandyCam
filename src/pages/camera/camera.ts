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
    apiKey: 'a1086fa6198d49d98d989069d3cc724d'
  });
  
  base64Image: string;
  base64Image2: string;

  //picture options
  pictureOpts: CameraPreviewPictureOptions = {
    width: 1280,
    height: 1280,
    quality: 85
  }

  word = ["c","a","b","b","a","g","e"];
  picArr = ['','','','','','',''];
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
    /* await this.cameraPreview.takePicture(this.pictureOpts).then((imageData) => {
      this.picArr[this.picArrNum] = ('data:image/jpeg;base64,' + imageData);
      this.picArrNum++;
    }, (err) => {
      console.log(err);
    }); */
    console.log('picture captured');
  }

   //clarifai predict function
  predict = async () => {
      let imageData = this.picArr.map((base64) => {return base64.replace(/^data:image\/(.*);base64,/, '')});
      //let imageData = picArr;
      await this.app.models.predict("read-my-hands", imageData ).then(
  
          (response) => {
                  console.log('predit');
                  console.log(response);
                  for(let i = 0; i< 7; i++){
                    if(response.outputs[i].data.concepts[0].name == this.word[i]){
                      this.results = this.results + response.outputs[i].data.concepts[0].name;
                      console.log(response.outputs[i].data.concepts[0].name)
                      console.log(this.results);
                    }
                  }
          }, 
          (err) => {
                  console.log(err);

          }
      )
      this.hit = this.hit + 1;
      this.statsSwitch();
    }

/*     startPictures(){
      let testArr = ['https://i.imgur.com/FdheT2t.jpg', 'https://i.imgur.com/vKCXfnN.jpg','https://i.imgur.com/Yy7oysN.jpg','https://i.imgur.com/Yy7oysN.jpg','https://i.imgur.com/vKCXfnN.jpg','https://i.imgur.com/ufdOLSQ.jpg','https://i.imgur.com/OASiZwH.jpg'];    


      setTimeout(() => this.takePicture() , 1000);
      setTimeout(() => this.takePicture() , 2000);
      setTimeout(() => this.predict(testArr), 3000);
      setTimeout(() => this.takePicture() , 5000);
      setTimeout(() => this.takePicture() , 6000);
      setTimeout(() => this.takePicture() , 7000);
      setTimeout(() => this.takePicture() , 8000);
      setTimeout(() => this.takePicture() , 9000);
      setTimeout(() => this.takePicture() , 10000);
     } */
     startPictures(){
      setTimeout(() => this.takePicture() , 1000);
      setTimeout(() => this.takePicture() , 2000);
      setTimeout(() => this.takePicture() , 3000);
      setTimeout(() => this.takePicture() , 4000);
      setTimeout(() => this.takePicture() , 5000);
      setTimeout(() => this.takePicture() , 6000);
      setTimeout(() => this.takePicture() , 7000);
      setTimeout(() => this.predict() , 8000);
    }
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