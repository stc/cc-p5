function setup () {
  createCanvas(windowWidth, windowHeight);
}

function windowResized () {
  resizeCanvas(windowWidth, windowHeight);
}

function draw(){
  background(255);
  
  const dim = Math.min(width, height);
  
  strokeJoin(ROUND);
  strokeWeight(dim * 0.015);
  stroke(0);
  noFill();
  
  const time = millis() / 1000;
  const duration = 7;
  const playhead = time / duration % 1;
  const rotation = playhead * PI * 2;
  
  const x = width / 2;
  const y = height / 2;

  const size = dim * 0.5;
  
  push();
  translate(x, y);
  rotate(rotation);
  
  rectMode(CENTER);
  rect(0, 0, size, size);

  pop();
}