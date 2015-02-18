var canplay = true;
var s1, s2, s3, s4, s5, s6;

function setup() {
  createCanvas(800,600);
  s1 = new soundObject(100,100,80,1,"C");
  s2 = new soundObject(200,100,80,1.2,"Eb");
  s3 = new soundObject(300,100,80,1.35, "F");
  s4 = new soundObject(400,100,80,1.5, "G");
  s5 = new soundObject(500,100,80,1.67, "A");
  s6 = new soundObject(600,100,80,1.8, "B");
}

function draw() {
	background(255);
  s1.draw();
  s2.draw();
  s3.draw();
  s4.draw();
  s5.draw();
  s6.draw();
}

function soundObject(_xposition, _yposition, _size, _pitch, _name) {  
  this.xposition = _xposition;
  this.yposition = _yposition;
  this.size = _size;
  this.pitch = _pitch;
  this.name = _name;
  this.string = loadSound("string.mp3");
  this.canplay = false;  
  

  soundObject.prototype.draw = function(){
    fill(0);
    rect(this.xposition,this.yposition, this.size, this.size);
    fill(255);
    noStroke();
    text(this.name,this.xposition + this.size/2,this.yposition + this.size/2);

    if( (mouseX > this.xposition && mouseX < this.xposition + this.size) &&
      (mouseY > this.yposition && mouseY < this.yposition + this.size) ) {
      this.string.rate(this.pitch);
      if(this.canplay) {
        this.string.play();
      }

      this.canplay = false;
    }else{
      this.canplay = true;
    }
  }
}









