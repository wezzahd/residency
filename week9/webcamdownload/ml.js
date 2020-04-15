let faceapi;
let detections;

// by default all options are set to true
const detection_options = {
    withLandmarks: true,
    withDescriptors: false,
}


function mlsetup() {
    faceapi = ml5.faceApi(detection_options, modelReady)
}

function modelReady() {
    console.log('ready!')
    console.log(faceapi)
    faceapi.detectSingle(images, gotResults)

}

function gotResults(err, result) {
    if (err) {
        console.log(err)
        return
    }
    // console.log(result)
    detections = result;

    // background(220);
  //  background(255);
  //  image(img, 0,0, width, height)
    if (detections) {
        // console.log(detections)
  //      drawBox(detections)
     drawLandmarks(detections)
    }
}

function drawBox(detections){
    const alignedRect = detections.alignedRect;
    const {_x, _y, _width, _height} = alignedRect._box;

    var faceimg = images.get(_x, _y, _width, _height);
    facearray.push(faceimg);
    console.log(faceimg);
    // noFill();
    // stroke(161, 95, 251);
    // strokeWeight(2)
    // rect(_x, _y, _width, _height)
}

function drawLandmarks(detections){
    noFill();
    stroke(161, 95, 251);
    strokeWeight(2)

    // push()
    // // mouth
    // beginShape();
    // detections.parts.mouth.forEach(item => {
    //     vertex(item._x, item._y)
    // })
    // endShape(CLOSE);
    //
    // // nose
    // beginShape();
    // detections.parts.nose.forEach(item => {
    //     vertex(item._x, item._y)
    // })
    // endShape(CLOSE);

    // left eye
  //  beginShape();
    detections.parts.leftEye.forEach(item => {
      var faceimg = images.get(item.x, item.y, 200, 50);
      facearray.push(faceimg);
      console.log(faceimg);
    })
  //  endShape(CLOSE);

    // right eye
    // beginShape();
    // detections.parts.rightEye.forEach(item => {
    //     vertex(item._x, item._y)
    // })
    // endShape(CLOSE);
    //
    // // right eyebrow
    // beginShape();
    // detections.parts.rightEyeBrow.forEach(item => {
    //     vertex(item._x, item._y)
    // })
    // endShape();
    //
    // // left eye
    // beginShape();
    // detections.parts.leftEyeBrow.forEach(item => {
    //     vertex(item._x, item._y)
    // })
    // endShape();

    pop();

}
