class Particle {
  constructor(x, y, rand, img_, devWidth,devHeight) {
    this.origposition = createVector(x,y);
    this.position = createVector(map(x,0,devWidth,0,width), map(y,0,devHeight,0,height));
    this.velocity = p5.Vector.random2D();
    this.velocity.setMag(random(2, 4));
    this.velocity_v2 = createVector(random(-2, 2), random(-2, 2));
    this.acceleration = createVector();
    this.home = this.origposition.copy();
    this.lifespan = 0.0;
    this.fill_alpha = 0.0;
    this.rand = rand;
    this.img = img_;
    this.size_v2 = 20;
    this.maxsize = 20;//skip * (0.5/(particlecount));//random(1, 3) * (height/12) ;//40 //50;
    this.radius = 25;
    this.highlight = false;
    this.maxSpeed = 0.2;
    this.maxForce = 5.0;
    this.resize = random(1, 3) * (0.5/particlecount);
    this.strokeweight = 1.0;
    this.selected = false;
    this.period = (this.rand + 1) * 600;
    this.fillperiod = (this.rand + 1) ;
    this.amplitude = this.lifespan;
    this.local_force = true;
    this.origWidth = devWidth;
    this.origHeight = devHeight;
    this.gravity = createVector(0,0.0);

  }

  colour(rand) {

    this.c = color(this.img[0],this.img[1],this.img[2]);//this.img.get(this.home.x / skip, this.home.y / skip);

    this.fill_col = this.c;//this.random_color_gen[rand];
    this.stroke_col = this.c;//this.random_color_gen[(rand + 3)];
  }

  run() {
    this.update();
    this.display();
    this.edges();
  }

  behaviors(px, py) {
    this.mouse = createVector(px, py);
    var flee = this.flee(this.mouse);
    flee.mult(-1.0);
    this.applyForce(flee);

    this.applyForce(this.gravity);
  }

  flee() {
    var desired = p5.Vector.sub(this.mouse, this.position);
    var d = dist(this.mouse.x, this.mouse.y, this.position.x, this.position.y);
    this.mouseradius = eraser_size;
    this.positionradius = (this.size_v2/2);

    if (d < this.mouseradius + this.positionradius) {
      desired.setMag(this.maxSpeed);
      desired.mult(10.0);
      var steer = p5.Vector.sub(desired, this.velocity);
      steer.limit(this.maxForce);
      this.local_force = true;
      return steer;
   } else {
     return createVector(0, 0);
    }



  }

  cohesion(particles) {
    let perceptionRadius = 50;
    let steering = createVector();
    let total = 0;
    for (let other of particles) {
      let d = dist(this.position.x, this.position.y, other.position.x, other.position.y);
      if (other != this && d < perceptionRadius && d != 0) {
        steering.add(other.position);
        total++;
      }
    }
    if (total > 0) {
      steering.div(total);
      steering.sub(this.position);
      steering.setMag(this.maxSpeed);
      steering.sub(this.velocity);
      steering.limit(this.maxForce);
    }
    return steering;
  }


  separation(particles) {
      let perceptionRadius = 24;
      let steering = createVector();
      let total = 0;
      for (let other of particles) {
        let d = dist(this.position.x, this.position.y, other.position.x, other.position.y);
        if (other != this && d < perceptionRadius && d != 0) {
          let diff = p5.Vector.sub(this.position, other.position);
          diff.div(d * d);
          steering.add(diff);
          total++;
      }
}
      if (total > 0) {
        steering.div(total);
        steering.setMag(this.maxSpeed);
        steering.sub(this.velocity);
        steering.limit(this.maxForce);
      }
  //    this.dir = p5.Vector.sub(this.position, other.position);
    //  if (this.dir.magSq() < ((this.size_v2) * (this.size_v2)) && this.local_force == true &&
    //    this.position.x !== 0 && this.position.x !== width && this.position.y !== 0 && this.position.y !== height){
      return steering;
    //}
    }

