var img;
var colour;
var text;


function firebasesetup() {
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

}

function drawellipse() {
  noStroke();
  colour = img.get(width - mouseX, mouseY); //flip for cam

  fill(255, 127);
  ellipse(mouseX, mouseY, 120, 120);
  fill(colour);
  ellipse(mouseX, mouseY, 100, 100);
}


function setup() {
  createCanvas(640, 480);
  img = createCapture(VIDEO);
  img.size(width, height);
  img.hide();
  firebasesetup();
  didactic();
}

function didactic() {
  text = createDiv('Use mouse over image to select pixel.  Mouse click to send pixel info.')
  text.class("didactic");
  text.position(0, 0);
}

function draw() {

  push();
  translate(width, 0);
  scale(-1, 1);
  image(img, 0, 0); //background
  pop();

  drawellipse();


}

function mousePressed() {

  var data = {
    mouseX_loc: mouseX,
    mouseY_loc: mouseY,
    colour_loc: colour
  }

  var test = database.ref('test');

  test.push(data);
  console.log(data);
}
