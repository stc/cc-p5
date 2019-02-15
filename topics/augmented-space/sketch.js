var detectedMarkers = [];

var t = function(p) {
    p.setup = function() {
        overlayCanvas = p.createCanvas(p.windowWidth, p.windowHeight);
        overlayCanvas.id("oc");
    }

    p.draw = function() {
        clearCanvas();
        if(detectedMarkers !== undefined) {
            for(let i = 0; i< detectedMarkers.length; i++) {
                p.fill(255);
                p.text("found marker: " + detectedMarkers[i][0], 50,600 + i * 20);

                if(detectedMarkers[i][0] == 0) {
                    f1();
                }
                if(detectedMarkers[i][0] == 1) {
                    f2();
                }
                if(detectedMarkers[i][0] == 2) {
                    f3();
                }
            }
        }
    }

    function f1() {
        p.fill(255,0,255,100);
        p.rect(0,0,p.windowWidth,p.windowHeight);
    }

    function f2() {
        p.fill(255,255,0,100);
        p.rect(0,0,p.windowWidth,p.windowHeight);
    }

    function f3() {
        p.fill(0,255,255,100);
        p.rect(0,0,p.windowWidth,p.windowHeight);
    }
}

var myp5 = new p5(t, 'c2');

function clearCanvas() {
    const context = document.getElementById("oc").getContext('2d');
    context.clearRect(0, 0, overlayCanvas.width, overlayCanvas.height);
}





