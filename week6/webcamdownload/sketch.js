let img;
let images;
var raw;
let size = 150;
let x = 0;
let y = 0;

var imagearray = [];
let facearray = [];

var i = 0;


function firebasesetup(){
	var firebaseConfig = {
		apiKey: "AIzaSyAbb8-7skMg99nzAlvUaqR6vfQvD7q_7Vs",
		authDomain: "test-a201f.firebaseapp.com",
		databaseURL: "https://test-a201f.firebaseio.com",
		projectId: "test-a201f",
		storageBucket: "test-a201f.appspot.com",
		messagingSenderId: "120555329679",
		appId: "1:120555329679:web:a8734f69a5da95480df8fa",
		measurementId: "G-QLSEEEE02P"
	};
	// Initialize Firebase
	firebase.initializeApp(firebaseConfig);
	firebase.analytics();

	database = firebase.database();

	var ref = database.ref('test');
	ref.on('child_added', gotData, errData);

}


function setup() {
  createCanvas(640, 480);
	firebasesetup();

}

function gotData(data) {
	//console.log(data.val());
  var test = data.val();
  // // Grab the keys to iterate over the object
// var keys = Object.keys(test);
// console.log(keys);
//
// for (var i = 0; i < keys.length; i++) {
//    var key = keys[i];
//   //   // Look at each test object!
 imageData = test[0].imageData; //retreive img data from object
// 	 //console.log(imageData);
imagearray.push(imageData); // push into local array
console.log(imagearray.length);

// }
}

function errData(err) {
	console.log('Error!');
  	console.log(err);
}


function retrieveRawImage(f) {

raw = new Image();
raw.src	=	f; // base64 data here
raw.onload = function() {
  img = createImage(raw.width, raw.height);
  img.drawingContext.drawImage(raw, 0, 0,width,height);

	if(img.width > 0 && img.height > 0){
	//image(img, 0,0);
	images = img;
	// draw the image, etc here
}
}
}


function mousePressed() {
	var rand  = int(random(0,imagearray.length));
retrieveRawImage(imagearray[rand]);
mlsetup();
	//drawImage();

}
//}
function draw() {

	if (facearray.length > 0){
		for (var i = 0; i < facearray.length; i++){
//for (var y = 0; y < height; y++){
	//		for (var x = 0; x < width; x++){

if (i >= 0 && i <= 5){
	 x = (i % 5) * size;
	 y= 0;
	 image(facearray[i], x, y, size, size);
 }

if (i >= 6 && i <= 10){
		 x = (i % 5) * size;
   y =  size;
	 image(facearray[i], x, y, size, size);
 }

 if (i >= 11 && i <= 15){
 		 x = (i % 5) * size;
    y =  size * 2;
 	 image(facearray[i], x, y, size, size);
  }

	if (i >= 16 && i <= 20){
			x = (i % 5) * size;
		 y =  size * 3;
		image(facearray[i], x, y, size, size);
	 }



console.log(i % 5);

}

	}

}
