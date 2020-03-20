function imageaspectratiomain(mainanimation) {
    var aspectRatiow = width / cam.width;
    var aspectRatioh = height / cam.height;


    //mainanimation.translate(-width/2,-height);
  //  console.log(aspectRatiow, aspectRatioh)

    mainanimation.push();

    mainanimation.translate(width/2,-height/4); // need to test this on different devices.
    mainanimation.scale(-1, 1);



   if (aspectRatiow > 1 && aspectRatioh < 1) {
     mainanimation.translate(width/2,height/2);
     mainanimation.scale(aspectRatiow);
     mainanimation.imageMode(CENTER);
     mainanimation.image(cam,0,0);
 }

 if (aspectRatiow < 1 && aspectRatioh > 1) {
   mainanimation.translate(width/2,height/2);
  mainanimation.scale(aspectRatioh);
  mainanimation.imageMode(CENTER);
  mainanimation.image(cam,0,0);
 }

 if (aspectRatiow > 1 && aspectRatioh > 1) {
  mainanimation.translate(width/2,height/2);

if (aspectRatiow > aspectRatioh) {
  mainanimation.scale(aspectRatiow);
  }else{
  mainanimation.scale(aspectRatioh);
  }
  mainanimation.imageMode(CENTER);
  mainanimation.image(cam,0,0);
  }

 if (aspectRatiow <= 1 && aspectRatioh <= 1) {
  mainanimation.imageMode(CENTER);
  mainanimation.image(cam,width/2,height/2);
 }
mainanimation.pop();
}
