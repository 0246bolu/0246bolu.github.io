// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"
let x,y;
let w = 50;

function setup() {
  createCanvas(windowWidth, windowHeight);
  rectMode(CENTER);
  nofill();
}

function draw() {
  // background(220);
  circle(x,y,w);
  x = lerp(x,mouseX,0.12);
  y = lerp(y,mouseY,0.12);

  let r = map(x, 0, width, 0, 255);
  let g = map(x, 0, height, 0, 255);
  let b = map(x, 0, height, 255, 0);

  stroke(r,g,b);
  circle(x,y,w);
}

function mouseWheel(event){
  print(event.delta);
  if(event.delta > 0){
    w-=10;
    if(w<10) w=10;
  }
  else w += 10;
}

