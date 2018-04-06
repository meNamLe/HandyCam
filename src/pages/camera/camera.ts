import { Component, ViewChild } from '@angular/core';
import { NavController, Platform, Slides, ModalController } from 'ionic-angular';
import { CameraPreviewPictureOptions, CameraPreview } from '@ionic-native/camera-preview';
import { HomePage } from '../home/home';


import * as Clarifai from 'clarifai';

@Component({
  selector: 'page-camera',
  templateUrl: 'camera.html',
})
export class CameraPage {
  @ViewChild(Slides) slides: Slides;
  app = new Clarifai.App({
    apiKey: 'b214647a8e754c4c8b2b38ca25930485'
  });

  base64Image: string;
  base64Image2: string;

  //picture options
  pictureOpts: CameraPreviewPictureOptions = {
    width: 1440,
    height: 1920,
    quality: 72
  }

  word = ["c","a","b","b","a","g","e"];
  picArr = ['','','','','','',''];
  picArrNum = 0;
  results: string = '';
  hit = "c";
  difficulty = 1;
  bounceIn: boolean;

  stats = false;
  anim = true;
  bool = false;

  constructor(public navCtrl: NavController,
              private cameraPreview: CameraPreview,
              private platform: Platform,
              private modalCtrl: ModalController) {
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

        let modal = modalCtrl.create(HomePage ,{callback: this.myCallbackFunction});
        modal.present();
    })
  }

  // callback...
  myCallbackFunction = (_params) => {
    return new Promise((resolve, reject) => {
            console.log(_params);
            this.bounceIn = _params;
            resolve();
          });
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

  ionViewDidEnter(){
    console.log('view did load');
    this.anim = !this.anim;
  }


  //cameraPreview capture picture function
  async takePicture(){
    // take a picture
    await this.cameraPreview.takePicture(this.pictureOpts).then((imageData) => {
      this.picArr[this.picArrNum] = ('data:image/jpeg;base64,' + imageData);
      this.picArrNum++;
    }, (err) => {
      console.log(err);
    });
    this.hit = this.picArr[this.picArrNum];
    console.log('picture captured');
  }

   //clarifai predict function
  predict = async () => {
      let imageData = this.picArr.map((base64) => {return base64.replace(/^data:image\/(.*);base64,/, '')});
      await this.app.models.predict("read", imageData ).then(
  
          (response) => {
                  console.log('predit');
                  console.log(response);
                  for(let i = 0; i< 7; i++){
                      //if(response.outputs[i].data.concepts[0].name == this.word[i]){
                      //this.results = this.results + response.outputs[i].data.concepts[0].name;
                      this.results = this.results.concat(response.outputs[i].data.concepts[0].name);
                      console.log(response.outputs[i].data.concepts[0].name)
                      console.log(response.outputs[i].input.data.image.url);
                      console.log(this.results);
                    //}
                  }
          }, 
          (err) => {
                  console.log(err);

          }
      )
      this.statsSwitch();
      this.picArr = ['','','','','','',''];
      console.log('----------------------------------------------------------------------');
    }
  /*     startPictures(){
        //let testArr = ['https://i.imgur.com/FdheT2t.jpg', 'https://i.imgur.com/vKCXfnN.jpg','https://i.imgur.com/Yy7oysN.jpg','https://i.imgur.com/Yy7oysN.jpg','https://i.imgur.com/vKCXfnN.jpg','https://i.imgur.com/ufdOLSQ.jpg','https://i.imgur.com/OASiZwH.jpg'];    
        let testArr = ['https://i.imgur.com/28x1RaU.jpg','https://i.imgur.com/fcoXdA3.jpg','https://i.imgur.com/vfQGN8Z.jpg','https://i.imgur.com/7jpKVxc.jpg','https://i.imgur.com/KOYRX5l.jpg'];
  
        setTimeout(() => this.takePicture() , 1000);
        setTimeout(() => this.takePicture() , 2000);
        setTimeout(() => this.predict(testArr), 3000);
       }  */
      startEasy(){
        setTimeout(() => this.takePicture() , 1000);
        setTimeout(() => this.takePicture() , 3500);
        setTimeout(() => this.takePicture() , 6000);
        setTimeout(() => this.takePicture() , 8500);
        setTimeout(() => this.takePicture() , 11000);
        setTimeout(() => this.takePicture() , 13500);
        setTimeout(() => this.takePicture() , 16000);

        setTimeout(() => this.predict() , 21000);
      } 

      startMedium(){
        this.slides.lockSwipes(true);
        setTimeout(() => this.takePicture() , 1000);
        setTimeout(() => this.takePicture() , 3000);
        setTimeout(() => this.takePicture() , 5000);
        setTimeout(() => this.takePicture() , 7000);
        setTimeout(() => this.takePicture() , 9000);
        setTimeout(() => this.takePicture() , 11000);
        setTimeout(() => this.takePicture() , 13000);

        setTimeout(() => this.predict() , 21000);
      } 

      startHell(){
        setTimeout(() => this.takePicture() , 1000);
        setTimeout(() => this.takePicture() , 2000);
        setTimeout(() => this.takePicture() , 3000);
        setTimeout(() => this.takePicture() , 4000);
        setTimeout(() => this.takePicture() , 5000);
        setTimeout(() => this.takePicture() , 6000);
        setTimeout(() => this.takePicture() , 7000);

        setTimeout(() => this.predict() , 9000);
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