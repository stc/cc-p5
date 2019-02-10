// Simple Game of Life example from the P5JS site

var w;
var columns;
var rows;
var board;
var next;

function setup() {
    frameRate(60);
    background(0);
    createCanvas(windowWidth, windowHeight);
    
    w = 40;
    // Calculate columns and rows
    columns = floor(width/w);
    rows = floor(height/w);
    // Wacky way to make a 2D array is JS
    board = new Array(columns);
    for (var i = 0; i < columns; i++) {
        board[i] = new Array(rows);
    }
    // Going to use multiple 2D arrays and swap them
    next = new Array(columns);
    for (i = 0; i < columns; i++) {
        next[i] = new Array(rows);
    }
    init();
}

function draw() {
    background(34,58,92);
    
    if(frameCount%4 == 0) generate();
    for ( var i = 0; i < columns;i++) {
        for ( var j = 0; j < rows;j++) {
            if ((board[i][j] == 1)) fill(255,145,162);
            else fill(34,58,92);
            stroke(255,145,162,100);
            rect(i*w, j*w, w-1, w-1);
        }
    }
    fill(255,200);
    noStroke();
    for(var i = 0; i < touches.length; i++) {
        ellipse(touches[i].x, touches[i].y, 100, 100);
    }
    
    fill(212,252,255);
    textSize(30);
    text("FPS: " + int(frameRate()),20,40);
}
function mousePressed() {
    init();
}

function init() {
    for (var i = 0; i < columns; i++) {
        for (var j = 0; j < rows; j++) {
            // Lining the edges with 0s
            if (i == 0 || j == 0 || i == columns-1 || j == rows-1) board[i][j] = 0;
            // Filling the rest randomly
            else board[i][j] = floor(random(2));
            next[i][j] = 0;
        }
    }
}

function generate() {
    
    // Loop through every spot in our 2D array and check spots neighbors
    for (var x = 1; x < columns - 1; x++) {
        for (var y = 1; y < rows - 1; y++) {
            // Add up all the states in a 3x3 surrounding grid
            var neighbors = 0;
            for (var i = -1; i <= 1; i++) {
                for (var j = -1; j <= 1; j++) {
                    neighbors += board[x+i][y+j];
                }
            }
            
            // A little trick to subtract the current cell's state since
            // we added it in the above loop
            neighbors -= board[x][y];
            // Rules of Life
            if      ((board[x][y] == 1) && (neighbors <  2)) next[x][y] = 0;           // Loneliness
            else if ((board[x][y] == 1) && (neighbors >  3)) next[x][y] = 0;           // Overpopulation
            else if ((board[x][y] == 0) && (neighbors == 3)) next[x][y] = 1;           // Reproduction
            else                                             next[x][y] = board[x][y]; // Stasis
        }
    }
    
    // Swap!
    var temp = board;
    board = next;
    next = temp;
}
 

