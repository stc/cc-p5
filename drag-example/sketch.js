var d;

function setup() {
  createCanvas(800,600);

  // this is our draggable object that is implemented
  // in the Draggable.js file
  d = new Draggable(50,50,100,60);
}

function draw() {
	background(255);
	d.rollover(mouseX,mouseY);
  	d.drag(mouseX,mouseY);
  	d.display();
}

function mousePressed() {
	d.clicked(mouseX,mouseY);
}

function mouseReleased() {
	d.stopDragging();
}
