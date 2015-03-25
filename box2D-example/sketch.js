/*

	Based on Daniel Shiffmann's Nature of Code P5JS examples:
	https://github.com/shiffman/The-Nature-of-Code-Examples-p5.js

*/

// A reference to our box2d world
var world;

var gravityX = 10;
var gravityY = 5;

// A list we'll use to track fixed objects
var boundaries = [];

// A list for all of our moving objects 
var pops = [];

function setup() {
  createCanvas(1200,800);

  // Initialize box2d physics and create the world
  world = createWorld();

  // Add a bunch of fixed boundaries
  boundaries.push(new Boundary( width / 3, height-height / 3, width/4, 5, 0));
  boundaries.push(new Boundary( width / 2 + width / 4, height-height / 3, width/4, 5, 0));
  boundaries.push(new Boundary( width / 2, height / 2, 5, width / 8, 0));
  boundaries.push(new Boundary( width / 2 + width / 4 + width / 8, height/3, 5, height / 6, 0));
  boundaries.push(new Boundary( width / 3 - width / 8, height/2, 5, height / 3, 0));
}

function draw() {
  background(240);

  // We must always step through time!
  var timeStep = 1.0/30;
  // 2nd and 3rd arguments are velocity and position iterations
  world.Step(timeStep,10,10);

  // Display all the boundaries
  for (var i = 0; i < boundaries.length; i++) {
    boundaries[i].display();
  }

  // Display all the boxes
  for (var i = pops.length-1; i >= 0; i--) {
    pops[i].display();
    if (pops[i].done()) {
      pops.splice(i,1);
    }
  }
}

function mousePressed() {
  var p = new Element(mouseX,mouseY);
  pops.push(p);
}