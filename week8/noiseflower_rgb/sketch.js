// This line is used for auto completion in VSCode
/// <reference path="../../node_modules/@types/p5/global.d.ts" />
//this variable will hold our shader object

let myShader;
let noise;
let img;
var isMobile = false;
var isAndroid = false;

let redsizecontrol;
let bluesizecontrol;

let redShader,greenShader,blueShader;
let redpg, greenpg, bluepg;

var constraints0, constraints1, constrains2, constrains3;

function preload() {
  // a shader is composed of two parts, a vertex shader, and a fragment shader
  // the vertex shader prepares the vertices and geometry to be drawn
  // the fragment shader renders the actual pixel colors
  // loadShader() is asynchronous so it needs to be in preload
  // loadShader() first takes the filename of a vertex shader, and then a frag shader
  // these file types are usually .vert and .frag, but you can actually use anything. .glsl is another common one
  redShader = loadShader("redshader.vert", "redshader.frag");
  greenShader = loadShader("greenshader.vert", "greenshader.frag");
  blueShader = loadShader("blueshader.vert", "blueshader.frag");

  if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) ||
    /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0, 4))) {
    isMobile = true;
  }

  if (/android/i.test(navigator.userAgent)) {
    isAndroid = true;
  }

  //noise = loadImage("noise.png");
}

function capturecam(n) {
//  capture = createCapture(VIDEO, ready);
  img = createCapture(n);
  img.elt.setAttribute('playsinline', '');
  img.size(320, 240);
  img.hide();
}

function setup() {
  // shaders require WEBGL mode to work
  createCanvas(windowWidth, windowHeight, WEBGL);

  capturecam(constraints0);
  // img = createCapture(VIDEO);
  // img.size(width,height);
  // img.hide();

  redpg = createGraphics(width, height, WEBGL);
  greenpg = createGraphics(width, height, WEBGL);
  bluepg = createGraphics(width, height, WEBGL);

  redpg.noStroke();
  greenpg.noStroke();
  bluepg.noStroke();
}

// function lighting(p){
//     p.ambientLight(50);
//     p.directionalLight(255, 255, 255, 0.25, 0.25, 0);
//     p.pointLight(0, 0, 255, mouseX, mouseY, 250);
//
// }


function draw() {
  background(0);
  blendMode(SCREEN);
  // shader() sets the active shader with our shader
  //shader(myShader);
  let mx = map(mouseX, 0, width, 0, 1);
  let my = map(mouseY, 0, height, 0, 1);

  redpg.shader(redShader);
  greenpg.shader(greenShader);
  bluepg.shader(blueShader);

noCursor();


  // Send the frameCount to the shader
  redShader.setUniform("uFrameCount", frameCount);
  redShader.setUniform("uNoiseTexture", img);
  redShader.setUniform('mouse', [mx, my]);

  greenShader.setUniform("uFrameCount", frameCount);
  greenShader.setUniform("uNoiseTexture", img);
  greenShader.setUniform('mouse', [mx, my]);

  blueShader.setUniform("uFrameCount", frameCount);
  blueShader.setUniform("uNoiseTexture", img);
  blueShader.setUniform('mouse', [mx, my]);


redpg.background(0);
greenpg.background(0);
bluepg.background(0);


detail = map(mouseX,0,width,0,1);
  // Rotate our geometry on the X and Y axes
// redpg.rotateZ(0.01 * detail);
// //redpg.rotateY(0.005* detail);
//
// greenpg.rotateZ(0.01* detail);
// //greenpg.rotateY(0.005* detail);
//
//  bluepg.rotateZ(0.01* detail);
//bluepg.rotateY(0.005* detail);

  // Draw some geometry to the screen
  // We're going to tessellate the sphere a bit so we have some more geometry to work with
  //box(width / 10, 200,200);

  let size = 7;

if (mouseX >= (width - width/4)){
redsizecontrol  =  map(mouseX,(width - width/4),width,1,1.066);
bluesizecontrol = map(mouseX,(width - width/4),width,1,1.033);
}else{
 redsizecontrol  = 1.0;//map(mouseX,0,width,1,0.5);//1.0;
bluesizecontrol = 1.0;//map(mouseX,0,width,1,2);//1.0;
}

// lighting(redpg);
// lighting(greenpg);
// lighting(bluepg);

redpg.lights();
greenpg.lights();
bluepg.lights();


redpg.torus(width / size ,3, 150,2);
//  redpg.plane(width / size, width/size, 100,100);
  // redpg.box(width / size, width/size, width/size, 4, 4);
  // greenpg.box(width / size, width/size, width/size, 4, 4);
  // bluepg.box(width / size, width/size, width/size, 4, 4);
greenpg.torus(width / size * (bluesizecontrol) ,3, 150,2);
 bluepg.torus(width / size * redsizecontrol ,3, 150,2);


imageMode(CENTER);
  image(redpg,0,0);
   image(greenpg,0,0);
  image(bluepg,0,0);
}

function mousePressed() {

  if (mouseX > width/3 && mouseX < width -(width/3) && mouseY > 0 && mouseY < 70 && isMobile == false) {
  let fs = fullscreen();
  fullscreen(!fs);
  console.log(isMobile);
  //Remove vert scroll bar in fullScreen
   document.body.scrollTop = 0; // <-- pull the page back up to the top
  document.body.style.overflow = 'hidden';
}

if (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < 70 && isAndroid == true ) {
  let fs = fullscreen();
  fullscreen(!fs);
}
}

function keyPressed() {

  if (key == '0') { //reset
  console.log("camera0");
    capturecam(constraints0);
  }


  if (key == '1') { //reset
  console.log("camera1");
    capturecam(constraints1);
  }

  if (key == '2') { //reset
  console.log("camera2");
    capturecam(constraints2);
  }

  if (key == '3') { //reset
  console.log("camera3");
    capturecam(constraints3);
  }

}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  redpg.resizeCanvas(windowWidth, windowHeight);
  greenpg.resizeCanvas(windowWidth, windowHeight);
  bluepg.resizeCanvas(windowWidth, windowHeight);

}
