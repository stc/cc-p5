function setup() {
  createCanvas(windowWidth,windowHeight);
  background(255);
}

function draw() {
	noStroke();
	fill(0);
  	for(var i=0; i<touches.length; i++) {
  		ellipse(touches[i].x,touches[i].y,10,10);
  	}

}