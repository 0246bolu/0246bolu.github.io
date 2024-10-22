// Cars Cars Cars
// Lucas Boyd
// 10/21/2024
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let eastbound = [];
let westbound = [];
let TrafficLight;


function setup() {
  createCanvas(windowWidth, windowHeight);
  for(let e=0;e<20;e++){
    eastbound.push(new Vehicle(Math.round(random(0,1)),[random(0,255), random(0,255), random(0,255)], random(0,windowWidth), random(windowHeight/2+40, windowHeight),"pos",random(1,20)));
  }
  for(let w=0;w<20;w++){
    westbound.push(new Vehicle(Math.round(random(0,1)),[random(0,255), random(0,255), random(0,255)], random(0,windowWidth), random(windowHeight/2-40, 0),"neg",-random(1,20)));
  }
}

function draw() {
  drawRoad();
  let r = random(1,100);
  for(let e=0;e<eastbound.length;e++){
    eastbound[e].action(r);
  }
  for(let w=0;w<westbound.length;w++){
    westbound[w].action(r);
  }
}

function mouseClicked(){
  if(keyIsDown(SHIFT) === true){
    westbound.push(new Vehicle(Math.round(random(0,1)),[random(0,255), random(0,255), random(0,255)], random(0,windowWidth), random(windowHeight/2-40, 0),"neg",-random(1,20)));
  }
  else{
    eastbound.push(new Vehicle(Math.round(random(0,1)),[random(0,255), random(0,255), random(0,255)], random(0,windowWidth), random(windowHeight/2+40, windowHeight),"pos",random(1,20)));
  }
}

function keyPressed(){
  if(keyCode===32){
    new Lights([255,0,0]);
  }
}

function drawRoad(){
  background(0);
  for(let i=0;i<windowWidth;i+=60){
    stroke(255);
    strokeWeight(5);
    line(i, windowHeight/2, i+30, windowHeight/2);
  }
  stroke(0);
  strokeWeight(1);
}

class Vehicle{
  constructor(type,color,x,y,direction,xSpeed){
    this.type = type;
    this.color = color;
    this.x = x;
    this.y = y;
    this.direction = direction;
    this.xSpeed = xSpeed;
  }
  display(){
    if(this.type===0){
      fill(255);
      rect(this.x+45, this.y-5,10,40);
      rect(this.x+5, this.y-5,10,40);
      fill(this.color);
      rect(this.x,this.y,60,30);
    }
    else if(this.type===1){
      fill(this.color);
      rect(this.x,this.y,60,30);
      rect(this.x-20,this.y,50,30);
    }
  }
  move(){
    if(this.direction==="pos"){
      if(this.x<windowWidth){
        this.x+=this.xSpeed;
      }
      else{
        this.x=0;
      }
    }
    else{
      if(this.x>0){
        this.x+=this.xSpeed;
      }
      else{
        this.x=windowWidth;
      }
    }
  }
  speedUp(){
    if(this.direction==="pos"){
      if(this.xSpeed<15){
        this.xSpeed++;
      }
    }
    else{
      if(this.xSpeed>-15){
        this.xSpeed--;
      }
    }
  }
  speedDown(){
    if(this.direction==="pos"){
      if(this.xSpeed>0){
        this.xSpeed--;
      }
    }
    else{
      if(this.xSpeed>-15){
        this.xSpeed--;
      }
    }
  }
  changeColor(){
    this.color = [random(0,255), random(0,255), random(0,255)];
  }
  action(r){
    this.move();
    if(Math.round(r)===50){
      this.speedUp();
      this.speedDown();
      this.changeColor();
    }
    this.display();
  }
}

class Lights{
  contructor(c){
    this.c = c;
  }
  drawLight(){
    rect(0,0,80,160);
  }
}
