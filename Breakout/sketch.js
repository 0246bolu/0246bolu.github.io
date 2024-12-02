// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

const NUM_ROWS = 8;
const NUM_COLS = 14;
let grid = [];
let bricks = [];
let paddleX;
let paddleY;


function setup() {
  createCanvas(windowWidth, windowHeight);
  brickList();
  rectMode(CENTER);
  paddleX = width/2;
  paddleY = height/2 + height/3;
}

function brickList(){
  for(let i = 0; i<NUM_ROWS; i++){
    for(let j = 0; j<NUM_COLS; j++){
      grid.push(j);
    }
    bricks.push(grid);
    grid = [];
  }
}

function draw() {
  background(0);
  strokeWeight(width/95)
  for(let i = 0; i<NUM_ROWS; i++){
    for(let j = 0; j<NUM_COLS; j++){
      if(i===0||i===1){
        fill(255,0,0);
      }
      else if(i===2||i===3){
        fill(255,127,0);
      }
      else if(i===4||i===5){
        fill(0,255,0);
      }
      else if(i===6||i===7){
        fill(255,255,0);
      }
      rect(j*width/NUM_COLS+width/28, i*height/38+height/10, width/NUM_COLS, height/40);
    }
  } 
  fill(78,193,245);
  rect(paddleX, paddleY, width/NUM_COLS, height/40);

  if(keyIsDown(RIGHT_ARROW)){
    if(paddleX<width){
      paddleX+=7;
    }
  }
  else if(keyIsDown(LEFT_ARROW)){
    if(paddleX>0){
      paddleX-=7;
    }
  }
  ball();
}

function ball(){
  strokeWeight(0);
  rect(paddleX, paddleY-((height/40)/2), width/50)
}

