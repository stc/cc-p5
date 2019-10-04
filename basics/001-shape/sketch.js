function setup () {
  createCanvas(windowWidth, windowHeight);
}

function windowResized () {
  resizeCanvas(windowWidth, windowHeight);
}

function draw(){
  background(255);
  
  noFill();
  strokeJoin(ROUND);
  stroke(0);
  
  const dim = Math.min(width, height);
  strokeWeight(dim * 0.015);
  
  const x = width / 2;
  const y = height / 2;
  
  const size = dim * 0.5;
  
  rectMode(CENTER);
  rect(x, y, size, size);
  
  ellipse(x, y, size, size);
  
  triangle(
    x, y - size / 2,
    x + size / 2, y + size / 2,
    x - size / 2, y + size / 2
  );
}
