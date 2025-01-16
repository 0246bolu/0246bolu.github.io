let alienList = [];
let alien1anim1;
let alien1anim2;
let alien2anim1;
let alien2anim2;
let alien3anim1;
let alien3anim2;
let alienDeath;
let timer = 0;
let timerTen = 0
let timeMin = 0;
let timeHigh = 0;
let alienFirstAnim = true;
let alienVel = 1;
let right = true;
let drop = false;
let shipSpeed = 7;
let shipY;
let shipX;
let pLaserList = [];
let aLaserList = [];
let pLaserShoot = true;
let pLaserX;
let pLaserY;
let laserGen; 
let gameOver = false;
let lowestAlien = 0;
let killCount = 0;
let win = false;
let highScore;
let bestTime;
let newHighScore = false;
let highScoreMin = 0;
let highScoreSec = 0;
let explosionSound;
let alienSound;
let alienKilledSound;
let shootSound;
let barrierList = [];
let brickList = [];
let barrierX;
let barrierY;

function preload(){
  alien1anim1 = loadImage("assets/alien1anim1.png");
  alien1anim2 = loadImage("assets/alien1anim2.png");
  alien2anim1 = loadImage("assets/alien2anim1.png");
  alien2anim2 = loadImage("assets/alien2anim2.png");
  alien3anim1 = loadImage("assets/alien3anim1.png");
  alien3anim2 = loadImage("assets/alien3anim2.png");
  alienDeath = loadImage("assets/alienDeathExplos.png");
  deadShip = loadImage("assets/playerWreckage.png");
  explosionSound = loadSound("assets/explosion.wav");
  alienSound = loadSound("assets/fastinvader1.wav");
  alienKilledSound = loadSound("assets/invaderKilled.wav");
  shootSound = loadSound("assets/shoot.wav");
}

function setup() {
  createCanvas(950, 948);
  imageMode(CENTER);
  noStroke();
  rectMode(CENTER);
  textAlign(CENTER);
  shipX = width/2;
  shipY = height/2 + height/3;
  barrierX = width/2;
  barrierY = height/2;
  for(let i=0;i<5;i++){
    for(let j=0;j<12;j++){
        alienList.push(new Alien(1.5*j/2*width/12+width/28, 2.5*i*height/38+height/10, i))
    }
  }
  for(let i=0;i<4;i++){
    barrierList.push(new Barrier(120+i*237,height/2+height/5, i));
  }
  for(let i=0;i<barrierList.length;i++){
    barrierList[i].makeBricks();
  }
  if(localStorage.getItem("spaceInvadersHighScore")===null){
    localStorage.setItem("spaceInvadersHighScore", 0);
  }
  else{
    highScore = localStorage.getItem("spaceInvadersHighScore");
  }
  if(localStorage.getItem("spaceInvadersBestTime")===null){
    localStorage.setItem("spaceInvadersBestTime", 9999);
  }
  else{
    bestTime = localStorage.getItem("spaceInvadersBestTime");
  }
}

