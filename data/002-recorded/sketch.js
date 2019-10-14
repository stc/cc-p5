
var table;
var lat;
var lon;
var pops;
var lab;

var myFont;

let data = [];

function preload() {
  table = loadTable("data/huncitiespop.csv", "csv", "header");
  myFont = loadFont('data/DinBold.ttf');
}

function setup () {
  createCanvas(windowWidth, windowHeight);
  background(60);
  
  textFont(myFont);
  textSize(26);

  // get different columns from CSV, based on header names
  lat = table.getColumn("Latitude");
  lon = table.getColumn("Longitude");
  pops = table.getColumn("Population");
  lab = table.getColumn("AccentCity");

  // mapping values into useful boundaries
  var minLat = getMinOfArray(lat);
  var maxLat = getMaxOfArray(lat);

  var minLon = getMinOfArray(lon);
  var maxLon = getMaxOfArray(lon);

  var minPop = getMinOfArray(pops);
  var maxPop = getMaxOfArray(pops);

  for(var i=0; i<table.getRowCount(); i++) {
    var d = new DataPoint();
    d.setPos( createVector( map( lon[i], minLon, maxLon, 0, width ), map(lat[i],maxLat,minLat,0,height ) ) ).setSize( map( pops[i], minPop, maxPop, 4, 100) ).setCol( map( pops[i], minPop, maxPop/100, 10, 200), 0, 0, map( pops[i], minPop, maxPop/100, 30, 200) ) ; 
    d.setLabel( lab[i] );
    data.push(d);
  }

}

function windowResized () {
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
  background(255);
  var v = createVector(mouseX, mouseY);
  
  for(var d in data) {
    data[d].drawRect();
  }

  for(var d in data) {
    if(data[d].pos.dist(v) < 10) {
      var txt = data[d].label;
      var w = textWidth(txt);
      fill(200);
      rect(data[d].pos.x-10,data[d].pos.y-30,w*1.4,40);
      fill(0);
      text(txt, data[d].pos.x, data[d].pos.y);
      return;
    }
  }
}

function getMaxOfArray(numArray) {
  return Math.max.apply(null, numArray);
}

function getMinOfArray(numArray) {
  return Math.min.apply(null, numArray);
}

class DataPoint {
  constructor() {
    this.pos = createVector(0,0);
    this.label = "";
    this.color = color(255);
    this.size = 1;
  }
  
  drawPoint() {
    noStroke();
    fill(this.color);
    ellipse(this.pos.x, this.pos.y, this.size, this.size);  
  }

  drawRect() {
    noStroke();
    fill(this.color);
    rect(this.pos.x- this.size/2, this.pos.y-this.size/2, this.size, this.size);  
  }

  drawLabel() {
    noStroke();
    fill(this.color);
    textSize(18);
    text(this.label, this.pos.x, this.pos.y);  
  }

  setLabel(l) {
    this.label = l;
    return this;
  }

  setPos(p) {
    this.pos = p;
    return this;
  }

  setCol(r,g,b,a) {
    this.color = color(r,g,b,a);
    return this;
  }

  setSize(s) {
    this.size = s;
    return this;
  }
}




