let pixelShader;
let cam;
let pixelpg;
let radius, colour;

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
