// in this sketch we're going to turn the camera image into a pixellated mosaic

// the shader variable
let redShader,greenShader,blueShader;

// the camera variable
let cam;

let redpg, greenpg, bluepg;

var tileno = 10.;

var radius = 150.;

function preload(){
  // load the shader
  redShader = loadShader('effect.vert', 'red.frag');
  greenShader = loadShader('effect.vert', 'green.frag');
  blueShader = loadShader('effect.vert', 'blue.frag');
}

function setup() {
  // shaders require WEBGL mode to work
  createCanvas(windowWidth, windowHeight, WEBGL);
  noStroke();
  pixelDensity(1.0);


  // initialize the webcam at the window size
  cam = createCapture(VIDEO);
  cam.elt.setAttribute('playsinline', '');
  cam.size(windowWidth, windowHeight);

  // hide the html element that createCapture adds to the screen
  cam.hide();

  redpg = createGraphics(width, height, WEBGL);
  greenpg = createGraphics(width, height, WEBGL);
  bluepg = createGraphics(width, height, WEBGL);

}

function draw() {
  background(0);
  smooth();
  blendMode(SCREEN);

  radius = (map(mouseX,0,width,width,2));
  //translate(-width/2,-height/2);
  // shader() sets the active shader with our shader
  redpg.shader(redShader);
  greenpg.shader(greenShader);
  bluepg.shader(blueShader);


  // lets just send the cam to our shader as a uniform
  redShader.setUniform('tex0', cam);
  redShader.setUniform('resolution', [width, height]);
  redShader.setUniform('tileno', tileno);
  redShader.setUniform('radius', radius);
  redShader.setUniform('u_time', frameCount * 0.05);



  greenShader.setUniform('tex0', cam);
  greenShader.setUniform('resolution', [width, height]);
  greenShader.setUniform('tileno', tileno);
  greenShader.setUniform('radius', radius);

  blueShader.setUniform('tex0', cam);
  blueShader.setUniform('resolution', [width, height]);
  blueShader.setUniform('tileno', tileno);
  blueShader.setUniform('radius', radius);

  //camShader.setUniform('mouse', [mx, my]);

  // rect gives us some geometry on the screen
  redpg.rect(0,0,width, height);
  greenpg.rect(0,0,width, height);
  bluepg.rect(0,0,width, height);

  let angle = atan2(mouseY - height / 2, mouseX - width / 2);


imageMode(CENTER);

image(redpg,0,0);

push();
rotate(angle);
//image(greenpg,0,0);
pop();

push();
rotate(angle*2);
//image(bluepg,0,0);
pop();


}

function windowResized(){
  resizeCanvas(windowWidth, windowHeight);
}
