// Cars Cars Cars
// Lucas Boyd
// 10/21/2024
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let eastbound = [];
let westbound = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  for(let e=0;e<20;e++){
    eastbound.push(new Vehicle(Math.round(random(0,1)),[random(0,255), random(0,255), random(0,255)], random(0,windowWidth), random(windowHeight+1, windowHeight),1,random(1,20),2));
  }
  for(let w=0;w<20;w++){
    westbound.push(new Vehicle(Math.round(random(0,1)),[random(0,255), random(0,255), random(0,255)], random(0,windowWidth), random(windowHeight-1, 0),-1,-random(1,20),-2));
  }
}

function draw() {
  drawRoad();
  for(let e=0;e<20;e++){
    eastbound[e].action();
  }
  for(let w=0;w<20;w++){
    westbound[w].action();
  }
}

function drawRoad(){
  background(0);
  for(let i=0;i<windowWidth;i+=60){
    stroke(255);
    strokeWeight(5);
    line(i, windowHeight/2, i+30, windowHeight/2);
  }
}

class Vehicle{
  constructor(type,color,x,y,direction,xSpeed,acceleration){
    this.type = type;
    this.color = color;
    this.x = x;
    this.y = y;
    this.direction = direction;
    this.xSpeed = xSpeed;
    this.acceleration = acceleration;
  }
  display(){
    if(this.type===0){
      fill(this.color);
      rect(this.x,this.y,60,30);
    }
    else if(this.type===1){
      fill(this.color);
      rect(this.x,this.y,60,30);
      rect(this.x-60,this.y,50,30);
    }
  }
  move(){
    if(this.direction>0){
      if(this.x<windowWidth){
        this.x+=this.xSpeed;
      }
      else{
        this.x=0;
      }
    }
    else{
      if(this.x>0){
        this.x-=this.xSpeed;
      }
      else{
        this.x=0;
      }
    }
  }
  speedUp(){
    if(this.acceleration<15){
      this.xSpeed++;
    }
  }
  speedDown(){
    if(this.acceleration>0){
      this.xSpeed--;
    }
  }
  changeColor(){
    this.color = [random(0,255), random(0,255), random(0,255)];
  }
  action(){
    this.move();
    let r = random(1,100);
    if(r===50){
      this.speedUp();
      this.speedDown();
      this.changeColor();
    }
    this.display();
  }
}
