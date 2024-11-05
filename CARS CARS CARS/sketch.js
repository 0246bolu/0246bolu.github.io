// Cars Cars Cars
// Lucas Boyd
// 10/21/2024
// This project renders cars on a road going different directions with random positions and colors, along with a stop light that stops all cars when red

let eastbound = [];
let westbound = [];
let TrafficLight;
let timer = 120;

function setup(){ // Sets up canvas, sets up traffic light object and pushes car objects with random parameters into eastbound and westbound lists
  createCanvas(windowWidth, windowHeight);
  TrafficLight = new Lights("go");
  for(let e=0;e<20;e++){
    eastbound.push(new Vehicle(Math.round(random(0,1)),[random(0,255), random(0,255), random(0,255)], random(0,windowWidth), random(windowHeight/2+40, windowHeight),"pos",random(1,20)));
  }
  for(let w=0;w<20;w++){
    westbound.push(new Vehicle(Math.round(random(0,1)),[random(0,255), random(0,255), random(0,255)], random(0,windowWidth), random(windowHeight/2-40, 0),"neg",-random(1,20)));
  }
}

function draw(){ // Runs every frame, drawing the road, calling the action function and the drawlights function for each car and light respectively
  drawRoad();
  let r = random(1,100);
  for(let e=0;e<eastbound.length;e++){
    eastbound[e].action(r);
  }
  for(let w=0;w<westbound.length;w++){
    westbound[w].action(r);
  }
  if (TrafficLight.trafficMode === "stop"){ //Sets timer for 120 frames when light turns red
    timer -= 1;
  }
  if (timer === 0){
    timer = 120;
    TrafficLight.trafficMode = "go";
  }
  TrafficLight.drawLights()
}

function mouseClicked(){ //Runs if mouse is clicked, and then checks if shift is held concurrently
  if(keyIsDown(SHIFT) === true){
    westbound.push(new Vehicle(Math.round(random(0,1)),[random(0,255), random(0,255), random(0,255)], random(0,windowWidth), random(windowHeight/2-40, 0),"neg",-random(1,20))); //Makes new westbound object
  }
  else{
    eastbound.push(new Vehicle(Math.round(random(0,1)),[random(0,255), random(0,255), random(0,255)], random(0,windowWidth), random(windowHeight/2+40, windowHeight),"pos",random(1,20))); //Makes new eastbound object
  }
}

function drawRoad(){ // Draws black road background with white lane divider
  background(0);
  for(let i=0;i<windowWidth;i+=60){
    stroke(255);
    strokeWeight(5);
    line(i, windowHeight/2, i+30, windowHeight/2);
  }
  stroke(0);
  strokeWeight(1);
}

class Vehicle{ // Creates vehicle class with characteristics determined previously
  constructor(type,color,x,y,direction,xSpeed){
    this.type = type;
    this.color = color;
    this.x = x;
    this.y = y;
    this.direction = direction;
    this.xSpeed = xSpeed;
  }
  display(){ // Draws each car according to type (0 is car, 1 is truck)
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
  move(){ // Moves the vehicle eastbound or westbound depending on this.direction
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
  speedUp(){ // Speeds up vehicle when called depending on direction
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
  speedDown(){ // Slows down vehicle when called depending on direction
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
  changeColor(){ // Changes vehicle color to a random value
    this.color = [random(0,255), random(0,255), random(0,255)];
  }
  action(r){ // Calls all functions in the class if applicable
    if(TrafficLight.trafficMode !== "stop"){
      this.move();
    }
    if(Math.round(r)===50){ // Ensures that there is a 1 percent chance these functions run
      this.speedUp();
      this.speedDown();
      this.changeColor();
    }
    this.display();
  }
}

function keyPressed(){ // Function that checks if space is pressed, and changes trafficMode to stop if it is
  if(keyCode===32){
    TrafficLight.trafficMode = "stop";
  }
}

class Lights{ // Creates traffic light class which has 2 modes, stop and go
  constructor(trafficMode){
    this.trafficMode = trafficMode;
  }
  drawLights(){ // Draws the lights, whose colors depend on whether the mode is stop and go
    fill(200,125,0);
    rect(0,0,100,200 );
    if(this.trafficMode === "stop"){
      fill(255,0,0);
      circle(50,50,60);
      fill(1,50,32);
      circle(50, 145, 60);
    }
    else{
      fill(139,0,0);
      circle(50,50,60);
      fill(0,255,0);
      circle(50, 145, 60);
    }
  }
}
