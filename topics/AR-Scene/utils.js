var raster, param, pmat, resultMat, detector;

function initAR() {
	pixelDensity(1); // this makes the internal p5 canvas smaller

    navigator.mediaDevices.enumerateDevices()
        .then(function(devices) {
          devices.forEach(function(device) {
            console.log(device.kind + ": " + device.label +
                " id = " + device.deviceId);
          });
        })
        .catch(function(err) {
          console.log(err.name + ": " + err.message);
        });

    var options = {
        audio: false,
     video: {

       optional: [
           //{ sourceId: 'ab4f083ffeade5009095edfc4346acda656765946be768dd4a7cc89728b038c8' }, // uncomment this, set device id for 2nd cam
           { width: w },
           {height: h},
           { frameRate: 60 }
       ],
     }
   };

    capture = createCapture(options);

    capture.elt.setAttribute('playsinline', '');
    createCanvas(w, h);
    capture.size(w, h);
    capture.hide();

    raster = new NyARRgbRaster_Canvas2D(canvas);
    param = new FLARParam(canvas.width, canvas.height);
    pmat = mat4.identity();
    param.copyCameraMatrix(pmat, 100, 10000);
    resultMat = new NyARTransMatResult();
    detector = new FLARMultiIdMarkerDetector(param, 2);
    detector.setContinueMode(true);
}

function getMarkers() {
	var results = [];
	canvas.changed = true;
    var thresholdAmount = 128; //select('#thresholdAmount').value() * 255 / 100;
    detected = detector.detectMarkerLite(raster, thresholdAmount);
    for (var i = 0; i < detected; i++) {
    	let element = [];
        var id = detector.getIdMarkerData(i);
        var num = id._packet[1];
        // read data from the marker
        // var id = detector.getIdMarkerData(i);

        // get the transformation for this marker
        detector.getTransformMatrix(i, resultMat);

        // convert the transformation to account for our camera
        var mat = resultMat;
        var cm = mat4.create();
        cm[0] = mat.m00, cm[1] = -mat.m10, cm[2] = mat.m20, cm[3] = 0;
        cm[4] = mat.m01, cm[5] = -mat.m11, cm[6] = mat.m21, cm[7] = 0;
        cm[8] = -mat.m02, cm[9] = mat.m12, cm[10] = -mat.m22, cm[11] = 0;
        cm[12] = mat.m03, cm[13] = -mat.m13, cm[14] = mat.m23, cm[15] = 1;
        mat4.multiply(pmat, cm, cm);

        // define a set of 3d vertices
        var q = 1;
        var verts = [
            vec4.create(-q, -q, 0, 1),
            vec4.create(q, -q, 0, 1),
            vec4.create(q, q, 0, 1),
            vec4.create(-q, q, 0, 1),
//            vec4.create(0, 0, -2*q, 1) // poke up
        ];

        // convert that set of vertices from object space to screen space
        var w2 = width / 2,
            h2 = height / 2;
        
        verts.forEach(function (v) {
            mat4.multiplyVec4(cm, v);
            v[0] = v[0] * w2 / v[3] + w2;
            v[1] = -v[1] * h2 / v[3] + h2;
        });

        var center = [];
        center[0] = (verts[0][0] + verts[1][0] + verts[2][0] + verts[3][0]) / 4;
        center[1] = (verts[0][1] + verts[1][1] + verts[2][1] + verts[3][1]) / 4;

        noStroke();
        fill(255);
        beginShape();
        verts.forEach(function (v) {
            vertex(v[0], v[1]);
        });
        endShape();
    	element.push(num, center[0], center[1]);
        results.push(element);
    }
    return results;
}
