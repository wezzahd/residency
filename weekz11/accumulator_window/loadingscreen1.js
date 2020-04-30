function loadingScreen() {

  pg.background(0);

  pg.noFill();

  imageaspectratio(pg);

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
    if (isMobile == true && width < height){
      pg.image(info, width-40, 50, 30, 30);
        }else{
      pg.image(info, width-40, 30, 30, 30);
}
  }

if (instruction_toggle == true) {
  pg.push();
  pg.noStroke();
  pg.fill(255,150);
  pg.rectMode(CENTER);
  pg.rect(width/2,height/2, width, height);


  if (instruction_toggle == true) {

 if (isMobile == true && width < height){
   pg.image(close, width-40, 50, 30, 30);
      }else{
        pg.image(close, width-40, 30, 30, 30);
}
  }

  pg.pop();
   }

  image(pg, 0, 0);
}


function instructions () {

  if (isMobile == false) {
    fullscr = createP('click here for fullscreen');
    fullscr.class("didacticcenter");
fullscr.style('position','absolute');
  fullscr.style('top', (0)+'px');

  }

  if (isAndroid == true && width < height) {
    fullscr = createP('click here for fullscreen');
    fullscr.class("didacticcenter");
fullscr.style('position','absolute');
  fullscr.style('top', (0)+'px');
  }

  if (isAndroid == true && height < width) {
    fullscr = createP('click here for fullscreen');
    fullscr.class("didacticcenter");
fullscr.style('position','absolute');
  fullscr.style('top', (0)+'px');
  }


  link = createA('https://www.wesleydowling.com', 'Wesley Dowling');
  link.class("didacticleft");

  if (isMobile == true){
    inst_button = createP('tap button to start');
    inst_button.class("didacticcenter");
    inst_button.style('position','absolute');
    inst_button.style('top', (height-70)+'px');


    link.position(20, height/5-20);


    }else{

      inst_button = createP('click button to start');
      inst_button.class("didacticcenter");
      inst_button.style('position','absolute');
      inst_button.style('top', (height-70)+'px');
      link.position(width/6, (height/3) -40);
    }


  text_dict = createDiv('Code is an online generative work by Wesley Dowling that fragments and transforms photographs into pixelated flowing colour. Face detection algorithms capture the viewers image as an RGB subpixel array. The image is then sampled to initialize and produce an ever-changing generative colour field. The work occupies a liminal queer space that oscillates between states of photographic representation and abstraction.  The shifting composition is an outcome of research into how queering can be used to identify and subvert normative ideological assumptions in computational image making. Queering is used as a mode of resistance to scrutiny and surveillance by distorting the camera’s visual taxonomies through which people are recognized and regulated. The work undermines visual recognition to find a more open and variable mode of rendering that disrupts societal norms and essentialized notions of identity. Please note this website uses webcam image capture and face detection technologies to function.\nWebcam images and detection data is not saved by the website or uploaded to an external server or third party.');

  text_dict.class("didactic");
  // text_dict.position(20, height/4);
  // text_dict.size(width- 20, height/2);

  if (isMobile == false){
    text_dict.size((width-width/3), height/3);
    text_dict.position(width/6,height/3);
  }else{
    text_dict.position(20, height/5);
    text_dict.size(width-20, height/2);
    var $scrollableElement = document.querySelector('.didactic');
    scrollLock.disablePageScroll($scrollableElement);
  }

    textResize();






}
