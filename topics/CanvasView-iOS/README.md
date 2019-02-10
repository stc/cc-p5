# Template App that runs P5JS in full screen on iOS 

An XCode based project, for running sketches on iOS using [WKWebview](https://developer.apple.com/reference/webkit/wkwebview) for fast rendering. It loads a sketch into a fullscreen canvas, avoiding regular browser behaviours (zooming, bouncing, etc), so you can run your code without any OS level disruption. 

WKWebview also supports WebGL, so just call 

`createCanvas(windowWidth, windowHeight,WEBGL);`

in your 'sketch.js'. Read more on what you can do with P5JS & Webgle [here](https://github.com/processing/p5.js/wiki/Getting-started-with-WebGL-in-p5) 
