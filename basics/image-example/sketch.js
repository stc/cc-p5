var img;

function setup() {
  createCanvas(800,600);
  img = loadImage("images/torony.png");
}

function draw() {
	//background(255);
  	// put drawing code here
  	image(img,0,0,mouseX,mouseY);
}