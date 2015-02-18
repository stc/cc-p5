var containerx = [];
var containery = [];

function setup() {
  createCanvas(800,600);
}

function draw() {
	background(255);

	for(var i=0; i< 3; i++){
		for(var j=0; j<containerx.length-1; j++) {
			line(containerx[j] + i * 50,containery[j],containerx[j+1] + i * 50,containery[j+1]);
		}
	}
}

function mousePressed() {
	containerx.push(mouseX);
	containery.push(mouseY);	
}

function mouseMoved(){
	containerx.push(mouseX);
	containery.push(mouseY);
}