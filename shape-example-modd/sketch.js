var img;
var flower;


function setup() {
  createCanvas(800,400);
  img = loadImage("images/torony.png");
  flower = loadImage("images/flower.png");
}

function draw() {
	background(255);
 	arrow(150, 200, 100, mouseX);
 	ellipse(150, 100, 50, 50);
 	line(100, 300, 200, 300);

 	

 	//	conditionals to check if mouse is over a specific point
 	if(dist(mouseX,mouseY,150,100) < 50){
 		image(img,width/2,10,100,100);
 		over(150,100,50);
 	}
 	else if(dist(mouseX,mouseY,150,200) < 50){
 		image(flower,width/2,10,100,100);
 		over(150,200,50);
 	}
 	else if(dist(mouseX, mouseY, 150,300) < 50){
 		
 		over(150,300,50);
 	}else{
 		
 	}
}

//	function to draw arrow
function arrow(xposition, yposition, size, angle){
	push();
	//	needed for rotation
	translate(xposition,yposition);
	rotate(radians(angle));
	translate(-xposition,-yposition);
	
	line(xposition + size / 2 - size / 10, yposition - size / 20, xposition + size / 2,yposition);
	line(xposition - size / 2, yposition, xposition + size / 2, yposition);
	line(xposition + size / 2 - size / 10, yposition + size / 20, xposition + size / 2,yposition);
	
	pop();
}

//	draw this if mouse gets over to a point
function over(xposition, yposition, area){
	fill(255,0,0,20);
 	noStroke();
 	ellipse(xposition,yposition,area*2,area*2);
}