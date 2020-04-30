// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain

// QuadTree
// https://www.youtube.com/watch?v=z0YFFg_nBjw

// For more:
// https://github.com/CodingTrain/QuadTree

class Particle {
  constructor(x, y) {
    this.position = createVector(x,y);
    this.velocity = createVector(random(-1,1),random(-1,1));
    this.acceleration = createVector();
    this.r = width/int(random(16,32));
    this.highlight = false;
    this.rand = random(0,100);
    this.randaspect = int(random(1,10));
  }

  intersects(other) {
    let d = dist(this.position.x, this.position.y, other.position.x, other.position.y);
    return (d < this.r + other.r);
  }

  setHighlight(value) {
    this.highlight = value;
  }

  colour() {

  //   if (this.rand > 0 && this.rand < 50) {
  //     this.c = color(96, 199, 108,150);
  // } else if (this.rand > 50 && this.rand < 75) {
  //     this.c = color(23, 73, 219,150);
  // }else{
  //   this.c = color(224, 58, 86,150);
  // }

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




  }




  move() {

  this.position.add(this.velocity);
  this.velocity.add(this.acceleration);
  this.acceleration.mult(0);
  //this.lifespan -= 0.0;
  this.velocity.limit(2);
  }

edges() {

  if (this.position.x < 0) {
    this.velocity.mult(-1);
  }
  else if (this.position.x > width){
    this.velocity.mult(-1);
  }
   else if (this.position.y < 0){
    this.velocity.mult(-1);
   }
  else if (this.position.y > height){
    this.velocity.mult(-1);
  }
}


  render() {
    //push();
noStroke();
    //stroke(0);
    strokeWeight(10);
    //rotate(radians(45));
    if (this.highlight) {
      fill(this.c);
    } else {
      fill(this.c);
    }
    if (this.randaspect %2 == 0 ){
    this.aspect = 16/9;
  }else{
    this.aspect = 9/16;
  }

    rect(this.position.x, this.position.y, this.r * 2* this.aspect, this.r* 2);
    //pop();
  }

}
