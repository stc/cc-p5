var origin;
var diameter = 300;
var radius = diameter/2;
var p1, p2;
 
function setup() {
  createCanvas(displayWidth, displayHeight);
  background(255);
  colorMode(HSB, 360, 100, 100);
  origin = createVector(0,0);
  p1 = new Particle();
  p1.randomDirection();
  p2 = new Particle();
  p2.randomDirection();
  noStroke();
}
 
function draw () {
  translate(width/2, height/3);
  fill(180, 0, 0, 5);
  ellipse(0, 0, diameter, diameter);
  p1.update();
  p1.display();
  p2.update();
  p2.display();
}
 
function mousePressed() { 
  p1.randomDirection();
  p2.randomDirection(); 
}
 
function Particle() {
  this.vel;
  this.eSize;
  this.loc = createVector(random(-width/2, width/2), random(-height/2, height/2));
  this.loc.limit(radius-50);
  
  Particle.prototype.update = function() {
    this.loc.add(this.vel);
    var v = createVector(this.loc.x, this.loc.y);
    if (dist(v.x, v.y,origin.x,origin.y) > radius - this.eSize) {
      var n = createVector(this.loc.x,this.loc.y);
      n.normalize();
      n.mult(2*n.dot(this.vel));
      this.vel.sub(n);
    }
  }
 
  Particle.prototype.display = function() {
    fill(frameCount % 360, 100, 100);
    this.eSize = 12 + sin(frameCount * 0.05) * 6;
    ellipse(this.loc.x, this.loc.y, this.eSize, this.eSize);
  }
 
  Particle.prototype.randomDirection = function() {
    this.vel = createVector(random(-1, 1), random(-1,1));
    this.vel.normalize();
    this.vel.mult(1 + random(4));
  }
}