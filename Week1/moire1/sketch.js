var ready;
var cols,rows;
var isMobile = false;
var capture;
var cnv;

var isAndroid = false;
var intersect_toggle = false;
var main_animation = false;
var loading_cap;
var pg;
var fullscreen_button;
let bg;
var buttonx, buttony;
var instruction_toggle = false;
var gohome = false;
var counter = 0;
var countermax = 200;
var lerper = 0;
var inner;
var reset = false;
var lfotri = 0;

var scl = 0.001; // scale of noisefield, [+/-] to zoom in/out

var numberOfSlices = 5; // number of slices in noise space (along z-axis)

var skip = 30;

// position in noise field
var zMove = 0.0;
var xMove = 0.0;
var yMove = 0.0;

var redparticles; // array for particles
var greenparticles;
var blueparticles;

var redpg,greenpg,bluepg
var sine;


var timeLastFrame = 0.0;

const sclMultiplier = 1.2; // [+/-] divide/multiply scl by this to zoom in/out

// movement per second
const xSpeed = 0.0008;
const ySpeed = 0.01;
const zSpeed = 0.05;

const sliceDistance = 0.005;
const maxspeed = 6;
const hueMultiplier = 600;//500.0;
const accMultiplier = 8 * Math.PI;




document.addEventListener('touchmove', function(event) {
  if (event.scale !== 1) {
    event.preventDefault();
  }
}, false);


function preload() {

  if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) ||
    /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0, 4))) {
    isMobile = true;
  }

  if (/android/i.test(navigator.userAgent)) {
    isAndroid = true;
  }

}



function centerCanvas() {

// if (isMobile == false) {
//
//   var cnv_x = (windowWidth - width) / 2;
//   var cnv_y = (windowWidth - height) / 2;
//   cnv.position(cnv_x, cnv_y);
//}else{
  inner = iosInnerHeight();
  var cnv_x = (windowWidth - width) / 2;
  var cnv_y = (inner - height) / 2;
  cnv.position(cnv_x, cnv_y);
//}
}

function make2Darray(cols, rows) {
  var arr = new Array(rows);
  for (var i = 0; i < arr.length; i++) {
    arr[i] = new Array(cols);
  }
  return arr;
}

function capturecam() {
  capture = createCapture(VIDEO, ready);
  capture.elt.setAttribute('playsinline', '');
  capture.size(width, height);
  capture.hide();
}



function setup() {

  if (isMobile == false) {
    skip = 20;
    cnv = createCanvas(windowWidth, windowHeight);
    cnv.style('display', 'block');
  } else {
    skip = 20;
      if (windowWidth < windowHeight){
        inner = iosInnerHeight();
        cnv = createCanvas(windowWidth, inner);
        cnv.style('display', 'block');
        console.log("portrait")
  }else {
    cnv = createCanvas(windowWidth, windowHeight);
    cnv.style('display', 'block');
     console.log("landscape")
}
  }

capturecam();
  pixelDensity(1);
  pg = createGraphics(width, height);
}

function draw() {

  if (main_animation == false) {
    loadingScreen();
  } else {
    noiseDraw();
  }
}


function loadingScreen() {

  pg.background(0);

  pg.noFill();

  // if (frameCount < 90) {
  //
  //   var ellsize = map(frameCount, 0, 90, eraser_size * 8, eraser_size * 2);
  // } else {
  //   var ellsize = (eraser_size * 2);
  // }

// if(isMobile == false) {

//   pg.imageMode(CENTER);
//   pg.image(capture, width/2,height/2,width,width * capture.height / capture.width);

// }else{

  pg.image(capture,0,0,width,height);
// }

  buttonx = width/2;
    buttony = (height-(height/6));

  pg.fill(127,160);
  pg.noStroke()
  pg.ellipseMode(CENTER);
  pg.ellipse(buttonx,buttony, 90, 90);


  pg.fill(255);
  pg.noStroke()
  pg.ellipseMode(CENTER);
  pg.ellipse(buttonx,buttony, 65,65);


  if (instruction_toggle == false) {
  pg.noFill();
  pg.stroke(255)
  pg.rectMode(CENTER);
  pg.rect(40,40, 30,30);
  }else{
     pg.noStroke();
  pg.fill(255)
  pg.rectMode(CENTER);
  pg.rect(40,40, 30,30);
  }






  // if (loading_alpha <= 0) {
  //   still();
  //   main_animation = true;
  //   trigger = false;
  // }



  if (instruction_toggle == true) {
  instructions();
  }

  image(pg, 0, 0);


}


