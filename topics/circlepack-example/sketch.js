
function setup() {	
	createCanvas(windowWidth,windowHeight);
	cp = new CirclePacking(width, height);

  	for (var i=0; i<30; i++){
    	cp.circles.push(new Circle(random(width), random(height), random(20) + 30, "O"));
  	}
}

function draw() {
  background(255);
  noStroke();
  cp.pack();
  cp.draw();
}

function windowResized() {
  resizeCanvas(floor(parent.width), floor(parent.height));
}

function Circle(_x, _y, _r, _label) {
    this.x = _x;
    this.y = _y;
    this.r = _r;
    this.label = _label;

  Circle.prototype.distance = function(_x1, _y1, _x2, _y2) {
    return sqrt((_x1-_x2)*(_x1-_x2)+(_y1-_y2)*(_y1-_y2));
  }

  Circle.prototype.getOffset = function(_x, _y) {
    return distance(this.x, this.y, _x, _y);
  }

  Circle.prototype.contains = function(_x, _y) { 
    return distance(this.x, this.y, _x, _y) <= this.r;
  }

  Circle.prototype.intersect = function(_circle) {
    var d = distance(this.x, this.y, _circle.x, _circle.y);
    return d <= (this.r + _circle.r);
  }

  Circle.prototype.draw = function() {
  	fill(0);
    ellipse(this.x, this.y, this.r*2, this.r*2);
    fill(255);
    textAlign(CENTER);
    text(this.label,this.x,this.y);
  }
}


//circle packing
function CirclePacking(_width, _height) {
    this.width = _width;
    this.height = _height;
    this.xcenter = width/2;
    this.ycenter = height/2;
    this.circles = [];
    this.padding = 40;
    this.damping = 0.05;
    this.iterations = 1;

  CirclePacking.prototype.fast_distance = function(_x1, _y1, _x2, _y2) {
    return (_x1 - _x2) * (_x1 - _x2) + (_y1 - _y2) * (_y1 - _y2);
  }

  CirclePacking.prototype.pack = function() {
    for (var i = 0; i < this.circles.length; i++) {
      var c1 = this.circles[i];

      for (var j = i+1; j < this.circles.length; j++) {
        var c2 = this.circles[j];

        var d = this.fast_distance(c1.x, c1.y, c2.x, c2.y);
        var r = c1.r + c2.r + this.padding;

        if (d < (r*r)) {
          var dx = c2.x - c1.x;
          var dy = c2.y - c1.y;
          var droot = sqrt(d);

          // proviamo a dare un peso rispetto al centro
          var cd1 = this.fast_distance(c1.x, c1.y, this.xcenter, this.ycenter);
          var cd2 = this.fast_distance(c1.x, c1.y, this.xcenter, this.ycenter);

          var total = dx + dy;

          var vx = (dx/droot) * (r-droot);
          var vy = (dy/droot) * (r-droot);

          c1.x -= vx * cd1/(cd1+cd2);
          c1.y -= vy * cd1/(cd1+cd2);
          c2.x += vx * cd2/(cd1+cd2);
          c2.y += vy * cd2/(cd1+cd2);
        }
      }
    }

    // contraction...
    //
    for (var i = 0; i < this.circles.length; i++) {
      var c = this.circles[i];
      var vx = (c.x - this.xcenter) * this.damping;
      var vy = (c.y - this.ycenter) * this.damping;
      c.x -= vx;
      c.y -= vy;
    }
    //
  }

  CirclePacking.prototype.update = function() {
    for (var w=0; w<iterations; w++) {
      this.pack();
    }
  }
  /**
   * Draw all the circles
   */

  CirclePacking.prototype.draw = function() {
    for (var i = 0; i < this.circles.length; i++) {
      var c = this.circles[i];
      if (c.r < 1){
        this.circles.remove(c);
      }
      else
      {
        c.draw();
      }
    }
  }
}


