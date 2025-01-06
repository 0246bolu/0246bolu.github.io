let alienList = [];
let alien1anim1;
let alien1anim2;
let alien2anim1;
let alien2anim2;
let alien3anim1;
let alien3anim2;
let alienDeath;
let timer = 0;
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
}

function draw() {
  rectMode(CENTER);
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
    if(frameCount%60===0){
      timer++;
    }
    if(timer%2===0){
      alienFirstAnim = true;
    }
    else{
      alienFirstAnim = false;
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
        let alienLeft = alien.posX - alien1anim1.width/4;
        let alienRight = alien.posX + alien1anim1.width/4
        let alienTop = alien.posY - alien1anim1.height/4
        let alienBottom = alien.posY + alien1anim1.height/4
        if(laser.pLaserX>alienLeft&&laser.pLaserX<alienRight&&laser.pLaserY>alienTop&&laser.pLaserY<alienBottom){
          alienList.splice(j,1);
          pLaserList.splice(i,1);
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
  }
  else{
    image(deadShip,shipX,shipY,width/14,height/40);
    textAlign(CENTER);
    textSize(50);
    text("GAME OVER", width/2, height/2);
  }
  for(let i=0;i<alienList.length;i++){
    alienList[i].displayAliens();
  }
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
    if(right===true){
      this.posX+=alienVel;
      if(this.posX>width-alien1anim2.width/2){
        right = false;
        drop = true;
      }
    }
    if(right===false){
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