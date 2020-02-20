function Block(x, y, w, h, e, s, a, g, gp) {
    this.x = x;
    this.y = w;
    this.width = w;
    this.height = h;
    this.express = e;
    this.score = s;
    this.age = a;
    this.gender = g;
    this.genderprob = gp;
    this.color = color(255,0,0);





    this.display = function() {

      noFill();
      stroke(this.color);
      noFill();
      rect(this.x,this.y,this.width,this.height);
      noStroke();
      fill(this.color);
      textSize(12);
      text(this.express, ((this.x+this.width+ 10)- ((this.x+this.width+ 10)/2)), (this.y+this.height +10));
      text(int(this.score*100)+"% confidence", ((this.x+this.width+ 10)- ((this.x+this.width+ 10)/2)), (this.y+this.height +30));
      text("age:"+ int(this.age),((this.x+this.width+ 10)- ((this.x+this.width+ 10)/2)), (this.y+this.height +50));
      text(this.gender, ((this.x+this.width+ 10)- ((this.x+this.width+ 10)/2)), (this.y+this.height +70));

    }
  }
