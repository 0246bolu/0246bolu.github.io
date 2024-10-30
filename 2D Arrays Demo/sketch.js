// Puzzle Game
// Lucas Boyd
// 10/30/2024
// Created two modes, square mode and cross mode, as well as added a colored overlay to tell the player what shapes will be changed

let NUM_ROWS = 4; // Creates global variables to be used or assigned as needed
let NUM_COLS = 5;
let rectWidth, rectHeight;
let currentRow, currentCol;
let grid = [];
let gridData = [];
let shapeMode = "cross";

function setup() { // Determines rectangle size according to window size, calls the board randomizer function and defines text characteristics
  createCanvas(windowWidth, windowHeight);
  rectWidth = width/NUM_COLS;
  rectHeight = height/NUM_ROWS;
  randBoard();
  textSize(75);
  textAlign(CENTER);
}

function randBoard(){ // Creates 4 arrays of 5 items, and then adds each of them to one 2d array (gridData)
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

function draw() { // Runs every frame, drawing the background and calling functions that need to run every frame
  background(220);
  determineActiveSquare();
  drawGrid();
  coloredOverlay();
  winCheck();             
}

function winCheck(){ // Parses through array to check if they are are all equal to 0 or 255, and if so, the message you win is diplayed
  let adder = 0;
  for(let i = 0; i<4; i++){
    for(let j = 0; j<gridData[i].length; j++){
      adder+=gridData[i][j];
    }
  }
  if(adder===0 || adder===20*255){
    fill(255,0,0);
    text("YOU WIN!", windowWidth/2,windowHeight/2);
  }
}

function coloredOverlay(){ // Creates a green translucent overlay on the shapes that would be effected if the user clicked
  fill(0,255,0,50);
  if(shapeMode==="cross"){
    rect(currentCol*rectWidth, currentRow*rectHeight, rectWidth, rectHeight);
    rect(currentCol*rectWidth+rectWidth, currentRow*rectHeight, rectWidth, rectHeight);
    rect(currentCol*rectWidth-rectWidth, currentRow*rectHeight, rectWidth, rectHeight);
    rect(currentCol*rectWidth, currentRow*rectHeight+rectHeight, rectWidth, rectHeight);
    rect(currentCol*rectWidth, currentRow*rectHeight-rectHeight, rectWidth, rectHeight);
    }
  else{
    rect(currentCol*rectWidth, currentRow*rectHeight, rectWidth, rectHeight);
    rect(currentCol*rectWidth+rectWidth, currentRow*rectHeight, rectWidth, rectHeight);
    rect(currentCol*rectWidth+rectWidth, currentRow*rectHeight-rectHeight, rectWidth, rectHeight);
    rect(currentCol*rectWidth, currentRow*rectHeight-rectHeight, rectWidth, rectHeight);
  }
}
 

function mousePressed(){ // Flips rectangles based on shapeMode and whether or not shift is being held
  if(keyIsDown(16)===true){
    flip(currentCol, currentRow);
  }
  else if(shapeMode==="cross"){
    flip(currentCol, currentRow);
    flip(currentCol-1, currentRow);
    flip(currentCol+1, currentRow);
    flip(currentCol, currentRow-1);
    flip(currentCol, currentRow+1);
  }
  else{
    flip(currentCol, currentRow);
    flip(currentCol+1, currentRow);
    flip(currentCol+1, currentRow-1);
    flip(currentCol, currentRow-1);
  }
}

function keyPressed(){ // Runs when a key is pressed, checks if the key is SPACE, and if so, switches the mode between cross and square
  if(keyCode===32){
    if(shapeMode==="cross"){
      shapeMode = "square";
    }
    else{
      shapeMode = "cross";
    }
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

function determineActiveSquare(){ // An expression to run each frame to determine which rectangle the mouse is hovered over
  currentRow = int(mouseY / rectHeight);
  currentCol = int(mouseX / rectWidth);
}

function drawGrid(){ // Renders a grid of squares - fill color set according to data stored in the 2D array
  for (let x = 0; x < NUM_COLS ; x++){
    for (let y = 0; y < NUM_ROWS; y++){
      fill(gridData[y][x]); 
      rect(x*rectWidth, y*rectHeight, rectWidth, rectHeight);
    }
  }
}