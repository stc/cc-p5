function setup () {
  createCanvas(windowWidth, windowHeight);
  noLoop();
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

  const step = 25;
  const gridSize = 400;

  push();

  translate(width/2 - gridSize/2, height/2 - gridSize/2);
  for(let x =0; x < gridSize; x = x + step) {
    for(let y = 0; y < gridSize; y = y + step) {
      drawRandomLine(x, y, step);
    }
  }
  pop();
  
}

function drawRandomLine(x, y, step) {
  if(random() > 0.5) {
    line(x,y, x + step, y + step);
  } else {
    line(x + step, y, x, y + step);
  }
}