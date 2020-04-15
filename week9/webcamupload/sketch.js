var img;
var drawpg;
var colour;



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

	drawpg = createGraphics(width,height);

}

function drawellipse(){
	noStroke();
colour = img.get(mouseX,mouseY);

		fill(255,127);
		ellipse(mouseX,mouseY,120,120);
		fill(colour);
		ellipse(mouseX,mouseY,100,100);
  // p.blendMode(ADD);
	// p.image(img,0,0);



}


function setup() {
  createCanvas(640, 480);
  img = createCapture(VIDEO);
  img.size(width,height);
  img.hide();
	firebasesetup();

}

function draw() {


image(img,0,0);//background
drawellipse();

//blendMode(REPLACE);
//image(drawpg,0,0); // foreground

 }

 function mousePressed() {

	 var data = {
	   mouseX_loc: mouseX,
	   mouseY_loc: mouseY,
		 colour_loc: colour
	 }

 //saveFrames('out', 'png', 1, 1, data => {
	 var test = database.ref('test');

	 test.push(data);
	 console.log(data);
// });
 }
