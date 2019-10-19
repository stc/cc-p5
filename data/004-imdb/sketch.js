
var mData;
var mFont;

let data = [];

function preload() {
  mData = loadJSON("data/imdb-top1000.json");
  myFont = loadFont('data/DinBold.ttf');
}

function setup () {
  createCanvas(windowWidth, windowHeight);
  textFont(myFont);
  textSize(26);
  console.log();
}

function windowResized () {
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
  background(255);
  for(let i=0; i<10; i++) {
    text(mData[i]["title_eng"], 100, 30 + i * 30);
  }
}