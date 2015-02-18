//	store our positions in these
var xpositions = [];
var ypositions = [];

function setup() {
  createCanvas(displayWidth,displayHeight);
  
  //	generate random x, random y positions
  for (var i = 0; i < 100; i++){
  	xpositions[i] = random(width);
  	ypositions[i] = random(height);
  }
}

function draw() {
  background(255);

  //	draw an arrow to each stored position 
  for (var i = 0; i < 100; i++){
  	arrow(xpositions[i],ypositions[i],50,atan2(mouseY-ypositions[i], mouseX-xpositions[i]));
  }
}

//	function to draw arrow
function arrow(xposition, yposition, size, angle){
	push();
	//	needed for rotation
	translate(xposition,yposition);
	rotate(angle);
	translate(-xposition,-yposition);
	
	line(xposition + size / 2 - size / 10, yposition - size / 20, xposition + size / 2,yposition);
	line(xposition - size / 2, yposition, xposition + size / 2, yposition);
	line(xposition + size / 2 - size / 10, yposition + size / 20, xposition + size / 2,yposition);
	
	pop();
}




