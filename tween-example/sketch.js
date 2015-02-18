//  Tween example / Visual Programming Class, MOME 2015
var x, y;

function setup() {
  createCanvas(1280,720); 
  background(255);
  
  //  Tween is the other file this sketch refers to
  x = new Tween(width/2,.5,.9);   //  starting position, damping, attraction  
  y = new Tween(height/2,.5,.9);  //  starting position, damping, abstraction
}

function draw() {
  //  we have to update the values of the tweens in every frame
  x.update();
  y.update();

  background(255); 
  
  fill(0,0,0);
  //  draw an ellipse to the values of the tweens
  ellipse(x.value,y.value,20,20);
}

function mousePressed(){
  //  set new targets to tween to
  x.target(mouseX);
  y.target(mouseY);
}

