let text_dict, link;


function loadingScreen(p) {

if (instruction_toggle == true) {
  p.push();
  p.noStroke();
  p.fill(80,150);
  p.rectMode(CENTER);
  p.rect(width/2,height/2, width, height);

  p.pop();
   }

  image(p, 0, 0);
}


function instructionsDidactic () {

  link = createA('https://www.wesleydowling.com', 'Wesley Dowling');
  link.class("didacticleft");


  text_dict = createDiv('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sed turpis tincidunt id aliquet. Scelerisque in dictum non consectetur a erat nam. Eu turpis egestas pretium aenean pharetra magna ac. Augue lacus viverra vitae congue eu consequat ac felis donec. Sit amet tellus cras adipiscing enim eu. Tincidunt arcu non sodales neque sodales ut etiam. Enim praesent elementum facilisis leo vel fringilla est ullamcorper. Porttitor massa id neque aliquam vestibulum morbi blandit. Elementum nisi quis eleifend quam adipiscing vitae proin sagittis nisl.');

  text_dict.class("didactic");
  // text_dict.position(20, height/4);
  // text_dict.size(width- 20, height/2);

  if (isMobile == false){
    text_dict.size((width-width/3), height/3);
    text_dict.position(width/6,height/3);
    link.position(width/6, (height/3) -40);
  }else{
    text_dict.position(20, height/5);
    text_dict.size(width-20, height/2);
    link.position(20, height/5-20);
  //  var $scrollableElement = document.querySelector('.didactic');
  //  scrollLock.disablePageScroll($scrollableElement);
  }

  //  textResize();






}

function remove_elements(){
  text_dict.remove();
  link.remove();
//  inst_button.remove();
//  fullscr.remove();
//  inst_text.remove();
}
