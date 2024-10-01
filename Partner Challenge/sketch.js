//Partner challenge
//Lucas Boyd and Lavan Sambavan
// 9/26/2024
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let rectY = 0;
let rectX = 0;


function setup() {
  createCanvas(windowWidth, windowHeight);
  rectMode(CENTER);
}

function draw() {
  background(220);
  rect(rectX+12.5,rectY+12.5,25);
  if(rectX <= windowWidth-12.5){
      rectX+=10;
    }
  else if(rectY < windowHeight-25){
      rectY+=10;
    }
  else if(rectX < windowWidth-12.5 && rectX >= 12.5){
      rectX-=10;
    } 
  else if(rectY < windowHeight-12.5 && rectY >= 12.5){
      rectY-=10;
    }
}
