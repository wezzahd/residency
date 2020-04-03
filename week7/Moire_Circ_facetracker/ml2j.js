let faceapi;
let detections;

// by default all options are set to true
const detection_options = {
    withLandmarks: true,
    withDescriptors: false,
  MODEL_URLS: {
    tinyFaceDetectorModel: 'https://raw.githubusercontent.com/ml5js/ml5-data-and-models/face-api/models/faceapi/tiny_face_detector_model-weights_manifest.json',
    FaceLandmark68TinyNet: 'https://raw.githubusercontent.com/ml5js/ml5-data-and-models/face-api/models/faceapi/face_landmark_68_tiny_model-weights_manifest.json',
  },
}

let lastD = [];
let lastlefteyeX = [];
let lastlefteyeY = [];

let lefteyex, righteyex, lefteyey, righteyey;


function avg(t) {
  let sum = 0;
  for (let item of t) {
    sum += item;
  }
  return sum / t.length;
}


function mlsetup() {
    faceapi = ml5.faceApi(cam, detection_options, modelReady)
}

function modelReady() {
    console.log('ready!')
  //  console.log(faceapi)
    faceapi.detect(gotResults)

}

function gotResults(err, result) {
    if (err) {
        console.log(err)
        return
    }
    // console.log(result)
    detections = result;

    // background(220);
    //background(255);
    //image(video, 0,0, width, height)
    if (detections) {
        if (detections.length > 0) {
          //   console.log(detections)
           // drawBox(detections)
           drawLandmarks(detections)
        }

    }
    faceapi.detect(gotResults)
}

function drawBox(detections){
    for(let i = 0; i < detections.length; i++){
        const alignedRect = detections[i].alignedRect;
        const x = alignedRect._box._x
        const y = alignedRect._box._y
        const boxWidth = alignedRect._box._width
        const boxHeight  = alignedRect._box._height

        noFill();
        stroke(161, 95, 251);
        strokeWeight(2);
        rect(x, y, boxWidth, boxHeight);
    }

}

function drawLandmarks(detections){
    //noFill();
    //stroke(161, 95, 251)
    //strokeWeight(2)

    for(let i = 0; i < detections.length; i++){
      //  const mouth = detections[i].parts.mouth;
      //  const nose = detections[i].parts.nose;
        const leftEye = detections[i].parts.leftEye;
        const rightEye = detections[i].parts.rightEye;
      //  const rightEyeBrow = detections[i].parts.rightEyeBrow;
      //  const leftEyeBrow = detections[i].parts.leftEyeBrow;

      //  drawPart(mouth, true);
      //  drawPart(nose, false);
        drawleftPart(leftEye, true);
      //  drawPart(leftEyeBrow, false);
       drawrightPart(rightEye, true);
      //  drawPart(rightEyeBrow, false);

    }

}

function drawrightPart(feature, closed){

  //  beginShape();
    for(let i = 0; i < feature.length; i++){
        righteyex = feature[i]._x
        righteyey = feature[i]._y
        //vertex(x, y)
        let d = dist(lefteyex, lefteyey, righteyex, righteyey);
        //console.log(d);
        lastD.push(d);
        lastD = lastD.slice(lastD.length-300);

    }
  }



function drawleftPart(feature, closed){

  //  beginShape();
    for(let i = 0; i < feature.length; i++){
        lefteyex = feature[i]._x
        lefteyey = feature[i]._y
        //vertex(x, y)

        lastlefteyeX.push(lefteyex);
        lastlefteyeY.push(lefteyey);
        lastlefteyeX = lastlefteyeX.slice(lastlefteyeX.length-50);
        lastlefteyeY = lastlefteyeY.slice(lastlefteyeY.length-50);
    }


}
