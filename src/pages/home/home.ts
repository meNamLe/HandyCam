import { Component, NgZone } from '@angular/core';
import { NavController } from 'ionic-angular';
import * as Clarifai from 'clarifai';
 
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  app = new Clarifai.App({
    apiKey: 'd1f89510500542898b0f12b699852ba1'
  });
  err: string = "buttface";
  success: number = 1738;

  constructor(public navCtrl: NavController, private zone: NgZone) {}

  start(){

  }
  
  refresh(){
    window['location'].reload();
  }


  ////////////////////////
  ///////* Clarifai */////
  ////////////////////////

  setupInputs(){
    this.app.inputs.create({
      url: "https://static.pexels.com/photos/59523/pexels-photo-59523.jpeg",
      concepts: [
        {
          id: "fiddo",
          value: true
        }
      ]
    });
  }

  createMachine(){
    this.app.models.create(
      "pets",
      [
        { "id": "fiddo" }
      ]
    ).then(
      function(response) {
        console.log('success')
        console.log(response);
      },
      function(err) {
        console.log(err);
      }
    );
  }

  trainMachine(){
    this.app.models.train("pets").then(
      function(response) {
        console.log(response);
      },
      function(err) {
        console.log(err);
      }
    );
  }

  machinePredict(){
    this.app.models.predict("pets", ["https://samples.clarifai.com/puppy.jpeg"]).then(
    function(response) {
      //outputs 0 data concepts 0 value
      console.log(response.outputs[0].data.concepts[0].value);
    },
    function(err) {
      console.log(err);
    }
  );
  }

  machinePredict2(){

    this.app.models.predict("pets", ["https://static.pexels.com/photos/59523/pexels-photo-59523.jpeg"]).then(

      (response) => {
        console.log(this.err);
        console.log(response.outputs[0].data.concepts[0].value);
        this.success = response.outputs[0].data.concepts[0].value;
      },
      (err) => {
        console.log(err.data.status.details);
        this.err = err.data.status.details;
      }
    )

  }
  
  reload(){
    console.log(this.success)
  }

}
