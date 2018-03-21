import * as Clarifai from 'clarifai'
export class ClarifaiService {
    res;
    err;
    app = new Clarifai.App({
        apiKey: 'd1f89510500542898b0f12b699852ba1'
    });

      ////////////////////////
  ///////* Clarifai */////
  ////////////////////////

  setupInputs(){
    this.app.inputs.create([{
      "url": "https://i.imgur.com/DyBOEZt.jpg",
      "concepts": [
        { "id": "again", "value": true }
      ]
    }, {
    "url": "https://i.imgur.com/hiADHhc.jpg",
    "concepts": [
        { "id": "again", "value": true }
      ]
    }, {
        "url": "https://i.imgur.com/QeXgwXG.jpg",
        "concepts": [
        { "id": "again", "value": true }
      ]
        }
    ]);
  }

  createMachine(){
    this.app.models.create(
      "test",
      [
        { "id": "again" }
      ]
    ).then(
      function(response) {
        console.log(response);
      },
      function(err) {
        console.log(err);
      }
    );
  }

  trainMachine(){
    this.app.models.train("test").then(
      function(response) {
        console.log(response);
      },
      function(err) {
        console.log(err);
      }
    );
  }
}
/* 
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
  } */