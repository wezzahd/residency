var COLOR_PALETTE = PALETTES[Math.floor(Math.random()*PALETTES.length)]

var WIDTH = window.innerWidth;
var HEIGHT = window.innerHeight;

var packed_squares = [];
var max_size = 150;
//let square;

function setup() {
	createCanvas(WIDTH, HEIGHT);
	rectMode(CENTER);
	noFill();
	noStroke();
background(29);
	//square = new PackedSquare(0, 0, 1,1);

// 	for (var i = 0; i < 10; i++){
//
// 		let x = random(width);
// 		let y = random(height);
// //console.log(x,y);
// 		let sizex = int(random(100,150));
// 		let sizey = sizex * 9/16;
//
// 		square = new PackedSquare(x, y, sizex,sizey);
// 		square.resize();
// 		if (!square.is_colliding()) {
// 			square.display();
// 			packed_squares.push(square);
// 		}
// 	}
}

function draw() {

	x = random(width);
	y = random(height);



	let sizex = 100;
	let sizey = 100 * 9/16;

 square = new PackedSquare(x, y, sizex,sizey);
//  if (packed_squares.length > 0){
//  	square.update();
// //	square.display();
	square.resize();
// // //	console.log(packed_squares.length);
//  }

	if (!square.is_colliding()) {
 	square.display();
		packed_squares.push(square);
	}
}

 function mousePressed() {

	 let x = mouseX;
	 let y = mouseY;
//console.log(x,y);
	 let sizex = 150;
	 let sizey = sizex * 9/16;

	 square = new PackedSquare(x, y, sizex,sizey);
	 square.resize();
	 if (!square.is_colliding()) {
		 square.display();
		 packed_squares.push(square);
	 }

	 console.log(packed_squares.length);
// 	x = mouseX;
// 	y = mouseY;
//
// 	let sizex = 100;
// 	let sizey = 100 * 9/16;
//
// 	square = new PackedSquare(x, y, sizex,sizey);
 }
