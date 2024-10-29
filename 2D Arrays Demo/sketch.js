//Insert your Comment Header here.

let NUM_ROWS = 4;
let NUM_COLS = 5;
let rectWidth, rectHeight;
let currentRow, currentCol;
let grid = [];
let gridData = [];

function setup() {
  // Determine the size of each square. Could use windowHeight,windowHeight  for Canvas to keep a square aspect ratio
  createCanvas(windowWidth, windowHeight);
  rectWidth = width/NUM_COLS;
  rectHeight = height/NUM_ROWS;
  randBoard();
  textSize(50);
  textAlign(CENTER);
}

function randBoard(){
  for(let i = 0; i<NUM_ROWS; i++){
    for(let j = 0; j<NUM_COLS; j++){
      pick = Math.round(random())
      if(pick===0){
        grid.push(255);
      }
      else{
        grid.push(0);
      }
    }
    gridData.push(grid);
    grid = [];
  }
}

function draw() {
  background(220);
  determineActiveSquare();   //figure out which tile the mouse cursor is over
  drawGrid();
  winCheck();
  coloredOverlay()                //render the current game board to the screen (and the overlay)
}

function winCheck(){
  let adder = 0;
  for(let i = 0; i<4; i++){
    for(let j = 0; j<gridData[i].length; j++){
      adder+=gridData[i][j];
    }
  }
  if(adder===0 || adder===20*255){
    fill(255,0,0);
    text("YOU WIN", windowWidth/2,windowHeight/2);
  }
}

function coloredOverlay(){
  fill(0,255,0,50);
  rect(currentCol, currentRow, rectWidth, rectHeight);
  rect(currentCol-1, currentRow, rectWidth, rectHeight);
  rect(currentCol+1, currentRow, rectWidth, rectHeight);
  rect(currentCol, currentRow-1, rectWidth, rectHeight);
  rect(currentCol, currentRow+1, rectWidth, rectHeight);
}


function mousePressed(){
  // cross-shaped pattern flips on a mouseclick. Boundary conditions are checked within the flip function to ensure in-bounds access for array
  if(keyIsDown(16)===true){
    flip(currentCol, currentRow);
  }
  else{
    flip(currentCol, currentRow);
    flip(currentCol-1, currentRow);
    flip(currentCol+1, currentRow);
    flip(currentCol, currentRow-1);
    flip(currentCol, currentRow+1);
  }
}

function flip(col, row){
  // given a column and row for the 2D array, flip its value from 0 to 255 or 255 to 0
  // conditions ensure that the col and row given are valid and exist for the array. If not, no operations take place.
  if (col >= 0 && col < NUM_COLS ){
    if (row >= 0 && row < NUM_ROWS){
      if (gridData[row][col] === 0) gridData[row][col] = 255;
      else gridData[row][col] = 0;
    }
  }
}

function determineActiveSquare(){
  // An expression to run each frame to determine where the mouse currently is.
  currentRow = int(mouseY / rectHeight);
  currentCol = int(mouseX / rectWidth);
}

function drawGrid(){
  // Render a grid of squares - fill color set according to data stored in the 2D array
  for (let x = 0; x < NUM_COLS ; x++){
    for (let y = 0; y < NUM_ROWS; y++){
      fill(gridData[y][x]); 
      rect(x*rectWidth, y*rectHeight, rectWidth, rectHeight);
    }
  }
}