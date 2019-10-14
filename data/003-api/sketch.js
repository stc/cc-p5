let weather,
  cityName,
  country,
  weatherId,
  weatherDescription, 
  Cloudiness,
  humidity,
  windSpeed,
  windDeg,
  temp,
  visibility,
  windRatio;

let place = "Budapest";
let r = 0;

let epochUpdate, update, updateText;
let xDir, yDir, unit, countX, countY, size;

function preload() {
  var url =
    "https://api.openweathermap.org/data/2.5/weather?q="+place+"&units=metric&APPID=8bc33b55474e0525d2c28707ca934965&lang=en";
  weather = loadJSON(url);
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  updateWeather();

  unit = round(map(Cloudiness, 0, 100, 100, 40));
  countX = round(windowWidth / unit);
  countY = round(windowHeight / unit);
  size = round(windowWidth / countX);

  update = new Date(epochUpdate * 1000);
  updateText = update.getHours() + ":" + update.getMinutes();

}

function draw() {
  fill(0,60);
  rect(width/2, height/2, width, height);

  rectMode(CENTER);
  ellipseMode(CENTER);
  for (var x = 0; x < countX + 1; x++) {
    for (var y = 0; y < countY + 1; y++) {
      push();
      strokeWeight(1);
      stroke(0,30);
      noFill();
      translate(x * size, y * size);
      rotate(degrees(windDeg));
      translate(r += windSpeed/500,0);
      if(r >size) {
        r=0;
      }
      strokeWeight(3);
      stroke(255);
      point(0, size/2);
      pop();
    }
  }

  push();
  fill(255);
  textFont("Lato");
  textAlign(LEFT);
  textSize(48);
  text(temp + "°", 20, 60);
  textSize(14);
  fill(255,100);
  text(cityName + " / " + country + " / "+temp + "°", 20, height - 30);
  textAlign(CENTER);
  text(
    weatherDescription + " / " + weatherId + " / " + windSpeed + "m/s",
    width / 2,
    height - 30
  );
  textAlign(RIGHT);
  text(updateText, width - 20, height - 30);
  pop();
}


function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  countX = round(windowWidth / unit);
  countY = round(windowHeight / unit);
}

function updateWeather(){
  cityName = weather.name;
  country = weather.sys.country;
  weatherId = weather.weather[0].id;
  weatherDescription = weather.weather[0].description;
  temp = round(weather.main.temp);
  epochUpdate = weather.dt;
  Cloudiness = weather.clouds.all;
  windSpeed = weather.wind.speed;
  windRatio = windSpeed / 200;
  windDeg = weather.wind.deg;
  visibility = map(weather.visibility, 0, 10000, 0, 255);
  humidity = weather.main.humidity;
}