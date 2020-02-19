let capture
let ready = false;
let detecting = false;
let detections = [];
let cnv;
var varboxx, varboxy, boxwidth, boxheight;
var emotion;
var express, score, age, gender, genderprob
var blocks = [];

//loads models for face detection
async function pre() {
  console.log('loading models')
	await faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
  await faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
  await faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
  await faceapi.nets.faceExpressionNet.loadFromUri('/models'),
	await faceapi.nets.ageGenderNet.loadFromUri('/models')

//	await faceapi.loadSsdMobilenetv1Model(url)
  ready = true
  console.log(faceapi.nets)
  console.log('loaded models')
}

async function updateDetections() {
	//if(detecting) return;
  if(!ready) return;
   if(!capture.elt) return;
  capture.elt.removeAttribute('crossorigin')
  capture.elt.setAttribute('autoplay', '')
 //console.log('updating detections', detecting, ready, capture.elt)
 detecting = true;
const detections = await faceapi.detectAllFaces(capture.elt, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions().withAgeAndGender()

//console.log(detections);
const canvas = document.getElementById('mycanvas')  //id required for p5 canvas
const displaySize = { width: capture.width, height: capture.height }
//console.log(canvas)
faceapi.matchDimensions(mycanvas, displaySize)
const resizedDetections = faceapi.resizeResults(detections, displaySize);
console.log(resizedDetections);

//Face detection for rect

for (var i = 0; i < resizedDetections.length; i++) {

varboxx = resizedDetections[i].alignedRect.box.topLeft._x
varboxy = resizedDetections[i].alignedRect.box.topLeft._y

boxwidth = resizedDetections[i].alignedRect._box._width
boxheight = resizedDetections[i].alignedRect._box._height

//Get expressions and sort by prob score - highest first.

var expression = resizedDetections[i].expressions
//
keysSorted = Object.keys(expression).sort((a, b) => expression[b]-expression[a])
.reduce((obj, key) => ({
         ...obj,
         [key]: expression[key]
       }), {})
express = Object.keys(keysSorted)[0];
score = Object.values(keysSorted)[0];

age = resizedDetections[i].age
gender = resizedDetections[i].gender
genderprob = resizedDetections[i].genderProbability

if (resizedDetections.length> 0){
blocks[i] = new Block(varboxx,varboxy,boxwidth,boxheight, express, score,age, gender, genderprob);
}
 if (resizedDetections.length < blocks.length){
 	blocks.shift();
}

}
//console.log(blocks);

}





function setup() {
	pre();
  cnv = createCanvas(320, 240);
	cnv.id('mycanvas');
  capture = createCapture(VIDEO);
  capture.elt.setAttribute('playsinline', '');
  capture.size(width, height);
  capture.hide();
}

function draw() {
  background(220);
	if(!ready) text('loading model...', width/2, height/2)
 if(detecting) text('detecting...', width/2, height/2)
  image(capture,0,0, width,height);
	updateDetections();

	for (var i = 0; i < blocks.length; i++) {
		blocks[i].display();
	}

//	drawDetect();

}

function drawDetect() {
	noFill();
	stroke(255,0,0);
	noFill();
	rect(varboxx,varboxy,boxwidth,boxheight);
	noStroke();
	fill(255,0,0);
	textSize(16);
	text(express, ((varboxx+boxwidth+ 10)- ((varboxx+boxwidth+ 10)/2)), (varboxy+boxheight +10));
	text(int(score*100)+"% confidence", ((varboxx+boxwidth+ 10)- ((varboxx+boxwidth+ 10)/2)), (varboxy+boxheight +30));
	text("age:"+ int(age), ((varboxx+boxwidth+ 10)- ((varboxx+boxwidth+ 10)/2)), (varboxy+boxheight +50));
	text(gender, ((varboxx+boxwidth+ 10)- ((varboxx+boxwidth+ 10)/2)), (varboxy+boxheight +70));

}
