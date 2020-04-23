let particlecount;

class ParticleSystem {
  constructor(position, img_) {
    this.origin = position.copy();
    this.particles = [];
  }

  addParticle(x, y, rand, img, devWidth, devHeight) {
    if (x !== undefined && y !== undefined) {
      this.particles.push(new Particle(x, y, rand, img, devWidth, devHeight));
      particlecount = this.particles.length;
    } else {
      this.particles.push(new Particle(this.origin.x, this.origin.y));
    }
  }

  run() {
    for (let particle of this.particles) {
      particle.run();
    }

    // Filter removes any elements of the array that do not pass the test
    this.particles = this.particles.filter(particle => !particle.isDead());
  }

  applyForce(f) {
    for (let particle of this.particles) {
      particle.applyForce(f);
    }
  }

  intersection() {

    // let boundary = new Rectangle(0, 0, width, height);
    // let qtree = new QuadTree(boundary, 4);
    //
    // for (let particle of this.particles) {
    //   let point = new Point(particle.position.x, particle.position.y, particle);
    //   qtree.insert(point);
    //
    //
    //   let range = new Rectangle(particle.position.x, particle.position.y,
    //     particle.size_v2 * 2, particle.size_v2 * 2);
    //   let points = qtree.query(range);
    //
    //   for (let point of points) {
    //     let other = point.userData;
    for (let particle of this.particles) {
  //    particle.align(this.particles);
  // particle.cohesion(this.particles);
  // particle.separation(this.particles);

   // var align = particle.align(this.particles);
   //  align.mult(1.0);
      //particle.applyForce(align);

        var cohesion = particle.cohesion(this.particles);
         cohesion.mult(0.01);
         particle.acceleration.add(cohesion);

            //  var separation = particle.separation(this.particles);
            // separation.mult(1.);
          //   particle.applyForce(separation);

   //   }

      //   if (particle !== other && particle.align(other)) {
      //     var align = particle.align(other);
      //     align.mult(alignSlider.value());
      //     particle.applyForce(align);
      //   }
      //
      //
      //
      //   if (particle !== other && particle.cohesion(other)) {
      //     var cohesion = particle.cohesion(other);
      //     cohesion.mult(cohesionSlider.value());
      //     particle.applyForce(cohesion);
      //   }
      //
      //   if (particle !== other && particle.separation(other)) {
      //     var separation = particle.separation(other);
      //     separation.mult(separationSlider.value());
      //     particle.applyForce(separation);
      //   }
      //
       }
    }



  behaviors() {
    for (let particle of this.particles) {
      particle.behaviors(mouseX, mouseY);

    }
  }


  return_home() {
    for (let particle of this.particles) {
      particle.velocity.x = 0.0;
      particle.velocity.y = 0.0;
      particle.acceleration.x = -0.1 * (particle.position.x - particle.home.x);
      particle.acceleration.y = -0.1 * (particle.position.y - particle.home.y);
    }
  }

  applyRepeller(r) {
    for (let particle of this.particles) {
      if (particle.local_force == true) {
        let force = r.repel(particle);
        particle.applyForce(force);
      }
    }

  }

}
