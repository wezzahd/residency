function imageaspectratio(pg) {
  var aspectRatiow = width / cam.width;
   var aspectRatioh = height / cam.height;

   //console.log(aspectRatiow, aspectRatioh)

mlready = true;


   pg.push();

    pg.translate(width,0);
     pg.scale(-1, 1);




   if (aspectRatiow > 1 && aspectRatioh < 1) {
     pg.translate(width/2,height/2);
     pg.scale(aspectRatiow);
     pg.imageMode(CENTER);
     pg.image(cam,0,0);
 }

 if (aspectRatiow < 1 && aspectRatioh > 1) {
   pg.translate(width/2,height/2);
   pg.scale(aspectRatioh);
   pg.imageMode(CENTER);
   pg.image(cam,0,0);
 }

 if (aspectRatiow > 1 && aspectRatioh > 1) {
   pg.translate(width/2,height/2);

if (aspectRatiow > aspectRatioh) {
    pg.scale(aspectRatiow);
  }else{
    pg.scale(aspectRatioh);
  }
    pg.imageMode(CENTER);
    pg.image(cam,0,0);
  }

 if (aspectRatiow <= 1 && aspectRatioh <= 1) {
   pg.imageMode(CENTER);
   pg.image(cam,width/2,height/2);
 }
 pg.pop();
}
