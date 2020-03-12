var images = [];
var result;
var pg,genpg;
var j;

function preload() {

for (var i = 0; i < 6; i++) {
images[i] = loadImage("images/"+i+".png");
}
}

function setup() {
  createCanvas(800, 800);
  pg = createGraphics(width,height);
  genpg = createGraphics(width,height);
  genmoire(genpg);
  bars(pg);
  j = width;
}

function draw() {
background(255);
image(genpg,0,0);

image(pg,j,0);
j= j-0.5;

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
