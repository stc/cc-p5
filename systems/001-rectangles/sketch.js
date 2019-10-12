const rectangles = [];

function setup () {
  createCanvas(windowWidth, windowHeight);
  noLoop();
  
  const rectangleCount = 10;
  for (let i = 0; i < rectangleCount; i++) {
    const shrink = 0.5;
    const position = [
      random(-1, 1) * shrink,
      random(-1, 1) * shrink
    ];
    const scale = random(0.5, 1);
    const size = [
      random(0, 1) * scale,
      random(0, 1) * scale
    ];
    rectangles.push({
      position,
      size
    });
  }
}

function windowResized () {
  resizeCanvas(windowWidth, windowHeight);
}

function draw(){
  background(255);
  
  strokeJoin(MITER);
  rectMode(CENTER);
  noFill();
  stroke(0);

  const minDim = Math.min(width, height);
  
  for( r of rectangles) {
    let [ x, y ] = r.position;
    let [ w, h ] = r.size;
    
    push();
    translate(width / 2, height / 2);
    scale(minDim / 2, minDim / 2);
    strokeWeight(0.015);
    rect(x, y, w, h);
    pop();
  }
}