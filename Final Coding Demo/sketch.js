// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let gorillaIdle = [];
let gorillaSwipe = [];
let gorillaState = 0;
let idleIndex = 0;
let swipeIndex = 0;
let spirals = []; 

function preload(){
  for(let i=1;i<=6;i++){
    gorillaIdle.push(loadImage("assets/Gorilla/idle"+i+".png"));
    gorillaSwipe.push(loadImage("assets/Gorilla/swipe"+i+".png"));
  }
  for(let i=0; i<=15; i++){
    if(i<10){
      spirals.push(loadImage("assets/Circle/Circle Animation0"+i+".png"));
    }
    else{
      spirals.push(loadImage("assets/Circle/Circle Animation"+i+".png"));
    }
  }
}


function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);
}
