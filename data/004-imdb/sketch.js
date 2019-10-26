var mData;
var myFont;

var num = 20;
var gridSize = 30;

var minRank;
var maxRank;
var ranks = [];

function preload() {
  mData = loadJSON("data/imdb-top1000.json");
  myFont = loadFont('data/DinBold.ttf');
}

function setup () {
  createCanvas(windowWidth, windowHeight);
  textFont(myFont);
  textSize(26);

  for(var i=0; i< num * num; i++) {
    ranks.push( mData[i]["imdb_rating"] );
  }

  minRank = Math.min.apply(null, ranks);
  maxRank = Math.max.apply(null, ranks);
}

function windowResized () {
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
  background(255);
  colorMode(HSB);
  noStroke();

  var index = 0;  
  for(var i=0; i<num; i++) {
    for(var j = 0; j<num; j++) {
      
       var rank = map(mData[index]["imdb_rating"], minRank, maxRank, 60, 0);
       fill( rank, 255, 255 );
 
       var x = 100 + i * gridSize;
       var y = 100 + j * gridSize;
       
       rect( x, y, gridSize, gridSize );
       index += 1;
    }
   }

   fill(0);
   var gridIndex = 0;
   for(var i=0; i<num; i++) {
      for(var j = 0; j<num; j++) {
        var x = 100 + i * gridSize;
        var y = 100 + j * gridSize;
        
        if ( (mouseX > x && mouseX < x + gridSize) &&
            (mouseY > y && mouseY < y + gridSize) ) {
            text( mData[gridIndex]["title_eng"] + " ( " + 
                  mData[gridIndex]["imdb_rating"] + " )", mouseX + 30, mouseY );
        }
        gridIndex++;
    }
  }
  text("First " + num * num + " movies of IMDB database. \nColors are based on rating. Hover to see movie's title", 100, 40);
}
