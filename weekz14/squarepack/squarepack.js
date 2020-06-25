class PackedSquare {

	constructor(x, y, size_x, size_y) {
		this.x = x;
		this.y = y;
		this.size_x = size_x;
    this.size_y = size_y;
    this.origsize_x = size_x*2;
    this.origsize_y = size_y*2;
		this.color = color(COLOR_PALETTE[parseInt(random(10000)) % 5]);
	}

	get radius_x() {
		return this.size_x / 2;
	}

  get radius_y() {
		return this.size_y / 2;
	}


  update(){
    if (this.origsize_x > this.size_x) {
      this.origsize_x -= 0.5;
      console.log(this.origsize_x);
    }
    if (this.origsize_y > this.size_y) {
      this.origsize_y -= 0.5;
    }
  }

	display() {
		fill(17, 17, 17, 50);
		var shadow_lengthx = map(this.size_x, 10, max_size, 5, 40);
    var shadow_lengthy = map(this.size_y, 10, max_size, 5, 40);
		rect(this.x + shadow_lengthx, this.y + shadow_lengthy, this.size_x, this.size_y);
		fill(this.color);
		rect(this.x, this.y, this.size_x, this.size_y);
	}

	get_x_range() {
		return [this.x - this.radius_x, this.x + this.radius_x];
	}

	get_y_range() {
		return [this.y - this.radius_y, this.y + this.radius_y];
	}

	is_colliding_with(square) {
		var [x0, x1] = square.get_x_range();
		var [y0, y1] = square.get_y_range();

		if (x0 < this.x && this.x < x1 && y0 < this.y && this.y < y1) {
			return true;
		}

		var diff_x = Math.abs(square.x - this.x);
		var diff_y = Math.abs(square.y - this.y);

		var min_diff_x = square.radius_x + this.radius_x;
    var min_diff_y = square.radius_y + this.radius_y;
		if (diff_x < min_diff_x && diff_y < min_diff_y) {
			return true
		}
		return false;
	}

	is_colliding() {
		for (var square of packed_squares) {
			if (this.is_colliding_with(square)) {
				return true
			}
		}
		return false
	}

	resize() {
		console.log('resize');
		while (this.is_colliding() && this.size_x > 10 && this.size_y > 10 ) {
			this.size_x *= 0.5;
      this.size_y *= 0.5;
		}
	}

}
