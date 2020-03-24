// 2020 Franz Flückiger
// Interaction between p5js and glsl inspired by Jason Labbe

const numCircles = 1;
const maxradius = 0.08;
const minradius = 0.01;
let circles = []
let myShader
let shaderBuffer

function setup() {
	let w = min(600, max(300, windowWidth))
	let h = min(600, max(400, windowHeight))
	createCanvas(w, h, WEBGL);
	background(0)
	myShader = createShader(vs, fs)
	noStroke()
	for(let i=0; i<numCircles; i++) {
		circles.push(new Circle())
	}
}

function draw() {
	 for(let i=0; i<circles.length; i++) {
		 circles[i].move(3563478*i+frameCount/500, sin(143578*i+frameCount/687), cos(498738*i+frameCount/767), -876914*i+frameCount/681)
	 }

	 shader(myShader);
 	 myShader.setUniform ('u_resolution', [1, width/height]);
 	 myShader.setUniform ('u_mouse', [mouseX/width, mouseY/height]);
   myShader.setUniform('u_time', millis() / 1000);
	 let positions = circles.reduce((arr, c) => arr.concat(c.pos), [])
	 let emits = circles.reduce((arr, c) => arr.concat(c.emit), [])
	 let radii = circles.reduce((arr, c) => arr.concat(c.radius), [])
	 let cols = circles.reduce((arr, c) => arr.concat(c.col), [])
	 console.log(u_mouse);
   myShader.setUniform ('u_circlePos', positions);
   myShader.setUniform ('u_circleRadius', radii);
   myShader.setUniform ('u_circleEmit', emits);
   myShader.setUniform ('u_circleCol', cols);
   quad(-1, -1, 1, -1, 1, 1, -1, 1);
}

function Circle() {
	this.pos = []
	this.radius = 0
	this.emit = 0
	this.col = [0,0,0]

	this.move = (a, b, c, d) => {
		this.pos = [noise(a,b), noise(-b,d)]
		this.emit = noise(d,-b,a)
		this.radius = map(noise(d,c), 0, 1, minradius, maxradius)
		this.col = [noise(b,a)/1, 0.3, noise(d,-a)/1]
	}
}
