let width = screen.width, height = screen.height;
let uni;

function setup() {
	createCanvas(width, height, WEBGL);
	uni = new Universe();
	uni.create();
}

function draw() {
	background(0);
	lights();
	uni.run();
}

function mousePressed() {
	uni.camera.acc();
}

function keyTyped() {
	if(key === 'r') return uni.remake();
	uni.spam(Number(key));
}