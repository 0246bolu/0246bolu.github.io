const NUM_ROWS = 8;
const NUM_COLS = 14;
let paddleX;
let paddleY;
let pos;
let vel;
let bricks = [];
let breakCount = 0;
let timer = 0;
let timerTen = 0
let timeMin = 0;
let paddleSpeed = 7;
let gameOver = false;

function setup(){
  createCanvas(windowWidth, windowHeight);
  rectMode(CENTER);
  textAlign(CENTER);
  pos = createVector(random(0,width), height/2);
  let velSign = Math.round(random());
  if(velSign===0){
    vel = createVector(-5,3);
  }
  else{
    vel = createVector(5,3);
  }
  paddleX = width/2;
  paddleY = height/2 + height/3;
  for(let i = 0; i<NUM_ROWS; i++){
    for(let j = 0; j<NUM_COLS; j++){
      if(i===0||i===1){
        bricks.push(new Brick(j*width/NUM_COLS+width/28, i*height/38+height/10, "red"));
      }
      else if(i===2||i===3){
        bricks.push(new Brick(j*width/NUM_COLS+width/28, i*height/38+height/10, "orange"));
      }
      else if(i===4||i===5){
        bricks.push(new Brick(j*width/NUM_COLS+width/28, i*height/38+height/10, "green"));
      }
      else if(i===6||i===7){
        bricks.push(new Brick(j*width/NUM_COLS+width/28, i*height/38+height/10, "yellow"));
      }
    }
  } 
}

function draw(){
  background(0);
  strokeWeight(width/95)
  for(i=0; i<bricks.length; i++){
    bricks[i].display();
  }
  fill(78,193,245);
  rect(paddleX, paddleY, width/NUM_COLS, height/40);
  if(keyIsDown(RIGHT_ARROW)){
    if(paddleX<width){
      paddleX+=paddleSpeed;
    }
  }
  else if(keyIsDown(LEFT_ARROW)){
    if(paddleX>0){
      paddleX-=paddleSpeed;
    }
  }
  if(frameCount%60===0&&breakCount<112&&gameOver===false){
    timer++;
    if(timer>9){
      timerTen++;
      timer = 0;
    }
    if(timerTen>5){
      timeMin++;
      timerTen = 0;
    }
    paddleSpeed+=0.05;
    if(vel.x>0){
      vel.x+=0.05;
      if(vel.y>0){
        vel.y+=0.05;
      }
      else{
        vel.y-=0.05;
      }
    }
    else{
      vel.x-=0.05;
      if(vel.y>0){
        vel.y+=0.05;
      }
      else{
        vel.y-=0.05;
      }
    }
  }
  fill(255);
  textSize(height/12);
  text(timeMin+":"+timerTen+timer, width/2, height/13);
  ball();
}

class Brick{
  constructor(posXBrick, posYBrick, color){
    this.posXBrick = posXBrick;
    this.posYBrick = posYBrick;
    this.color = color;
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
    let brickLeft = this.posXBrick-width/NUM_COLS+width/95;
    let brickRight = this.posXBrick+width/NUM_COLS-width/95;
    let brickTop = this.posYBrick-height/40+width/95;
    let brickBottom = this.posYBrick+height/40-width/95;
    let left = pos.x-width/120;
    let right = pos.x+width/120;
    let top = pos.y-width/120;
    let bottom = pos.y+width/120;
    if(right>brickLeft && left<brickRight && top<brickBottom && bottom>brickTop){
      if(vel.y>0&&(this.posYBrick-pos.y<=height/40*0.75||pos.y-this.posYBrick>=height/40/2)){
          if(vel.x<0){
            pos.x = brickRight+width/60/2;
          }
          else{
            pos.x = brickLeft-width/60/2;
          }
          vel.x *= -1;
      }
      else if(vel.y<0&&(this.posYBrick-pos.y>=height/40*0.75||pos.y-this.posYBrick<=height/40/2)){
        if(vel.x<0){
          pos.x = brickRight+width/60/2;
        }
        else{
          pos.x = brickLeft-width/60/2;
        }
        vel.x *= -1;
      }
      else{
        if(vel.y>0){
          vel.y *= -1;
          pos.y = brickTop-height/40/2;
        }
        else{
        pos.y = brickBottom+height/40/2;
        vel.y *= -1;
        }
      }
      breakCount++;
      this.posYBrick = 9999;
      this.posXBrick = 9999;
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
  if(pos.y>=height&&breakCount<112){
    fill(255,0,0);
    textSize(height/10);
    text("GAME OVER", width/2, height/2);
    gameOver = true;
  }
  if(breakCount===112){
    fill(0,255,0);
    textSize(height/10);
    text("YOU WIN", width/2, height/2);
  }
  rect(pos.x, pos.y, width/60);
  textSize(height/12);
  text(breakCount, width/13, height/13);
}