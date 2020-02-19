class Block {
  constructor(x, y, s, r, g, b) {
    this.position = createVector(x, y);
    this.rgb = createVector(r, g, b);
    this.rgborig = this.rgb.copy();
    this.rgbVel = createVector();
    this.rgbAcc = createVector();

    this.size = s;
    this.maxspeed = 1.5;
    this.maxforce = 0.01;
    this.lerper = 0;
  }

  randomizeColor() {
    this.rgb.set(floor(random(256)), floor(random(256)), floor(random(256)));
  }

  setToColor(r, g, b) {
    this.rgb.set(r, g, b);
    this.rgborig = this.rgb.copy();
  }

  applyForce(force) {
    this.rgbAcc.add(force);
  }

  flock(blocks) {
    var sep = this.separate(blocks);
    var ali = this.align(blocks);
     var coh = this.cohesion(blocks);
    // var int = this.intersects(blocks);

//     this.mred = map(mouseX, 0, width, 0, 255);
//     this.mgreen = map(mouseY, 0, height, 0, 255);
//     this.blue = map(mouseY, 0, height, 255, 0);


   // this.home = createVector(this.mred, this.mgreen, this.mblue);

    var home = this.seek(this.rgborig);



    if (gohome == false) {
  sep.mult(1.2); // 1.2
   ali.mult(1); // 1
   coh.mult(2); // 2

  home.mult(0);
    }else{
      sep.mult(0); // 1.2
   ali.mult(0); // 1
   coh.mult(0); // 2

  home.mult(10);
    }


 this.applyForce(sep);
 this.applyForce(ali);
    this.applyForce(coh);
  this.applyForce(home);
  // this.applyForce(int);
  }

  seek(target) {
    var desired = p5.Vector.sub(target, this.rgb);
    desired.normalize();
    desired.mult(this.maxspeed);
    var steer = p5.Vector.sub(desired, this.rgbVel);
    steer.limit(this.maxforce);
    return steer;
  }

  intersects(blocks) {

    for (var i = 0; i < blocks.length; i++) {
      if (blocks[i] !== null) {
        var d = p5.Vector.sub(this.rgb, blocks[i].rgb);
        if (d.mag() < 255) {
          d.setMag(-.1);
          d.limit(this.maxforce);
          return d;
         } else {
          return createVector(0, 0, 0);
      }
       }
    }
  }




    separate(blocks) {
      var sum = createVector(0, 0, 0);
      var count = 0;
      var steer = createVector(0, 0);
      for (var i = 0; i < blocks.length; i++) {
        if (blocks[i] !== null) {
          var diff = p5.Vector.sub(this.rgb, blocks[i].rgb);
          diff.normalize();
          sum.add(diff);
          count++;
        }
      }


      if (count > 0) {
        sum.div(count);
        sum.normalize();
        sum.mult(this.maxspeed);

        steer = p5.Vector.sub(sum, this.rgbVel);
        steer.limit(this.maxforce);
      }
      return steer;
    }

    align(blocks) {
      var sum = createVector(0, 0, 0);
      var count = 0;
      for (var i = 0; i < blocks.length; i++) {
        if (blocks[i] !== null) {
          sum.add(blocks[i].rgbVel);
          count++;
        }
      }

      if (count > 0) {
        sum.div(count);
        sum.normalize();
        sum.mult(this.maxspeed);
        var steer = p5.Vector.sub(sum, this.rgbVel);
        steer.limit(this.maxforce);
        return steer;
      } else {
        return createVector(0, 0, 0);
      }
    }

    cohesion(blocks) {
      var sum = createVector(0, 0, 0);
      var count = 0;
      for (var i = 0; i < blocks.length; i++) {
        if (blocks[i] !== null) {
          sum.add(blocks[i].rgb);
          count++;
        }
      }


      if (count > 0) {
        sum.div(count);
        return this.seek(sum);
      } else {
        return createVector(0, 0, 0);
      }
    }

  sizing() {

    if (gohome == false) {
      this.sizerr = map(this.rgb.x,0,255, 0, 3);
     // this.alpha = floor((this.rgb.x + this.rgb.y +this.rgb.z)/6);
    }else{
      this.sizerr = map(this.sizerr, 0, 3, this.sizerr, 1);
      //this.alpha = 255;
    }

    if (counter < 2000 && gohome == false) {

      this.lerper = 0;
      this.sizerr = lerp(1.0,this.sizerr,lerper);

     // console.log(this.lerper);


      //map(this.sizerr, 0, 3, this.sizerr, 1);
  }
  }


    display() {

    this.sizing();

    //  this.sizerg = map(this.rgb.y,0,255, 0, 3);
    //  this.sizerb = map(this.rgb.x,0,255, 0, 3);

    this.alpha = floor((this.rgb.x + this.rgb.y +this.rgb.z)/6);

      //constrain(map(this.rgbVel.x,-.1,.1, 0, 85),0,85);


      //RED
      stroke(this.rgb.x, 0, 0,this.alpha);
      fill(this.rgb.x, 0, 0,this.alpha);
      rectMode(CENTER);
      //rect(this.position.x,this.position.y,this.size,this.size);
     rect(this.position.x+(w/3), this.position.y, (this.size/3)*this.sizerr, this.size * this.sizerr);

      //GREEN
      stroke(0, this.rgb.y, 0,this.alpha);
      fill(0, this.rgb.y, 0,this.alpha);
      rectMode(CENTER);
     //rect(this.position.x,this.position.y,this.size,this.size);
      rect(this.position.x+(w/3*2), this.position.y, (this.size/3)*this.sizerr, this.size * this.sizerr);

      //BLUE
      stroke(0, 0, this.rgb.z,this.alpha);
      fill(0, 0, this.rgb.z,this.alpha);
      rectMode(CENTER);
    //  rect(this.position.x,this.position.y,this.size,this.size);
    rect(this.position.x+(w/3*3), this.position.y, (this.size/3)*this.sizerr, this.size * this.sizerr);



    }

    update() {
      this.rgbVel.add(this.rgbAcc);
      this.rgbVel.limit(this.maxspeed);
      this.rgb.add(this.rgbVel);

      this.edges();

      this.rgbAcc.mult(0); // reset acceleration
    }

    edges() {
      if (this.rgb.x > 255) {
        this.rgb.x = 255;
        this.rgbVel.x *= -1;
      } else if (this.rgb.x < 0) {
        this.rgb.x = 0;
        this.rgbVel.x *= -1;
      }

      if (this.rgb.y > 255) {
        this.rgb.y = 255;
        this.rgbVel.y *= -1;
      } else if (this.rgb.y < 0) {
        this.rgb.y = 0;
        this.rgbVel.y *= -1;
      }

      if (this.rgb.z > 255) {
        this.rgb.z = 255;
        this.rgbVel.z *= -1;
      } else if (this.rgb.z < 0) {
        this.rgb.z = 0;
        this.rgbVel.z *= -1;
      }

    }
  }