function instructions () {

  for (var m = 0; m < width; m += skip) {
        for (var n = 0; n < height; n += skip) {


          pg.noFill();
          pg.strokeWeight(.5);
  pg.stroke(255,127);
  pg.rectMode(CENTER);
  pg.rect(m,n, skip, skip);


        }
      }


  pg.noStroke();
  pg.fill(80,127);
  pg.rectMode(CENTER);
  pg.rect(width/2,height/2, width, height);





 pg.noStroke();
  pg.fill(255, 150);
  pg.textAlign(CENTER, CENTER);

  if (isMobile == false) {
    pg.textSize(24);
  } else {
    pg.textSize(24);
  }


 pg.textFont("VT323");

  pg.noStroke();
  pg.fill(255, 255);

  pg.textAlign(CENTER, CENTER);

  if (isMobile == false) {
    pg.text('click here for fullscreen', width / 2, (40));
  }

  if (isAndroid == true && width < height) {
    pg.text('click here for fullscreen', width / 2, (40));
  }

  if (isAndroid == true && height < width) {
    pg.text('click here for fullscreen', width / 2, (40));
  }


  pg.textAlign(CENTER, CENTER);






  if (isMobile == false) {

     pg.textSize(70);
     pg.text('n o i s e', width / 2, height/3);

     pg.textSize(24);

    pg.text('click button to start', width / 2, (height -20));

    pg.text('mouse click to reset', width / 2, height/2);

  } else {

    pg.text('n o i s e', width / 2, height/6);
    pg.text('tap button to start', width / 2, (height -20));
       pg.text('touch to reset', width / 2, height/3+20);

  }

//   if (isMobile == false) {

//    // pg.text('click and hold mouse button', width / 2,  height/2 +40);
//    // pg.text('to reconstruct image', width / 2, height/2+60);

//   } else {
//     pg.text('two finger touch and hold', width / 2, (height - height/3)-40);
//     pg.text('to reconstruct image', width / 2, (height - height/3)-20);
//   }
}





function noiseSetup() {

  timeLastFrame = millis();
  //colorMode(HSB, 255);

  cols = int(width / skip);
  rows = int(height / skip);
  //  rows = int((width * capture.height / capture.width) / w);

  redpg =createGraphics(width,height);
  greenpg = createGraphics(width,height);
  bluepg = createGraphics(width,height);


  capture.size(cols, rows);
  redparticles = make2Darray(cols, rows);
  greenparticles = make2Darray(cols, rows);
  blueparticles = make2Darray(cols, rows);

  for (var y = 0; y < rows; y++) {
    for (var x = 0; x < cols; x++) {

   redparticles[y][x] = new Particle(x * skip, y * skip, 0);
  greenparticles[y][x] = new Particle(x * skip, y * skip, 1);
   blueparticles[y][x] = new Particle(x * skip, y * skip, 2);
    }
  }


}

function noiseDraw() {

  blendMode(BLEND);
    background(0);
  blendMode(ADD);

//if(isMobile == false){
getColour();
//}

lfo();
// var zoom = map(counter,0, 200, .25, 1.0); // use settings for insta docs
  //var zoom = map(counter,0, countermax, .25, 1.0);
//var zoom = 0.5;
 var zoom = map (mouseX, 0,width,0.5,2);
//     translate(width/2 - ((width/2)*zoom) ,height/2 - ((height/2)*zoom));
//    scale(zoom);


  if (counter < countermax) {
    counter = counter + 1;
    lerper = constrain((lerper + 0.01),0,1);
  }

if (reset == true) {
  counter = 0;
  lerper = 0;
  reset = false;
}

//console.log(counter);

var timePassed = (millis() - timeLastFrame) / 1000.0;
  timeLastFrame = millis();

  xMove += xSpeed * timePassed;
  yMove += ySpeed * timePassed;
  zMove += zSpeed * timePassed;

//translate(width/2 - ((width/2)) ,height/2 - ((height/2)));

//push();
//translate(width/2 - ((width/2)) ,height/2 - ((height/2)));
var deg = 0;//map(mouseX, 0, width, 0, 90);
//rotate(radians(frameCount));
  for (var y = 0; y < rows; y++) {
    for (var x = 0; x < cols; x++) {
    //  particles[y][x].calculateForce();
    redparticles[y][x].display();
   //particles[y][x].behaviours();
      redparticles[y][x].update();
    }
  }
//  pop();

//  push();
//  translate(width/2,height/2);
  var deg = 1;//map(mouseX, 0, width, 0, 90);
//  rotate(radians(deg));
    for (var y = 0; y < rows; y++) {
      for (var x = 0; x < cols; x++) {
      //  particles[y][x].calculateForce();
      //  redparticles[y][x].display();
     //particles[y][x].behaviours();
        //redparticles[y][x].update();

     greenparticles[y][x].display();
    greenparticles[y][x].update();
      }
    }
  //  pop();


  //  push();
    //translate(width/2,height/2);
    var deg = 2;//map(mouseX, 0, width, 0, 90);
  //  rotate(radians(deg));
      for (var y = 0; y < rows; y++) {
        for (var x = 0; x < cols; x++) {

      blueparticles[y][x].display();
       //particles[y][x].behaviours();
        blueparticles[y][x].update();
        }
      }
  //    pop();


var framespeed = frameCount/16;//map(sine,-1,1,-10,10);

//map(mouseX,0,width,0,10);//frameCount/4;

  push();
  translate(width/2,height/2);
  rotate(radians(framespeed));
  imageMode(CENTER);
  image(redpg,0,0);
  pop();

  push();
  translate(width/2,height/2);
  rotate(radians(framespeed*2));
  imageMode(CENTER);
  image(greenpg,0,0);
  pop();

  push();
  translate(width/2,height/2);
  rotate(radians(framespeed*3));
  imageMode(CENTER);
  image(bluepg,0,0);
  pop();

//image(redpg,0,0);
//image(greenpg,0,0);
//image(bluepg,0,0);



}

