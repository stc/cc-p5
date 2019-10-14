let mic, fft;
let sliderSpeed, sliderSpeedLabel;
let sliderSize, sliderSizeLabel;
let speed;

function setup () {
  createCanvas(windowWidth, windowHeight);
  mic = new p5.AudioIn();
  mic.start();
  fft = new p5.FFT(0.9,256);
  fft.setInput(mic);

  // min, max, value, step
  sliderSpeed = createSlider(0, 0.01, 0.001, 0);
  sliderSpeed.position(20, 20);
  sliderSpeedLabel = createDiv('speed');
  sliderSpeedLabel.position(180,20);

  sliderSize = createSlider(1, 10, 1, 0);
  sliderSize.position(20, 40);
  sliderSizeLabel = createDiv('size');
  sliderSizeLabel.position(180,40);
  
  background(255);
  speed = 0.001;
}

function windowResized () {
  resizeCanvas(windowWidth, windowHeight);
}

function draw(){
  let spectrum = fft.analyze();
  let s = sliderSpeed.value();

  speed += s;

  push();
  translate(width/2, height/2);
  rectMode(CENTER);
  noStroke();
  rotate(speed);
  for (i = 0; i < spectrum.length; i++) {
    fill(255 - spectrum[i]);
    rect(i*sliderSize.value(),0,sliderSize.value(),sliderSize.value());
    
  }
  pop();
}

