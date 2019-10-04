function setup () {
  createCanvas(windowWidth, windowHeight);
}

function windowResized () {
  resizeCanvas(windowWidth, windowHeight);
}

function draw(){
  background(255);
  
  const px = width / 2;
  const py = height / 2;
  
  const minDim = min(width, height);
  const size = minDim * 0.5;
  
  const time = millis() / 1000;
  const duration = 5;  
  const playhead = time / duration % 1;
  const anim = sin(playhead * PI * 2) * 0.5 + 0.5;
  
  const thickness = minDim * 0.1 * anim;
  
  noFill();
  stroke(0);
  strokeWeight(thickness);
  ellipse(px, py, size, size);
}