  align(particles) {
     let perceptionRadius = 25 ;
     let steering = createVector();
     let total = 0;
     for (let other of particles) {
       let d = dist(this.position.x, this.position.y, other.position.x, other.position.y);
       if (other != this && d < perceptionRadius && d != 0) {
         steering.add(other.velocity);
         total++;
       }
     }
     if (total > 0) {
       steering.div(total);
       steering.setMag(this.maxSpeed);
       steering.sub(this.velocity);
       steering.limit(this.maxForce);
     }
    // this.dir = p5.Vector.sub(this.position, other.position);
     //if (this.dir.magSq() < ((this.size_v2) * (this.size_v2)) && this.local_force == true &&
    //   this.position.x !== 0 && this.position.x !== width && this.position.y !== 0 && this.position.y !== height){
     return steering;
   //}
   }


  // intersects(other) {
  //   this.dir = p5.Vector.sub(this.position, other.position);
  //   return (this.dir.magSq() < ((this.size_v2) * (this.size_v2)) && this.local_force == true &&
  //     this.position.x !== 0 && this.position.x !== width && this.position.y !== 0 && this.position.y !== height);
  // }

  intersectForce() {
    //this.dir.setMag(0.01);
  //  this.applyForce(this.dir);
  }

  applyForce(f) {
    this.acceleration.add(f);
  }

  update() {
    this.position.add(this.velocity);
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.maxSpeed);
    this.acceleration.mult(0);
    this.lifespan -= 0.0;
  //  this.velocity.limit(this.maxSpeed);

    this.home.x = map(this.origposition.x,0,this.origWidth,0,width);
    this.home.y = map(this.origposition.y,0,this.origHeight,0,height);


    // this.c = 0.01;
    // this.speed = this.velocity.mag();
    // this.dragMagnitude = this.c * this.speed * this.speed;
    // this.drag = this.velocity.copy();
    // this.drag.mult(-1);
    // this.drag.normalize();
    // this.drag.mult(this.dragMagnitude);
    // this.velocity.add(this.drag);

    this.colour(this.rand);
    this.d = dist(this.position.x, this.position.y, this.home.x, this.home.y);

    this.stroke_alpha_osc = 0.0;//0.1 * this.amplitude * sin(TWO_PI * frameCount / this.period);
    this.fill_alpha_osc = 0.0; //*  (this.amplitude / 3.75) * cos(TWO_PI * frameCount / this.fillperiod);

    // if (this.local_force == true) {
    //     this.velocity = this.velocity_v2;
    // }



    // if (this.size_v2 > this.maxsize) {
    //   this.size_v2 -= this.resize;
    //
    // }

    if (this.lifespan > (255 - particlecount) && this.local_force == true) {
      this.lifespan -= 0.5;
    }
    if (this.fill_alpha > 40.0 && this.local_force == true) {
      this.fill_alpha -= 1.0;
    }

    if (this.lifespan >= 0.0 && this.lifespan <= (255-particlecount) && this.local_force == true) {
      this.lifespan += .5;
    }
    if (this.fill_alpha >= 0.0 && this.fill_alpha <= 40.0 && this.local_force == true) {
      this.fill_alpha += .5;
    }




    // if (this.strokeweight > 1.0) {
    //   this.strokeweight -= 0.0;
    // }
  }

  edges() {
    if (this.position.x > width) {
      this.position.x = 0;
    } else if (this.position.x < 0) {
      this.position.x = width;
    }
    if (this.position.y > height) {
      this.position.y = 0;
    } else if (this.position.y < 0) {
      this.position.y = height;
    }
  }

  // Method to display
  display() {

    if (mouseIsPressed || LFO == true) {

      this.fill_alpha = map(this.d, 0, 500, 255, 40);
      //this.size_v2 = map(this.d, 0, 500, skip, this.maxsize);
      //this.amplitude = map(this.d, 0, 500, 0, this.amplitude);
      this.size_osc = 0;
    }

    if (this.d > 0.05 && mouseIsPressed) {
      this.local_force = false;
    }

  //  this.fill_col.setAlpha(this.fill_alpha + this.fill_alpha_osc);
  //  this.stroke_col.setAlpha(this.lifespan + this.stroke_alpha_osc);
    //console.log(this.stroke_col);
    //push();
    //translate(this.position.x * 1.4,this.position.y * 1.4)
    //scale(1.4);
    stroke(this.stroke_col);
    fill(this.fill_col);
    strokeWeight(this.strokeweight);
    rectMode(CENTER); //or rect?
    rect(this.position.x, this.position.y,
      (this.size_v2),this.size_v2);
    //pop();
  }

  isDead() {
    if (reset == true) {
      return true;
    } else {
      return false;
    }
  }
}