function draw(){
  background(0);
  fill(255);
  if(gameOver===false){
    rect(shipX, shipY, width/14, height/40, 20, 20, 0, 0);
    rect(shipX, shipY-height/80, 10, 25);
    if((keyIsDown(RIGHT_ARROW)||keyIsDown(68))){
      if(shipX<width){
        shipX+=shipSpeed;
      }
    }
    else if((keyIsDown(LEFT_ARROW)||keyIsDown(65))){
      if(shipX>0){
        shipX-=shipSpeed;
      }
    }
    if(drop===true){
      for(let i=0;i<alienList.length;i++){
        alienList[i].posY += 15;
      }
      drop = false;
    }
    if(frameCount%60===0&&gameOver===false){
      timer++;
      timeHigh++;
      if(timeHigh>9){
        timerTen++;
        timeHigh = 0;
      }
      if(timerTen>5){
        timeMin++;
        timerTen = 0;
      }
    }
    if(timer%2===0){
      alienFirstAnim = true;
    }
    else{
      alienFirstAnim = false;
    }
    if(timer%120===0){
      shipSpeed+=0.015;
      alienVel+=0.015;
    }
    if(frameCount%15===0){
      if((keyIsDown(UP_ARROW)||keyIsDown(87))&&pLaserShoot===true){
        pLaserList.push(new pLaser(shipX,shipY-height/80-25));
        shootSound.play();
      }
    }
    for(let i=0;i<pLaserList.length;i++){
      pLaserList[i].displayPLaser();
    }
    for(let i=0;i<pLaserList.length;i++){
      let laser = pLaserList[i];
      for(let j=0;j<alienList.length;j++){
        let alien = alienList[j];
        let alienLeft = alien.posX - alien1anim1.width/2;
        let alienRight = alien.posX + alien1anim1.width/2;
        let alienTop = alien.posY - alien1anim1.height/2;
        let alienBottom = alien.posY + alien1anim1.height/2;
        if(laser.pLaserX>alienLeft&&laser.pLaserX<alienRight&&laser.pLaserY>alienTop&&laser.pLaserY<alienBottom){
          alienList.splice(j,1);
          pLaserList.splice(i,1);
          killCount++;
          alienKilledSound.play();
          image(alienDeath, alien.posX, alien.posY, alien1anim1.width/2, alien1anim1.width/2);
        }
      }
    }
    for(let i=0;i<aLaserList.length;i++){
      let laser = aLaserList[i];
      if(laser.aLaserX>shipX-width/14&&laser.aLaserX<shipX+width/14&&laser.aLaserY>shipY-height/40/2-25&&laser.aLaserY<shipY+height/80){
        aLaserList.splice(i,1);
        explosionSound.play();
        gameOver = true;
      }
    }
    for(let i=0; i<pLaserList.length; i++){
      let laser = pLaserList[i];
      for(let j=0; j<brickList.length; j++){
        let brick = brickList[j];
        let brickLeft = brick.brickX - 10;
        let brickRight = brick.brickX + 10;
        let brickTop = brick.brickY - 15;
        let brickBottom = brick.brickY + 15;
        if(laser.pLaserX>brickLeft&&laser.pLaserX<brickRight&&laser.pLaserY>brickTop&&laser.pLaserY<brickBottom){
          brickList.splice(j,1);
          pLaserList.splice(i,1);
        }
      }
    }
    for(let i=0; i<aLaserList.length; i++){
      let laser = aLaserList[i];
      for(let j=0; j<brickList.length; j++){
        let brick = brickList[j];
        let brickLeft = brick.brickX - 10;
        let brickRight = brick.brickX + 10;
        let brickTop = brick.brickY - 15;
        let brickBottom = brick.brickY + 15;
        if(laser.aLaserX>brickLeft&&laser.aLaserX<brickRight&&laser.aLaserY>brickTop&&laser.aLaserY<brickBottom){
          brickList.splice(j,1);
          aLaserList.splice(i,1);
        }
      }
    }
    laserGen = Math.round(random(1,100));
    if(laserGen<=3){
      let laserAlien = alienList[Math.round(random(0,alienList.length-1))];
      let laserAlienX = laserAlien.posX;
      let laserAlienY = laserAlien.posY;
      aLaserList.push(new aLaser(laserAlienX,laserAlienY));
    }
    for(let i=0;i<aLaserList.length;i++){
      aLaserList[i].displayALaser();
    }
    for(let i=0;i<alienList.length;i++){
      let alien = alienList[i];
      if(alien.posY>lowestAlien){
        lowestAlien = alien.posY;
      }
    }
    if(lowestAlien>=(height/2+height/5)-(0.5*30)-alien1anim1.height/2-height/80){
      explosionSound.play();
      gameOver = true;
    }
    for(let i=0;i<alienList.length;i++){
      alienList[i].displayAliens();
    }
    if(killCount>=60){
      win = true;
      gameOver = true;
    }
    if(killCount>localStorage.getItem("spaceInvadersHighScore")){
      localStorage.setItem("spaceInvadersHighScore", killCount);
      localStorage.setItem("spaceInvadersBestTime", timer);
      textSize(height/12);
      newHighScore = true;
    }
    else if(killCount>=localStorage.getItem("spaceInvadersHighScore")&&timer<localStorage.getItem("spaceInvadersBestTime")){
      localStorage.setItem("spaceInvadersBestTime", timer);
      newHighScore = true;
    }
    fill(255);
    textSize(height/12);
    text(timeMin+":"+timerTen+timeHigh, width/2, height/13-10);
    textSize(height/35)
    if(newHighScore===true&&localStorage.getItem("spaceInvadersHighScore")>0){
      fill(0,255,0);
      text("NEW HIGH SCORE!", width-width/5, height/13-height/25);
      fill(255);
    }
    if(localStorage.getItem("spaceInvadersBestTime")/60>=1){
      highScoreMin = Math.floor(localStorage.getItem("spaceInvadersBestTime")/60);
    }
    highScoreSec = localStorage.getItem("spaceInvadersBestTime")-(highScoreMin*60)
    if(highScoreSec>=10){
      text("High Score: "+localStorage.getItem("spaceInvadersHighScore")+" in "+highScoreMin+":"+highScoreSec, width-width/5, height/13-10);
    }
    else{
      text("High Score: "+localStorage.getItem("spaceInvadersHighScore")+" in "+highScoreMin+":"+"0"+highScoreSec, width-width/5, height/13-10);
    }
  }
  else{
    for(let i=0;i<alienList.length;i++){
      alienList[i].displayAliens();
    }
    textSize(30);
    text("PRESS SPACE TO RESTART", width/2, height/2+90);
    textSize(50);
    if(win===false){
      image(deadShip,shipX,shipY,width/10,height/30);
      fill(255,0,0);
      text("GAME OVER", width/2, height/2);
    }
    else{
      fill(0,255,0);
      text("YOU WIN", width/2, height/2);
      fill(255);
      rect(shipX, shipY, width/14, height/40, 20, 20, 0, 0);
      rect(shipX, shipY-height/80, 10, 25);
    }
    fill(255);
    textSize(height/12);
    text(timeMin+":"+timerTen+timeHigh, width/2, height/13-10);
    textSize(height/35);
    if(highScoreSec>=10){
      text("High Score: "+localStorage.getItem("spaceInvadersHighScore")+" in "+highScoreMin+":"+highScoreSec, width-width/5, height/13-10);
    }
    else{
      text("High Score: "+localStorage.getItem("spaceInvadersHighScore")+" in "+highScoreMin+":"+"0"+highScoreSec, width-width/5, height/13-10);
    }
    if(newHighScore===true&&localStorage.getItem("spaceInvadersHighScore")>0){
      fill(0,255,0);
      text("NEW HIGH SCORE!", width-width/5, height/13-height/25-10);
      fill(255);
    }
    if(keyIsDown(32)){
      location.reload();
    }
  }
  for(let i=0;i<brickList.length;i++){
    brickList[i].displayBricks();
  }
  textSize(height/12);
  text(killCount, width/13, height/13-10);
}

