class Particle {
  constructor(x, y, rand, img_, devWidth, devHeight) {
    this.origposition = createVector(x, y);
    this.position = createVector(map(x, 0, devWidth, 0, width), map(y, 0, devHeight, 0, height));
    this.velocity = createVector();
    this.velocity_v2 = createVector(random(-5, 5), random(-5, 5));
    this.acceleration = createVector();
    this.home = this.origposition.copy();
    this.lifespan = 0.0;
    this.fill_alpha = 0.0;
    this.rand = random(0, 100);
    this.img = img_;
    this.size_v2 = skip;
    this.maxsize = skip * 1.5; //(skip / (particlecount/1.5)) * 10.0 ;//random(1, 3) * (height/12) ;//40 //50;
    this.radius = 25;
    this.highlight = false;
    this.maxspeed = 1;
    this.maxforce = 1;
    this.resize = random(1, 3) * (1 / particlecount);
    this.strokeweight = 3.0;
    this.selected = false;
    this.period = (this.rand + 1) * 600;
    this.fillperiod = (this.rand + 1);
    this.amplitude = this.lifespan;
    this.local_force = true;
    this.origWidth = devWidth;
    this.origHeight = devHeight;
    this.aspect = devWidth/devHeight;

  }

  colour(rand) {

    if (this.rand > 0 && this.rand < 20) {
      this.c = color(45, 0, 255);
  } else if (this.rand > 20 && this.rand < 40) {
      this.c = color(220, 0, 255);
    } else if (this.rand > 40 && this.rand < 60) {
        this.c = color(191, 240, 255);
      } else if (this.rand > 60 && this.rand < 80) {
          this.c = color(0, 241, 255);
  }else{
    this.c = color(100, 0, 255);
  }


  this.fill_col = this.c; //this.random_color_gen[rand];
  this.stroke_col = this.c; //this.random_color_gen[(rand + 3)];
}


run() {
  this.update();
  this.display();
}

behaviors(px, py) {
  this.mouse = createVector(px, py);
  var flee = this.flee(this.mouse);
  flee.mult(-1.0);


  this.applyForce(flee);
}

flee() {
  var desired = p5.Vector.sub(this.mouse, this.position);
  var d = dist(this.mouse.x, this.mouse.y, this.position.x, this.position.y);
  this.mouseradius = eraser_size;
  this.positionradius = (this.size_v2 / 2);


  //var d = desired.mag();

  if (d < this.mouseradius + this.positionradius) {
    desired.setMag(this.maxspeed);
    desired.mult(10.0);
    var steer = p5.Vector.sub(desired, this.velocity);
    steer.limit(this.maxforce);
    this.local_force = true;
    return steer;
  } else {
    return createVector(0, 0);
  }
}

intersects(other) {
  this.dir = p5.Vector.sub(this.position, other.position);
  return (this.dir.magSq() < ((this.size_v2) * (this.size_v2)) && this.local_force == true &&
    this.position.x !== 0 && this.position.x !== width && this.position.y !== 0 && this.position.y !== height);
}

intersectForce() {
  this.power = 1000;
  let d = this.dir.mag(); // Distance between objects
  this.dir.normalize(); // Normalize vector (distance doesn't matter here, we just want this vector for direction)
  d = constrain(d, 5, 100); // Keep distance within a reasonable range
  let force = 1 * this.power / (d * d); // Repelling force is inversely proportional to distance
  this.dir.mult(force); // Get force vector --> magnitude * direction
  //  return dir;
  //this.dir.setMag(0.01);
  this.applyForce(this.dir);
}

applyForce(f) {
  this.acceleration.add(f);
}

update() {
  this.velocity.add(this.acceleration);
  this.position.add(this.velocity);
  this.acceleration.mult(0);
  this.lifespan -= 0.0;
  this.velocity.limit(this.maxspeed);

  this.home.x = map(this.origposition.x, 0, this.origWidth, 0, width);
  this.home.y = map(this.origposition.y, 0, this.origHeight, 0, height);


  // this.c = 0.007;
  // this.speed = this.velocity.mag();
  // this.dragMagnitude = this.c * this.speed * this.speed;
  // this.drag = this.velocity.copy();
  // this.drag.mult(-1);
  // this.drag.normalize();
  // this.drag.mult(this.dragMagnitude);
  // this.velocity.add(this.drag);

  this.colour(this.rand);
  this.d = dist(this.position.x, this.position.y, this.home.x, this.home.y);

  this.stroke_alpha_osc = 0.0; //0.1 * this.amplitude * sin(TWO_PI * frameCount / this.period);
  this.fill_alpha_osc = 0.0; //*  (this.amplitude / 3.75) * cos(TWO_PI * frameCount / this.fillperiod);

  if (this.local_force == true) {
    this.velocity = this.velocity_v2;
  }


  if (this.size_v2 > this.maxsize) {
    this.size_v2 -= this.resize;

  }


  if (this.lifespan >= 0.0 && this.lifespan <= 255 ) {
    this.lifespan += .5;
  }
  if (this.fill_alpha >= 0.0 && this.fill_alpha <= 255) {
    this.fill_alpha += .5;
  }

  if (pixelShaderToggle && this.fill_alpha > 30 && this.lifespan > 30 && this.local_force == false) {
    this.lifespan -= 2.0
    this.fill_alpha -= 2.0;
    //this.strokeweight += 1.0;
  }

  if (instruction_toggle) {
    this.local_force = false;
  } else {
    this.local_force = true;
  }


  // if (this.strokeweight > 1.0) {
  //   this.strokeweight -= 0.0;
  // }

  // if (this.position.x < 0) {
  //   this.velocity.mult(-1);
  // }
  // else if (this.position.x > width){
  //   this.velocity.mult(-1);
  // }
  //  else if (this.position.y < 0){
  //   this.velocity.mult(-1);
  //  }
  // else if (this.position.y > height){
  //   this.velocity.mult(-1);
  // }

  if (this.position.y < 0) {
    this.position.y = height;
  }

  if (this.position.y > height) {
    this.position.y = 0;
  }
  if (this.position.x < 0) {
    this.position.x = width;
  }

  if (this.position.x > width) {
    this.position.x = 0;
  }

}

// Method to display
display() {


  if (this.d > 0.05 && mouseIsPressed) {
    this.local_force = false;
  }

  this.fill_col.setAlpha(255);
  this.stroke_col.setAlpha(this.lifespan);

  push();
  noStroke();
  fill(this.fill_col);
  strokeWeight(this.strokeweight);
  rectMode(CENTER); //or rect?
  rect(this.position.x, this.position.y, (this.size_v2* this.aspect), this.size_v2);

  pop();
}

isDead() {
  if (reset == true) {
    return true;
  } else {
    return false;
  }
}
}
