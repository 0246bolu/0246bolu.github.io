let currentColor = 0;
let mycolor;
let circleSize = 50;
let growing = false;

function setup() {
  createCanvas(windowWidth, windowHeight);
  myColor = color(200,120,210);
}

function draw() {
  background(220);
  switch(currentColor){
    case 0:
      fill(255); break;
    case 1:
      fill(myColor); break;
    case 2:
      fill(0,50,210); break;
  }
  if(frameCount %10 ===0){
    currentColor+=1;
    if (currentColor>2) currentColor = 0;
  }

  circle(width/2, height/2, circleSize);

  if(growing) circleSize += 2;
  else circleSize -= 2;
}

function keyPressed(){
  if(key==="a"){
    growing = !growing;
  }
}
