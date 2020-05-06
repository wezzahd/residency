let pixelShader;
let cam;
let pixelpg;
let radius, colour;

function shaderPreload() {
  // load the shader
  pixelShader = loadShader('shader/effect.vert', 'shader/pixelfrag.frag');
}

function shaderSetup() {
  // initialize the webcam at the window size
  cam = createCapture(VIDEO);
  cam.size(windowWidth, windowHeight);

  // hide the html element that createCapture adds to the screen
  cam.hide();
  pixelpg = createGraphics(width, height, WEBGL);
}

function shaderDraw() {

  //blendMode(SCREEN);

  radius = 20;


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

  //imageMode(CENTER);
  image(pixelpg, 0, 0);
}

function shaderMousePressed() {

if  (mouseY > 100 && mouseY < height && !instruction_toggle ) {

  colour = 0;//cam.get(width - mouseX, mouseY);
  var data = {
    mouseX_loc: mouseX,
    mouseY_loc: mouseY,
    colour_loc: colour,
    deviceWidth: windowWidth,
    deviceHeight: windowHeight
  }

  var test = database.ref('test');

  test.push(data);
  console.log(data);
}
}

function shaderWindowResized() {
  //resizeCanvas(windowWidth, windowHeight);
  pixelpg.resizeCanvas(windowWidth, windowHeight);
}
