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
let timeHigh = 0;
let paddleSpeed = 7;
let gameOver = false;
let newHighScore = false;
let highScoreSec = 0;
let highScoreTen = 0;
let highScoreMin = 0;
let loseSound;
let breakSound;
let winSound;
let bounceSound;
let s = 0;
let l = 0;

function preload(){
  loseSound = loadSound("assets/8-bit-video-game-fail-version-2-145478.mp3");
  breakSound = loadSound("assets/8-bit-video-game-points-version-1-145826.mp3");
  winSound = loadSound("assets/8-bit-video-game-win-level-sound-version-1-145827.mp3");
  bounceSound = loadSound("assets/impact-sound-effect-8-bit-retro-151796.mp3");
}

function setup(){
  createCanvas(950,948);
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
  if(localStorage.getItem("breakoutHighScore")===null){
    localStorage.setItem("breakoutHighScore", 0);
  }
  else{
    highScore = localStorage.getItem("breakoutHighScore");
  }
  if(localStorage.getItem("breakoutBestTime")===null){
    localStorage.setItem("breakoutBestTime", 9999);
  }
  else{
    bestTime = localStorage.getItem("breakoutBestTime");
  }
}

function draw(){
  background(0);
  strokeWeight(height/95)
  for(i=0; i<bricks.length; i++){
    bricks[i].display();
  }
  fill(78,193,245);
  rect(paddleX, paddleY, width/NUM_COLS, height/40);
  if((keyIsDown(RIGHT_ARROW)||keyIsDown(68))&&gameOver===false){
    if(paddleX<width){
      paddleX+=paddleSpeed;
    }
  }
  else if((keyIsDown(LEFT_ARROW)||keyIsDown(65))&&gameOver===false){
    if(paddleX>0){
      paddleX-=paddleSpeed;
    }
  }
  if(frameCount%60===0&&breakCount<112&&gameOver===false){
    timer++;
    timeHigh++;
    if(timer>9){
      timerTen++;
      timer = 0;
    }
    if(timerTen>5){
      timeMin++;
      timerTen = 0;
    }
    if(abs(vel.y)<=5||abs(vel.x)<=7){
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
  }
  if(breakCount>localStorage.getItem("breakoutHighScore")){
    localStorage.setItem("breakoutHighScore", breakCount);
    localStorage.setItem("breakoutBestTime", timeHigh);
    textSize(height/12);
    newHighScore = true;
  }
  else if(breakCount>=localStorage.getItem("breakoutHighScore")&&timeHigh<localStorage.getItem("breakoutBestTime")){
    localStorage.setItem("breakoutBestTime", timeHigh);
    newHighScore = true;
  }
  fill(255);
  textSize(height/12);
  text(timeMin+":"+timerTen+timer, width/2, height/13);
  textSize(height/35)
  if(newHighScore===true&&localStorage.getItem("breakoutHighScore")>0){
    fill(0,255,0);
    text("NEW HIGH SCORE!", width-width/5, height/13-height/25);
    fill(255);
  }
  if(localStorage.getItem("breakoutBestTime")/60>=1){
    highScoreMin = Math.floor(localStorage.getItem("breakoutBestTime")/60);
  }
  highScoreSec = localStorage.getItem("breakoutBestTime")-(highScoreMin*60)
  if(highScoreSec>=10){
    text("High Score: "+localStorage.getItem("breakoutHighScore")+" in "+highScoreMin+":"+highScoreSec, width-width/5, height/13);
  }
  else{
    text("High Score: "+localStorage.getItem("breakoutHighScore")+" in "+highScoreMin+":"+"0"+highScoreSec, width-width/5, height/13);
  }
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
      breakSound.play();
      if(vel.y>0&&(this.posYBrick-pos.y<=height/40*0.75||pos.y-this.posYBrick>=height/40/2)){
          if(vel.x<0&&(left-brickRight)<width/120){
            pos.x = brickRight+width/60/2;
          }
          else if((right-brickLeft)<width/120){
            pos.x = brickLeft-width/60/2;
          }
          vel.x *= -1;
      }
      else if(vel.y<0&&(this.posYBrick-pos.y>=height/40*0.75||pos.y-this.posYBrick<=height/40/2)){
        if(vel.x<0&&(left-brickRight)<width/120){
          pos.x = brickRight+width/60/2;
        }
        else if((right-brickLeft)<width/120){
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
    if((paddleY-pos.y)<=height/80){
      if(right>=pRight){ 
        pos.x = pRight+width/60;
        // pos.y = paddleY;
        vel.y *= -1;
        vel.x *= -1;
        if(pos.x>=width){
          pos.y = pTop-height/40/2;
          vel.y = abs(vel.y);
        }
        if(keyIsDown(RIGHT_ARROW)||keyIsDown(68)){
          pos.y = pTop-height/80;
        }
      }
      else{
        pos.x = pLeft-width/60;
        // pos.y = paddleY;
        vel.y *= -1;
        vel.x *= -1;   
        if(pos.x<=0){
          pos.y = pTop-height/40/2;
          vel.y = abs(vel.y);
        }  
        if(keyIsDown(LEFT_ARROW)||keyIsDown(65)){
          pos.y = pTop-height/80;
        } 
      }
    }
    else{
      vel.y *= -1;
      pos.y = pTop-height/40/2;
    }
    bounceSound.play();
  }
  if(pos.x<=0){
    pos.x = 0;
    vel.x *= -1;
    bounceSound.play();
  }
  if(pos.x>=width){
    pos.x = width;
    vel.x *= -1;
    bounceSound.play();
  }
  if(pos.y<0){
    vel.y *= -1;
    bounceSound.play();
  }
  if(pos.y>=height&&breakCount<112){
    fill(255,0,0);
    textSize(height/10);
    text("GAME OVER", width/2, height/2);
    l++;
    if(l<=1){
      loseSound.play();
    }
    gameOver = true;
  }
  if(breakCount===112){
    fill(0,255,0);
    textSize(height/10);
    text("YOU WIN", width/2, height/2);
    s++;
    if(s<=1){
      winSound.play();
    }
    gameOver = true;
  }
  rect(pos.x, pos.y, height/60);
  textSize(height/12);
  text(breakCount, width/13, height/13);
}