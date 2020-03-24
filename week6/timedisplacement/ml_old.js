let bodypix;
let segmentation;
let img;

const options = {
    "outputStride": 16, // 8, 16, or 32, default is 16
    "segmentationThreshold": 0.5 // 0 - 1, defaults to 0.5
}

// function setup() {
//     createCanvas(640, 480);
//
//     // load up your video
//     video = createCapture(VIDEO);
//     video.size(320, 240);
//     video.hide();
//     bodypix = ml5.bodyPix(video, modelReady);
// }

function modelReady() {
    console.log('ready!')
    bodypix.segment(gotResults, options)
}

function gotResults(err, result) {
    if (err) {
        console.log(err)
        return
    }
    // console.log(result);
    segmentation = result;

 background(255);

    //image(video, 0, 0, width, height)
  //  image(segmentation.backgroundMask, 0, 0, width, height)
        //video.mask(segmentation.backgroundMask);
  //image(video, 0, 0, width, height)

    bodypix.segment(gotResults, options)

}
