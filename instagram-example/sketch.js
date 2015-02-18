
var img = [];
var tag = "";
var input, button;
var displaytext = "Type in a tag to search on Instagram";

function setup() {
  createCanvas(900,600);

  //	create user interface elements (text input & button)
  input = createInput();
  input.position(20,5);
  button = createButton('submit');	
  button.position(160,5);
  button.mousePressed(searchInsta);	//	if we press the button, call searchInsta function
}

function draw() {
	background(255);
	for(var i = 0; i< img.length; i++) {
		if(img[i]!=null) {
			img[i].filter("gray");
			image(img[i],i * 160,height/2-80);
		}
	}

	textAlign(CENTER);
  	fill(200);
  	textSize(40);
  	noStroke();
  	text(displaytext,width/2,height/2);
}

function searchInsta(){
	tag = input.value();
	var url = "https://api.instagram.com/v1/tags/" + tag + "/media/recent?client_id=41fc508443ae4954adbf453ec6265f1e";
	// if instagram responded with the image urls, call handleData function 
  	loadJSON(url, handleData);
  	
}

function handleData(jsonData) {
  // print number of found images into the console		
  console.log(jsonData.data.length);
  var pics = jsonData.data;

  // load the found images into our image array
  for (var i=0; i<pics.length; i++) {
    img[i] = loadImage(pics[i].images.thumbnail.url);
  }
  // clear loading text from the canvas
  displaytext = "";

}