function keyReleased(){
  if(((keyCode===UP_ARROW)||(keyCode===87))&&gameOver===false){
    pLaserList.push(new pLaser(shipX,shipY-height/80-25));
    shootSound.play();
  }
 }

class Alien{
  constructor(posX,posY,row){
    this.posX = posX;
    this.posY = posY;
    this.row = row;
  }
  displayAliens(){
    if(alienFirstAnim===true){
      if(this.row===0){
        image(alien1anim1, this.posX, this.posY, alien1anim1.width/2, alien1anim1.height/2);
      }
      else if(this.row===1||this.row===2){
        image(alien2anim1, this.posX, this.posY, alien2anim1.width/2, alien2anim1.height/2);
      }
      else if(this.row===3||this.row===4){
        image(alien3anim1, this.posX, this.posY, alien3anim1.width/2, alien3anim1.height/2);
      }
    }
    else{
      if(this.row===0){
        image(alien1anim2, this.posX, this.posY, alien1anim2.width/2, alien2anim1.height/2);
      }
      else if(this.row===1||this.row===2){
        image(alien2anim2, this.posX, this.posY, alien2anim2.width/2, alien2anim2.height/2);
      }
      else if(this.row===3||this.row===4){
        image(alien3anim2, this.posX, this.posY, alien3anim2.width/2, alien3anim2.height/2);
      }
    }
    if(right===true&&gameOver===false){
      this.posX+=alienVel;
      if(this.posX>width-alien1anim2.width/2){
        right = false;
        drop = true;
      }
    }
    if(right===false&&gameOver===false){
      this.posX-=alienVel;
      if(this.posX<0+alien1anim2.width/2){
        right = true;
        drop = true;
      }
    }
  }
}

