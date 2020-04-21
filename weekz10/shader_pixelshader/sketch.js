// in this sketch we're going to turn the camera image into a pixellated mosaic

// the shader variable
let pixelShader;

// the camera variable
let cam;

let pixelpg;

let radius, colour;

function preload() {
  // load the shader
  pixelShader = loadShader('effect.vert', 'pixelfrag.frag');
}

function firebaseSetup() {
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

function setup() {
  // shaders require WEBGL mode to work
  createCanvas(windowWidth, windowHeight, WEBGL);
  noStroke();

  // initialize the webcam at the window size
  cam = createCapture(VIDEO);
  cam.size(windowWidth, windowHeight);

  // hide the html element that createCapture adds to the screen
  cam.hide();
  firebaseSetup();
  pixelpg = createGraphics(width, height, WEBGL);
  ellipsepg = createGraphics(width, height);

}

function draw() {
  background(0);
  smooth();
  blendMode(SCREEN);
  radius = 50;


  let mx = map(mouseX, 0, width, 0, 1);
  let my = map(mouseY, 0, height, 0, 1);

  // shader() sets the active shader with our shader
  pixelpg.shader(pixelShader);


  // lets just send the cam to our shader as a uniform
  pixelShader.setUniform('tex0', cam);
  pixelShader.setUniform('resolution', [width, height]);
  pixelShader.setUniform('radius', radius);
  pixelShader.setUniform('u_time', frameCount * 0.05);
  pixelShader.setUniform('u_mouse', [mx, my]);


  // rect gives us some geometry on the screen
  pixelpg.rect(0, 0, width, height);


  imageMode(CENTER);
  image(pixelpg, 0, 0);



}

function mousePressed() {


  colour = cam.get(width - mouseX, mouseY);
  var data = {
    mouseX_loc: mouseX,
    mouseY_loc: mouseY,
    colour_loc: colour
  }

  var test = database.ref('test');

  test.push(data);
  console.log(data);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  pixelpg.resizeCanvas(windowWidth, windowHeight);
}
