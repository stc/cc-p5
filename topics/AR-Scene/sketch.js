
var detectedMarkers = [];

var capture;
var w = 640,
    h = 480;

function setup() {
    initAR();
}

function draw() {
    detectedMarkers = getMarkers();

    if(detectedMarkers !== undefined) {
        
        for(let i = 0; i< detectedMarkers.length; i++) {
            fill(255);
            text("found marker: " + detectedMarkers[i][0], 50,300 + i * 20);

            if(detectedMarkers[i][0] == 1) {
                background(196,236,255, mouseX);
            }
        }
    }
}

function drawStars() {
    for(var i = 0; i< planets.length; i++) {
      fill(255,150);
    noStroke();
    ellipse(planets[i].x,planets[i].y,planets[i].z,planets[i].z);
  }
}

function drawFigure() {
    fill(110,141,155,40);
  ellipse(width/2,height+width/2, width * 1.4, width * 1.4);

  image(body,width/2,height-height/4, body.width/2,body.height/2);
  
  translate(width/2,height/2);
  rotate( radians(sin(frameCount * 0.01) * 20) ); 
  image(head,0,0,head.width/2,head.height/2);
}
