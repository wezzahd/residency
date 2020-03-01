// in this sketch we're going to turn the camera image into a pixellated mosaic

// the shader variable
let camShader;

// the camera variable
let cam;

function preload(){
  // load the shader
  camShader = loadShader('effect.vert', 'effect.frag');
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

}

function draw() {
  // shader() sets the active shader with our shader
  shader(camShader);

  let mx = map(mouseX, 0, width, 20, 100);
  let my = map(mouseY, 0, height, 0, 1);

  // lets just send the cam to our shader as a uniform
  camShader.setUniform('tex0', cam);
  camShader.setUniform('resolution', [width, height]);
  camShader.setUniform('mouse', [mx, my]);

  // rect gives us some geometry on the screen
  rect(0,0,width, height);
}

function windowResized(){
  resizeCanvas(windowWidth, windowHeight);
}
