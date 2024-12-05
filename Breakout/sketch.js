const NUM_ROWS = 8;
const NUM_COLS = 14;
let paddleX;
let paddleY;
let pos;
let vel;
let bricks = [];
let x = 0;


function setup() {
  createCanvas(windowWidth, windowHeight);
  rectMode(CENTER);
  pos = createVector(width/2, height/2);
  vel = createVector(5,3);
  paddleX = width/2;
  paddleY = height/2 + height/3;

  for(let i = 0; i<NUM_ROWS; i++){
    for(let j = 0; j<NUM_COLS; j++){
      if(i===0||i===1){
        fill(255,0,0);
        bricks.push(new Brick(j*width/NUM_COLS+width/28, i*height/38+height/10, "red", x));
      }
      else if(i===2||i===3){
        fill(255,127,0);
        bricks.push(new Brick(j*width/NUM_COLS+width/28, i*height/38+height/10, "orange", x));
      }
      else if(i===4||i===5){
        fill(0,255,0);
        bricks.push(new Brick(j*width/NUM_COLS+width/28, i*height/38+height/10, "green", x));
      }
      else if(i===6||i===7){
        fill(255,255,0);
        bricks.push(new Brick(j*width/NUM_COLS+width/28, i*height/38+height/10, "yellow", x));
      }
      x++;
    }
  } 
}

function draw() {
  background(0);
  strokeWeight(width/95)
  for(i=0; i<bricks.length; i++){
    bricks[i].display();
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

class Brick{
  constructor(posXBrick, posYBrick, color, x){
    this.posXBrick = posXBrick;
    this.posYBrick = posYBrick;
    this.color = color;
    this.x = x;
  }
  display(){
    if(this.color === "red"){
      fill(255,0,0);
      rect(this.posXBrick, this.posYBrick, width/NUM_COLS, height/40);
    }
    else if(this.color === "orange"){
      fill(255,127,0);
      rect(this.posXBrick, this.posYBrick, width/NUM_COLS, height/40);
    }
    else if(this.color === "green"){
      fill(0,255,0);
      rect(this.posXBrick, this.posYBrick, width/NUM_COLS, height/40);
    }
    else if(this.color === "yellow"){
      fill(255,255,0);
      rect(this.posXBrick, this.posYBrick, width/NUM_COLS, height/40);
    }

    let brickLeft = this.posXBrick-width/NUM_COLS;
    let brickRight = this.posXBrick+width/NUM_COLS;
    let brickTop = this.posYBrick-height/40;
    let brickBottom = this.posYBrick+height/40;
    let left = pos.x-width/120;
    let right = pos.x+width/120;
    let top = pos.y-width/120;
    let bottom = pos.y+width/120;
    if(right>brickLeft && left<brickRight && top<brickBottom && bottom>brickTop){
      vel.y *= -1;
      bricks.splice(x,x);
    }
  }
}

function ball(){
  let left = pos.x-width/120;
  let right = pos.x+width/120;
  let top = pos.y-width/120;
  let bottom = pos.y+width/120;
  let pLeft = paddleX-width/NUM_COLS/2;
  let pRight = paddleX+width/NUM_COLS/2;
  let pTop = paddleY-height/40/2;
  let pBottom = paddleY+height/40/2;
  strokeWeight(0);
  fill(255);
  pos.add(vel);
  if(right>pLeft && left<pRight && top<pBottom && bottom>pTop){
    vel.y *= -1;
    pos.y = pTop-height/40/2;
  }
  if(pos.x<0 || pos.x > width){
    vel.x *= -1;
  }
  if(pos.y<0){
    vel.y *= -1;
  }
  rect(pos.x, pos.y, width/60);
}