function getColour() {
    //var pixel = get(mouseX, mouseY);

    capture.loadPixels();
    loadPixels();

      for (y = 0; y < rows; y++) {
        for (x = 0; x < cols; x++) {

          //var pixel = capture.get(x, y);

          let d = pixelDensity();
          index = 4 * ((y * d) * capture.width * d + (x * d));

          redparticles[y][x].setToColor(capture.pixels[index], capture.pixels[index + 1], capture.pixels[index +2]);
          greenparticles[y][x].setToColor(capture.pixels[index], capture.pixels[index + 1], capture.pixels[index +2]);
          blueparticles[y][x].setToColor(capture.pixels[index], capture.pixels[index + 1], capture.pixels[index +2]);
        // console.log("set color");
        }
      }
}

function windowResized() {

  if (isMobile == true) {

  if (main_animation == true) {
    inner = iosInnerHeight();
    resizeCanvas(windowWidth, inner);
    capturecam();
    centerCanvas();
    noiseSetup();
    setTimeout(getColour, 1000);
  } else {
    pg.clear();
    inner = iosInnerHeight();
    resizeCanvas(windowWidth, inner);
    capturecam();
    centerCanvas();
    pg = createGraphics(width, height);
    loadingScreen();
  }
}else{
  //if (isMobile ==false &&
    if (main_animation == true) {
    resizeCanvas(windowWidth, windowHeight);
    //capturecam();
    //centerCanvas();
    noiseSetup();
    setTimeout(getColour, 1000);
    } else {
    pg.clear();
    resizeCanvas(windowWidth, windowHeight);
    //capturecam();
        //  centerCanvas();
    pg = createGraphics(width, height);
    loadingScreen();
}
 }
}

// calculate force from noisefield
function calculateForce(x, y, z) {
  return noise(x * scl + xMove, y * scl + yMove, z + zMove);
}

function lfo () {

// if (lfotri < 1) {
//   lfotri = lfotri + (frameCount/1000000);
// //  console.log(lfotri);
// }
//
// if (lfotri >= 1){
//   gohome = !gohome;
// reset = !reset;
// lfotri = 0;
// console.log(gohome);
//  console.log(reset);
// }

sine = 1 * sin(TWO_PI * frameCount / 1200);

// if (sine > 0.99){
//   gohome = !gohome;
//   reset = !reset;
//  console.log(gohome);
//  console.log(reset);


//  console.log(sine);

}




function touchMoved(event) {
  return false;
}

function mousePressed() {

   if (mouseIsPressed == true && mouseX > (buttonx - 35) && mouseX < (buttonx + 35) && mouseY > (buttony - 35) && mouseY < (buttony + 35) && main_animation ==  false) {
    noiseSetup();
     main_animation = true;
  }

    if (mouseX > width/3 && mouseX < width -(width/3) && mouseY > 0 && mouseY < 70 && isMobile == false) {
    let fs = fullscreen();
    fullscreen(!fs);
  }


  if (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < 70 && isAndroid == true ) {
    let fs = fullscreen();
    fullscreen(!fs);
  }


  if (mouseX > (50 - 25) && mouseX < (50 + 25) && mouseY > (50 - 25) && mouseY < (50 + 25)) {
    instruction_toggle = !instruction_toggle;
  }

  if (mouseX < width && mouseX > 0 && main_animation == true) {
    if (mouseY < height && mouseY > 0 && main_animation == true) {
   getColour();
   // counter = 0;
   // lerper = 0;
   // gohome = false;
   // reset = false;
   // lfotri = 0;
    }
  }
}

function keyPressed() {

  if (key == 'h' || key == 'H') {

    gohome = !gohome;
    reset = !reset;
    console.log(gohome);
    console.log(reset);
  }else{

  }

  if (key == 'r' || key == 'R') {
    console.log("reset");
    for (y = 0; y < rows; y++) {
      for (x = 0; x < cols; x++) {
        blocks[y][x].randomizeColor();
      }
   }
}

}
