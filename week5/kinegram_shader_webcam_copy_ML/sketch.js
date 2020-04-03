var images = [];
var result;
var pg,genpg;
var j;
let kineShader;
let counter = 6;
let numLayers = 180;

let snaps = false;

let layers= [];


let index1 = 0;
let index2 = numLayers/6; // 30
let index3 = numLayers/6 * 2; // 60
let index4 = numLayers/6 * 3; // 90
let index5 = numLayers/6 * 4; // 120
let index6 = numLayers/6 * 5; // 150


function preload() {

kineShader = loadShader('effect.vert', 'genmoire.frag');
uNet = ml5.uNet('face');
 }

function setup() {
  createCanvas(640,480,WEBGL);
  pixelDensity(1.0);
  video = createCapture(VIDEO);

  video.size(320,240);
  video.hide();

  for (let i = 0; i < numLayers; i++){
      let l = createGraphics(width, height);
      layers.push(l);
    }

    mlsetup();

  //noStroke();
  //noFill();
  pg = createGraphics(width,height);
  genpg = createGraphics(width,height,WEBGL);

  // loading = createDiv('Lenticular.  Press mouse button to capture webcam frames (one per second). Drag curtain to reveal images.');
  // loading.class("didactic");
  // loading.position(0,0);



  //genmoire(genpg);
  bars(pg);
  j = width;

}


function draw() {
 background(255);


layers[index1].image(segmentationImage, 0, 0, width, height);

// if (snaps == true){
// snapper();
// }

//if (images.length == counter){

genpg.shader(kineShader);


// send the camera and the resolution to the shader
//for (var i = 0; i < 6; i++) {
//kineShader.setUniform('tex[i]', images[i]);
//}
kineShader.setUniform('tex0', layers[index1]);
kineShader.setUniform('tex1', layers[index2]);
kineShader.setUniform('tex2', layers[index3]);
kineShader.setUniform('tex3', layers[index4]);
kineShader.setUniform('tex4', layers[index5]);
kineShader.setUniform('tex5', layers[index6]);

kineShader.setUniform('resolution', [width, height]);
kineShader.setUniform('u_time', frameCount * 0.05);

// rect gives us some geometry on the screen
//rectMode(CENTER);
genpg.rect(0,0,width, height);

imageMode(CENTER);

image(genpg,0,0);
var move = int(map(mouseX,0,displayWidth,0,windowWidth));
//console.log(layers.length);
image(pg,move,0);


  index1 = (index1 + 1)  % layers.length;
  index2 = (index2 + 1) % layers.length;
  index3 = (index3 + 1) % layers.length;
    index4 = (index4 + 1) % layers.length;
    index5 = (index5 + 1) % layers.length;
    index6 = (index6 + 1) % layers.length;

}
//}

function bars(p){

for (var x = 0; x < width; x+=6) {
p.noStroke();
p.fill(0);
p.rect(x,0,5,height);
}
}


// function mousePressed() {
//
//  if (images.length > 0){
//   images.length = 0;
//   }
// snaps = true;
// didatic();
// }

function didatic() {
  loading = createDiv('loading...')
  loading.class("didactic");
  loading.position(width/2,height/2);
}


// function snapper() {
//
// if (frameCount % 60 == 0 && images.length <= counter) {
//     images.push(segmentationImage.get());
// }
//
//
//
// if (images.length == counter){
// snaps = false;
// loading.remove();
//   }
// }