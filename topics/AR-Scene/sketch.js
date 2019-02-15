var detectedMarkers = [];

var capture;
var w = 640,
    h = 480;

var r = 0;
var g = 0;
var b = 0;

function setup() {
    initAR();
}

function draw() {
    image(capture, 0, 0, w, h);
    detectedMarkers = getMarkers();

    if(detectedMarkers !== undefined) {
        for(let i = 0; i< detectedMarkers.length; i++) {
            fill(255);
            text("found marker: " + detectedMarkers[i][0], 50,300 + i * 20);

            if(detectedMarkers[i][0] == 0) {
                r = map( detectedMarkers[i][1], 0, w, 0, 255 );
            }

            if(detectedMarkers[i][0] == 1) {
                g = map( detectedMarkers[i][1], 0, w, 0, 255 );
            }

            if(detectedMarkers[i][0] == 2) {
                b = map( detectedMarkers[i][1], 0, w, 0, 255 );
            }
        }
    }
    

    fill(int(r), g, b);
    rect(0,0,100,100);
}
