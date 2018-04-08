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

  // possible letter combinations
  possible = ['A','B','C','D','E','G','O','Y'];
  // array of pictures to be sent to clarifai for prediction
  picArr = ['','','','','','',''];
  // index while taking pictures
  picArrNum = 0;
  // The predicted result of your signs
  results: string = '';
  // wrong prediction indexes in an array;
   wrongIndex: Array<number> = [];
  // difficulty passed from home page
  difficulty: number;
  // the letter needed to be signed
  hit: string;
  // The array of generated letters that will be signed
  targets: Array<string> = []
  targetStr: string = ''

  // Start game countdown
  startCount = false;

  disable = true;

  willLoad: boolean = false;

  // 
  anim = true;
  didPop: boolean = false;
  hitbox = false;

  clipboardStart: boolean = false

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
  myCallbackFunction = (_params, bool) => {
    return new Promise((resolve, reject) => {
            console.log(_params);
            console.log(bool);
            this.didPop = bool;
            this.difficulty = _params;
            resolve();
          });
  }


  challengeBox(){
    if(this.hitbox == false){
      this.hitbox = true;
    }
  }



  //cameraPreview capture picture function
  async takePicture(i, picsTaken){
    // take a picture
    await this.cameraPreview.takePicture(this.pictureOpts).then((imageData) => {
      this.picArr[this.picArrNum] = ('data:image/jpeg;base64,' + imageData);
      this.picArrNum++;
    }, (err) => {
      console.log(err);
    });
    if(i !== picsTaken - 1){
      console.log('hi');
      console.log(this.targets[i+1]);
      this.hit = this.targets[i + 1];
      console.log(this.hit);
    }

    console.log('picture captured');
  }

   //clarifai predict function
  predict = async (picsTaken) => {
      let imageData = this.picArr.map((base64) => {return base64.replace(/^data:image\/(.*);base64,/, '')});
      await this.app.models.predict("read", imageData ).then(
  
          (response) => {
                  console.log('predit');
                  console.log(response);
                  for(let i = 0; i < picsTaken; i++) {
                      //if(response.outputs[i].data.concepts[0].name == this.word[i]){
                      //this.results = this.results + response.outputs[i].data.concepts[0].name;
                      this.results = this.results.concat(response.outputs[i].data.concepts[0].name);
                    //}
                  }
          }, 
          (err) => {
                  console.log(err);

          }
      )
      for(let i = 0; i < picsTaken; i++){
        if(this.results[i].toUpperCase() !== this.targets[i]){
          this.wrongIndex.push(i);
          console.log(i);
        }
      }
      this.targetStr = this.targets.toString();
      console.log(this.wrongIndex);
      console.log(this.results);
      this.picArr = ['','','','','','',''];
      this.picArrNum = 0;
      console.log('----------------------------------------------------------------------');
      this.clipboardStart = true;
      return;
    }


  generateRandom(picsTaken){
    for(let i = 0; i < picsTaken; i++){
      this.targets = this.targets.concat(this.possible[(Math.floor((Math.random() * 8) + 1)) -1]);
    }
  }

  startTakingPic = async (picsTaken, seconds) => {
    this.targets = [];
    this.results = "";
    await this.generateRandom(picsTaken);
    this.challengeBox();
    console.log(this.targets);
    this.hit = this.targets[0];
    this.startCount = true;
    setTimeout(() => { 
    for(let i = 0; i < picsTaken; i++) {
      setTimeout(() => this.takePicture(i, picsTaken) , i * seconds);

      // Loader
      if (i === picsTaken - 1) {

        this.hit = "";

        setTimeout(async () => {
          this.willLoad = true;
          await this.predict(picsTaken)
          this.willLoad = false;
          this.hitbox = false;
        } , (i * seconds) + 3000);
      }
    }
  }, 5000)
  }

  startGame() {
    console.log(this.difficulty);
    if(this.difficulty === 1) {
      this.startEasy();
    }else if (this.difficulty === 2) {
      this.startMedium();
    }else if(this.difficulty === 3) {
      this.startHell()
    }
  }

  startEasy() {
    const picsTaken = 3
    const seconds = 5000;
    this.startTakingPic(picsTaken, seconds)
  } 

  startMedium(){
    const picsTaken = 5
    const seconds = 3500;
    this.startTakingPic(picsTaken, seconds)
  } 

  startHell(){
    const picsTaken = 7
    const seconds = 2000;
    this.startTakingPic(picsTaken, seconds)
  }
  
  return(){
    // array of pictures to be sent to clarifai for prediction
    this.picArr = ['','','','','','',''];
    // index while taking pictures
    this.picArrNum = 0;
    // The predicted result of your signs
    this.results = '';
    // difficulty passed from home page
    this.difficulty = 1;
    // the letter needed to be signed
    this.hit = '';
    // The array of generated letters that will be signed
    this.targets = [];
    // Start game countdown
    this.startCount = false;

    // didPop
    this.didPop = false;
    this.hitbox = false;
    this.willLoad = false;

    this.clipboardStart = false;

    // wrong stuff
    this.wrongIndex = [];

    let modal = this.modalCtrl.create(HomePage ,{callback: this.myCallbackFunction});
    modal.present(); 
  }

} 