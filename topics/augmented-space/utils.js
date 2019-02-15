var debug = true;
var capture;
var w = 640,
    h = 480;

var videoCanvas;
var overlayCanvas;
var raster, param, pmat, resultMat, detector;

var img;

var s = function(p) {
    p.setup = function() {
        initAR();
    }

    p.draw = function() {
        p.image(capture, 0, 0, w, h);
        img = p.copy(capture,0,0,w,h,0,0,w,h);
        detectedMarkers = getMarkers(debug);
        p.noStroke();
        p.fill(0,200)
        p.rect(0,0,p.width,p.height);
    }

    function initAR() {
        p.pixelDensity(1); // this makes the internal p5 canvas smaller
        capture = p.createCapture({
            audio: false,
            video: {
                width: w,
                height: h
            }
        }, function() {
            console.log('capture ready.')
        });
        capture.elt.setAttribute('playsinline', '');
        videoCanvas = p.createCanvas(w,h);
        videoCanvas.id("vc");
        capture.size(w, h);
        capture.hide();
    
        raster = new NyARRgbRaster_Canvas2D(document.getElementById("vc"));
        param = new FLARParam(w, document.getElementById("vc").height);
        pmat = mat4.identity();
        param.copyCameraMatrix(pmat, 100, 10000);
        resultMat = new NyARTransMatResult();
        detector = new FLARMultiIdMarkerDetector(param, 2);
        detector.setContinueMode(true);
    }

    function getMarkers(debug) {
        var results = [];
        document.getElementById("vc").changed = true;
        var thresholdAmount = 128; 
        detected = detector.detectMarkerLite(raster, thresholdAmount);
        for (var i = 0; i < detected; i++) {
            let element = [];
            var id = detector.getIdMarkerData(i);
            var num = id._packet[1];
    
            detector.getTransformMatrix(i, resultMat);
    
            var mat = resultMat;
            var cm = mat4.create();
            cm[0] = mat.m00, cm[1] = -mat.m10, cm[2] = mat.m20, cm[3] = 0;
            cm[4] = mat.m01, cm[5] = -mat.m11, cm[6] = mat.m21, cm[7] = 0;
            cm[8] = -mat.m02, cm[9] = mat.m12, cm[10] = -mat.m22, cm[11] = 0;
            cm[12] = mat.m03, cm[13] = -mat.m13, cm[14] = mat.m23, cm[15] = 1;
            mat4.multiply(pmat, cm, cm);
    
            var q = 1;
            var verts = [
                vec4.create(-q, -q, 0, 1),
                vec4.create(q, -q, 0, 1),
                vec4.create(q, q, 0, 1),
                vec4.create(-q, q, 0, 1),
                //vec4.create(0, 0, -2*q, 1) // poke up
            ];
    
            var w2 = p.width / 2,
                h2 = p.height / 2;
            verts.forEach(function (v) {
                mat4.multiplyVec4(cm, v);
                v[0] = v[0] * w2 / v[3] + w2;
                v[1] = -v[1] * h2 / v[3] + h2;
            });
    
            var center = [];
            center[0] = (verts[0][0] + verts[1][0] + verts[2][0] + verts[3][0]) / 4;
            center[1] = (verts[0][1] + verts[1][1] + verts[2][1] + verts[3][1]) / 4;
            
            if(debug) {
                p.noStroke();
                p.fill(255,0,num*100);
                p.beginShape();
                verts.forEach(function (v) {
                    p.vertex(v[0], v[1]);
                });
                p.endShape();
    
                p.fill(255);
                p.ellipse(center[0],center[1],10,10);
    
                p.fill(0,200,200);
                p.textSize(40);
                p.textAlign(CENTER,CENTER);
                p.text(num,center[0],center[1]);
            }
    
            element.push(num, center[0], center[1]);
            results.push(element);
        }
        return(results);  
    } 
}

var myp5 = new p5(s, 'c1');
