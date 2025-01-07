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

function preload(){
  alien1anim1 = loadImage("assets/alien1anim1.png");
  alien1anim2 = loadImage("assets/alien1anim2.png");
  alien2anim1 = loadImage("assets/alien2anim1.png");
  alien2anim2 = loadImage("assets/alien2anim2.png");
  alien3anim1 = loadImage("assets/alien3anim1.png");
  alien3anim2 = loadImage("assets/alien3anim2.png");
  alienDeath = loadImage("assets/alienDeathExplos.png");
  deadShip = loadImage("assets/playerWreckage.png");
}

function setup() {
  createCanvas(950, 948);
  imageMode(CENTER);
  noStroke();
  shipX = width/2;
  shipY = height/2 + height/3;
  for(let i=0;i<5;i++){
    for(let j=0;j<12;j++){
        alienList.push(new Alien(1.5*j/2*width/12+width/28, 2.5*i*height/38+height/10, i))
    }
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
  rectMode(CENTER);
  textAlign(CENTER);
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
          image(alienDeath, alien.posX, alien.posY, alien1anim1.width/2, alien1anim1.width/2);
        }
      }
    }
    for(let i=0;i<aLaserList.length;i++){
      let laser = aLaserList[i];
      if(laser.aLaserX>shipX-width/14&&laser.aLaserX<shipX+width/14&&laser.aLaserY>shipY-height/40/2-25&&laser.aLaserY<shipY+height/80){
        aLaserList.splice(i,1);
        gameOver = true;
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
    if(lowestAlien>=shipY-alien1anim1.height/2-height/80){
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
    text(timeMin+":"+timerTen+timeHigh, width/2, height/13);
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
      text("High Score: "+localStorage.getItem("spaceInvadersHighScore")+" in "+highScoreMin+":"+highScoreSec, width-width/5, height/13);
    }
    else{
      text("High Score: "+localStorage.getItem("spaceInvadersHighScore")+" in "+highScoreMin+":"+"0"+highScoreSec, width-width/5, height/13);
    }
  }
  else{
    for(let i=0;i<alienList.length;i++){
      alienList[i].displayAliens();
    }
    textAlign(CENTER);
    textSize(50);
    if(win===false){
      image(deadShip,shipX,shipY,width/14,height/40);
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
    text(timeMin+":"+timerTen+timeHigh, width/2, height/13);
    textSize(height/35);
    if(highScoreSec>=10){
      text("High Score: "+localStorage.getItem("spaceInvadersHighScore")+" in "+highScoreMin+":"+highScoreSec, width-width/5, height/13);
    }
    else{
      text("High Score: "+localStorage.getItem("spaceInvadersHighScore")+" in "+highScoreMin+":"+"0"+highScoreSec, width-width/5, height/13);
    }
    if(newHighScore===true&&localStorage.getItem("spaceInvadersHighScore")>0){
      fill(0,255,0);
      text("NEW HIGH SCORE!", width-width/5, height/13-height/25);
      fill(255);
    }
  }
  textSize(height/12);
  text(killCount, width/13, height/13);
}

function keyReleased(){
  if((keyCode===UP_ARROW)||(keyCode===87)&&gameOver===false){
    pLaserList.push(new pLaser(shipX,shipY-height/80-25));
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
  constructor(barrierX, barrierY){
    this.barrierX = barrierX;
    this.barrierY = barrierY;
  }
  displayBarrier(){

  }
}

class BarrierBrick{

}