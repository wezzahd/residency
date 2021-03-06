var images = [];
var result;
var pg,genpg;
var j;
let kineShader;


function preload() {

kineShader = loadShader('effect.vert', 'genmoire.frag');

for (var i = 0; i < 6; i++) {
images[i] = loadImage("images/"+i+".png");
}
}

function setup() {
  createCanvas(images[0].width,images[0].height,WEBGL);
  pixelDensity(1.0);
  //noStroke();
  //noFill();
  pg = createGraphics(width,height);
  genpg = createGraphics(images[0].width,images[0].height,WEBGL);



  //genmoire(genpg);
  bars(pg);
  j = width;

}

function draw() {
 background(255);

//



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

kineShader.setUniform('resolution', [genpg.width, genpg.height]);
kineShader.setUniform('u_time', frameCount * 0.05);

// rect gives us some geometry on the screen
//rectMode(CENTER);
genpg.rect(0,0,width, height);

imageMode(CENTER);

image(genpg,0,0);
var move = int(map(mouseX,0,displayWidth,0,windowWidth));
//console.log(move);
image(pg,move,0);


j= j-1.0;
//
if (j < 0){
j = width;
 }
}

function bars(p){

for (var x = 0; x < width; x+=6) {
p.noStroke();
p.fill(0);
p.rect(x,0,5,height);
}
}


function genmoire(p){
  //noprotect
   for (var x = 0; x < width; x+=6) {
   for (var j = 0; j < 6; j ++) {
 p.copy(images[j], x+j, 0, 1, height, x+j, 0, 1, height);

     }
  }

}
