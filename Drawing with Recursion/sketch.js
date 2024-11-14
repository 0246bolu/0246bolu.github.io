
function setup() {
  createCanvas(windowWidth, windowHeight);
  noFill();
}

function draw() {
  background(255);
  circleInCircle(width/2, height/2, width);
}

function circleInCircle(x,y,d){
  if(d>10){
    circle(x,y,d);
    let den = map(mouseX,0,width, 1.01, 1.5);
    circleInCircle(x,y,d/den);
  }
}