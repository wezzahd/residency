var images = [];
var result;
var pg,genpg;
var j;
let kineShader;
let counter = 6;

let snaps = false;



function preload() {

kineShader = loadShader('effect.vert', 'genmoire.frag');
uNet = ml5.uNet('face');

for (var i = 0; i < 6; i++) {
images[i] = loadImage("images/"+i+".png");
}
}

function setup() {
  createCanvas(640,480,WEBGL);
  pixelDensity(1.0);
  video = createCapture(VIDEO);

  video.size(320,240);
  video.hide();

  mlsetup();

  //noStroke();
  //noFill();
  pg = createGraphics(width,height);
  genpg = createGraphics(width,height,WEBGL);

  loading = createDiv('Lenticular.  Press mouse button to capture webcam frames (one per second). Drag curtain to reveal images.');
  loading.class("didactic");
  loading.position(0,0);



  //genmoire(genpg);
  bars(pg);
  j = width;

}


function draw() {
 background(255);

if (snaps == true){
snapper();
}

if (images.length == counter){

genpg.shader(kineShader);


// send the camera and the resolution to the shader
//for (var i = 0; i < 6; i++) {
//kineShader.setUniform('tex[i]', images[i]);
//}
kineShader.setUniform('tex0', images[0]);
kineShader.setUniform('tex1', images[1]);
kineShader.setUniform('tex2', images[2]);
kineShader.setUniform('tex3', images[3]);
kineShader.setUniform('tex4', images[4]);
kineShader.setUniform('tex5', images[5]);

kineShader.setUniform('resolution', [width, height]);
kineShader.setUniform('u_time', frameCount * 0.05);

// rect gives us some geometry on the screen
//rectMode(CENTER);
genpg.rect(0,0,width, height);

imageMode(CENTER);

image(genpg,0,0);
var move = int(map(mouseX,0,displayWidth,0,windowWidth));
//console.log(move);
image(pg,move,0);


// j= j-1.0;
// //
// if (j < 0){
// j = width;
//  }
}
}

function bars(p){

for (var x = 0; x < width; x+=6) {
p.noStroke();
p.fill(0);
p.rect(x,0,5,height);
}
}


function mousePressed() {

  if (mouseX > width/3 && mouseX < width -(width/3) && mouseY > 0 && mouseY < 70 && isMobile == false) {
  let fs = fullscreen();
  fullscreen(!fs);
  //Remove vert scroll bar in fullScreen
   document.body.scrollTop = 0; // <-- pull the page back up to the top
  document.body.style.overflow = 'hidden';
}

if (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < 70 && isAndroid == true ) {
  let fs = fullscreen();
  fullscreen(!fs);
}

 if (images.length > 0){
  images.length = 0;
  }
snaps = true;
didactic();
}


function didactic() {
  loading = createDiv('loading...')
  loading.class("didactic");
  loading.position(width/2,height/2);
}


function snapper() {

if (frameCount % 60 == 0 && images.length <= counter) {
    images.push(segmentationImage.get());
}



if (images.length == counter){
snaps = false;
loading.remove();
  }
}