class pLaser{
  constructor(pLaserX, pLaserY){
    this.pLaserX = pLaserX;
    this.pLaserY = pLaserY;
  }
  displayPLaser(){
    rect(this.pLaserX,this.pLaserY, 10, 35);
    this.pLaserY-=15;
  }
}

class aLaser{
  constructor(aLaserX, aLaserY){
    this.aLaserX = aLaserX;
    this.aLaserY = aLaserY;
  }
  displayALaser(){
    rect(this.aLaserX,this.aLaserY, 10, 35);
    this.aLaserY+=15;
  }
}

class Barrier{
  constructor(barrierX, barrierY, barrierNum){
    this.barrierX = barrierX;
    this.barrierY = barrierY;
    this.barrierNum = barrierNum;
  }
  makeBricks(){
    for(let i=1;i<15;i++){
      let position = i;
      if(position===1){
        brickList.push(new BarrierBrick(this.barrierNum,this.barrierX-3.5*20,this.barrierY+1.5*30))
      }
      else if(position===2){
        brickList.push(new BarrierBrick(this.barrierNum,this.barrierX-2.5*20,this.barrierY+1.5*30))
      }
      else if(position===3){
        brickList.push(new BarrierBrick(this.barrierNum,this.barrierX-2.5*20,this.barrierY+0.5*30))
      }
      else if(position===4){
        brickList.push(new BarrierBrick(this.barrierNum,this.barrierX-1.5*20,this.barrierY+1*30))
      }
      else if(position===5){
        brickList.push(new BarrierBrick(this.barrierNum,this.barrierX-1.5*20,this.barrierY))
      }
      else if(position===6){
        brickList.push(new BarrierBrick(this.barrierNum,this.barrierX-0.5*20,this.barrierY+0.5*30))
      }
      else if(position===7){
        brickList.push(new BarrierBrick(this.barrierNum,this.barrierX-0.5*20,this.barrierY-0.5*30))
      }
      else if(position===8){
        brickList.push(new BarrierBrick(this.barrierNum,this.barrierX+0.5*20,this.barrierY+0.5*30))
      }
      else if(position===9){
        brickList.push(new BarrierBrick(this.barrierNum,this.barrierX+0.5*20,this.barrierY-0.5*30))
      }
      else if(position===10){
        brickList.push(new BarrierBrick(this.barrierNum,this.barrierX+1.5*20,this.barrierY+1*30))
      }
      else if(position===11){
        brickList.push(new BarrierBrick(this.barrierNum,this.barrierX+1.5*20,this.barrierY))
      }
      else if(position===12){
        brickList.push(new BarrierBrick(this.barrierNum,this.barrierX+2.5*20,this.barrierY+1.5*30))
      }
      else if(position===13){
        brickList.push(new BarrierBrick(this.barrierNum,this.barrierX+2.5*20,this.barrierY+0.5*30))
      }
      else if(position===14){
        brickList.push(new BarrierBrick(this.barrierNum,this.barrierX+3.5*20,this.barrierY+1.5*30))
      }
    }
  }
}

class BarrierBrick{
  constructor(barrier, brickX, brickY){
    this.barrier = barrier;
    this.brickX = brickX;
    this.brickY = brickY;
  }
  displayBricks(){
    rect(this.brickX,this.brickY,20,30);
  }
}