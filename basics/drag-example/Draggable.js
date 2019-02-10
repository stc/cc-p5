//  Ported from Dan Shiffman's Learning Processing book

function Draggable(tempX, tempY, tempW, tempH) {
  this.dragging = false; // Is the object being dragged?
  this.over = false; // Is the mouse over the ellipse?
  
  this.x = tempX;
  this.y = tempY;
  this.w = tempW;
  this.h = tempH;
  this.offsetX = 0;
  this.offsetY = 0; 

  // Method to display
  Draggable.prototype.display = function() {
    noStroke();
    
    if (this.dragging) fill (50);
    else if (this.over) fill(100);
    else fill(175,200);
    noStroke();
    rect(this.x,this.y,this.w,this.h);
    fill(255);
    textAlign(CENTER);
    text("Drag me", this.x + this.w / 2, this.y + this.h / 2);
  }

  // Is a point inside the rectangle (for click)?
  Draggable.prototype.clicked = function(mx, my) {
    if (mx > this.x && mx < this.x + this.w && my > this.y && my < this.y + this.h) {
      this.dragging = true;
      // If so, keep track of relative location of click to corner of rectangle
      this.offsetX = this.x-mx;
      this.offsetY = this.y-my;
    }
  }
  
  // Is a point inside the rectangle (for rollover)
  Draggable.prototype.rollover = function(mx, my) {
    if (mx > this.x && mx < this.x + this.w && my > this.y && my < this.y + this.h) {
      this.over = true;
    } else {
      this.over = false;
    }
  }

  // Stop dragging
  Draggable.prototype.stopDragging = function() {
    this.dragging = false;
  }
  
  // Drag the rectangle
  Draggable.prototype.drag = function(mx, my) {
    if (this.dragging) {
      this.x = mx + this.offsetX;
      this.y = my + this.offsetY;
    }
  }

}

