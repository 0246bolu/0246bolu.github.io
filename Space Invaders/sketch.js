let alienList = [];

function preload(){
  loadImage("assets/alien1anim1.png");
  loadImage("assets/alien1anim2.png");
  loadImage("assets/alien2anim1.png");
  loadImage("assets/alien2anim2.png");
  loadImage("assets/alien3anim1.png");
  loadImage("assets/alien3anim2.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  for(let i=0;i<5;i++){
    for(let j=0;j<12;j++){
        alienList.push(new Alien(j*width/12+width/28, i*height/38+height/10, i))
    }
  }
}

function draw() {
  background(0);
  for(let i=0;i<alienList.length;i++){
    alienList[i].displayAliens();
  }
}

class Alien{
  constructor(posX,posY,row){
    this.posX = posX;
    this.posY = posY;
    this.row = row;
  }
  displayAliens(){
    if(this.row===0){

    }
    else if(this.row===1||this.row===2){
      
    }
    else if(this.row===3||this.row===4){
      
    }
  }
}