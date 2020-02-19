class Particle {
  constructor(x, y, channel) {
    this.pos = createVector(x,y);
    this.rgbVel = createVector(0, 0, 0);
    this.rgbAcc = createVector(0, 0, 0);
    this.hsb = createVector(360,100,50); // hue
    this.rgb = createVector(0,0,0);
    this.rgborig = this.rgb.copy();
    this.noisergb = createVector(0,0,0);

    this.size = skip;
    this.sizerr = 1;
    this.alpha = 255;
    this.fillalpha = 40;
    this.slice = int(random(numberOfSlices)) * sliceDistance;
    this.col = color(0,0,0);
    this.maxspeed = 0.4;
    this.maxforce = 0.01;
    this.channel = channel;


    //this.prevPos = this.pos.copy();
  }

  setToColor(r, g, b) {
    this.rgb.set(r, g, b);
    this.rgborig = this.rgb.copy();
  }

behaviours() {

  if (gohome == false) {
  var getnoisy = this.seek(this.noisergb);
  //console.log(getnoisy);
  this.applyForce(getnoisy);
}else{
  var rgborig = this.seek(this.rgborig);
  //console.log(getnoisy);
  this.applyForce(rgborig);

}
}


    update() {
      this.rgbVel.add(this.rgbAcc);
      this.rgbVel.limit(this.maxspeed);
      this.rgb.add(this.rgbVel);
      this.rgbAcc.mult(0);
    }

    applyForce(force) {
      this.rgbAcc.add(force);
    }

    calculateForce() {
      var force = calculateForce(this.pos.x,this.pos.y,this.slice);

      this.sizerr = constrain(map(force,0.3,0.7,0,3),0.1,3);

      this.alpha = map(force,0,1,10,200);

      this.setHue(force * hueMultiplier);


          // if (gohome == false) {
          //   this.sizerr = map(this.rgb.x,0,255, 0, 3);
          //  // this.alpha = floor((this.rgb.x + this.rgb.y +this.rgb.z)/6);
          // }else{
          //   this.sizerr = map(this.sizerr, 0, 3, this.sizerr, 1);
          //   //this.alpha = 255;
          // }

          if (counter < countermax && gohome == false) {

            this.lerper = 0;
            this.sizerr = lerp(1.0,this.sizerr,lerper);
            this.alpha = lerp(255,this.alpha,lerper);
}

if (gohome == true) {

  this.lerper = 0;
  this.sizerr = lerp(this.sizerr,1.0,lerper);
  this.alpha = lerp(this.alpha,255,lerper);

}
        //var vector = p5.Vector.fromAngle(force * accMultiplier);

        //this.acc.add(vector);
    }

   setHue(force) {
      if (force > 360) {
              this.hsb.x = force % 361;
        } else {
              this.hsb.x = force;
        }
  //       stroke(this.hue, 255, 255, visibility);
//console.log(force);
      this.HSBtoRGB();

    }

HSBtoRGB() {

  this.hsbcolor = tinycolor({ h: this.hsb.x, s: 1, l: .5 });
  this.rgbcolor =  this.hsbcolor.toRgb(); // { r: 255, g: 0, b: 0, a: 1 }
  this.rgbarray = (Object.values(this.rgbcolor));
  this.noisergb = createVector(this.rgbarray[0],this.rgbarray[1],this.rgbarray[2]);
}

seek(target) {
  var desired = p5.Vector.sub(target, this.rgb);
  desired.normalize();
  desired.mult(this.maxspeed);
  var steer = p5.Vector.sub(desired, this.rgbVel);
  steer.limit(this.maxforce);
  return steer;
}

  display() {



//translate(width/2,height/2);

if (this.channel ==  0){
//RED
redpg.stroke(this.rgb.x, 0,0,this.alpha);
redpg.fill(this.rgb.x, 0,0,this.fillalpha);
redpg.rectMode(CENTER);
//redpg.rect(this.pos.x+(this.size/3), this.pos.y, (this.size/3)*this.sizerr, this.size * this.sizerr);
//redpg.rect(this.pos.x+(this.size/3), this.pos.y, (this.size/3)*this.sizerr, this.size * this.sizerr);
redpg.rect(this.pos.x+(this.size/3), this.pos.y, (this.size/3)*this.sizerr, this.size * this.sizerr);
}

if (this.channel ==  1){
  //GREEN
  greenpg.stroke(0, this.rgb.y,0,this.alpha);
  greenpg.fill(0, this.rgb.y,0,this.fillalpha);
greenpg.rectMode(CENTER);
  //greenpg.rect(this.pos.x+(this.size/3), this.pos.y, (this.size/3)*this.sizerr, this.size * this.sizerr);
  greenpg.rect(this.pos.x+(this.size/3*2), this.pos.y, (this.size/3)*this.sizerr, this.size * this.sizerr);
}

if (this.channel ==  2){
  //BLUE
  bluepg.stroke(0, 0, this.rgb.z,this.alpha);
  bluepg.fill(0, 0, this.rgb.z,this.fillalpha);
  bluepg.rectMode(CENTER);
//bluepg.rect(this.pos.x+(this.size/3), this.pos.y, (this.size/3)*this.sizerr, this.size * this.sizerr);
bluepg.rect(this.pos.x+(this.size/3*3), this.pos.y, (this.size/3)*this.sizerr, this.size * this.sizerr);
}


}


}
