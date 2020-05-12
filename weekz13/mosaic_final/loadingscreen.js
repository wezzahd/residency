let buttonCol1 = 0;
let buttonCol2 = 0;
let buttonCol3 = 0;

function buttonSetup() {
cambuttonX = width - 40;
cambuttonY = 20;
}

function instructionsButtons() {

  fill(buttonCol1,150);
  stroke(255);
  rectMode(CENTER);
//  rect(cambuttonX, cambuttonY, 25, 25);
  fill(buttonCol2,150);
  rect(cambuttonX, 50, 25, 25);
  fill(buttonCol3,150);
  rect(cambuttonX, 80, 25, 25);

}

function buttonText(){

// text1 = createP('camera');
// text1.position(cambuttonX-70,0);
// text1.class("didacticright");
// text1.hide();

text2 = createP('full screen');
text2.position(cambuttonX-70,30);
text2.class("didacticright");
text2.hide();

text3 = createP('info');
text3.position(cambuttonX-70,60);
text3.class("didacticright");
text3.hide();


}



function loadingScreen(p) {

if (instruction_toggle == true) {
  p.push();
  p.noStroke();
  p.fill(150,50);
  p.rectMode(CENTER);
  p.rect(width/2,height/2, width, height);

  p.pop();
   }

  //image(p, 0, 0);
}

function instructionsDidactic () {

}

function remove_elements(){

//  inst_button.remove();
//  fullscr.remove();
//  inst_text.remove();
}
