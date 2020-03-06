// in this sketch we're going to turn the camera image into a pixellated mosaic

// the shader variable
let redShader,greenShader,blueShader;

// the camera variable
let cam;

var isMobile = false;
var isAndroid = false;

let redpg, greenpg, bluepg, alphapg;

let distanceAvg = 2;

var tileno = 10.;

var radius = 150.;


function preload(){
  // load the shader

  if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) ||
    /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0, 4))) {
    isMobile = true;
  }

  if (/android/i.test(navigator.userAgent)) {
    isAndroid = true;
  }

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
  mlsetup();

  redpg = createGraphics(width, height, WEBGL);
  greenpg = createGraphics(width, height, WEBGL);
  bluepg = createGraphics(width, height, WEBGL);
  alphapg = createGraphics(width, height, WEBGL);

  alph();
}


function alph() {
  alphapg.background(0);
  //alphapg.noStroke();
  alphapg.strokeWeight(10);
  alphapg.stroke(255,127);
  alphapg.fill(255);
   alphapg.rectMode(CENTER);
   alphapg.rect(0,0,height-150,height-150);
}

function draw() {
  background(0);
  smooth();
  blendMode(SCREEN);
  mldraw();

  radius = constrain (abs((map(avg(lastD),90,30,100,10))), 10, 100);
//radius = avg(lastD);


  //console.log(avg(lastD));
  //translate(-width/2,-height/2);
  // shader() sets the active shader with our shader
  redpg.shader(redShader);
  greenpg.shader(greenShader);
  bluepg.shader(blueShader);


  // lets just send the cam to our shader as a uniform
  redShader.setUniform('tex0', cam);
    redShader.setUniform('tex1', alphapg);
  redShader.setUniform('resolution', [width, height]);
  redShader.setUniform('tileno', tileno);
  redShader.setUniform('radius', radius);
  redShader.setUniform('u_time', frameCount * 0.05);
  redShader.setUniform('isMobile', isMobile);


  greenShader.setUniform('tex0', cam);
  greenShader.setUniform('tex1', alphapg);
  greenShader.setUniform('resolution', [width, height]);
  greenShader.setUniform('tileno', tileno);
  greenShader.setUniform('radius', radius);

  blueShader.setUniform('tex0', cam);
  blueShader.setUniform('tex1', alphapg);
  blueShader.setUniform('resolution', [width, height]);
  blueShader.setUniform('tileno', tileno);
  blueShader.setUniform('radius', radius);

  //camShader.setUniform('mouse', [mx, my]);

  // rect gives us some geometry on the screen
  redpg.rect(0,0,width, height);
  greenpg.rect(0,0,width, height);
  bluepg.rect(0,0,width, height);

  //let angle = atan2(avg(lastlefteyeX) - height / 2, avg(lastlefteyeY) - width / 2);


imageMode(CENTER);

image(redpg,0,0);

push();
//rotate(angle);
let i = map(avg(lastlefteyeX), 0, width, width/3, 0);
//let j = map(avg(lastlefteyeY), 0, height, height/3, 0);
//console.log(i);

image(greenpg, i , 0);
pop();

push();
//rotate(angle*2);
image(bluepg,0-i,0);
pop();


}

function windowResized(){
  resizeCanvas(windowWidth, windowHeight);
}
