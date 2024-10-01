let circleTime = 5;
let circleInterval = 0.09;

function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate(15);
}

function draw() {
  background(255);
  line(width/2,0, width/2,height);
  randomCircle();
  noiseCircle();
  staircase();
}

function randomCircle(){
  let cSize = random(10,200);
  circle(width/4,height/2,cSize);
  textSize(30);
  textAlign(CENTER, CENTER);
  text(round(cSize), width/4, height/1.5);
}

function noiseCircle(){
  let cSize = noise(circleTime);
  cSize = map(cSize, 0, 1, 10, 255);
  circle(width*0.75, height/2, cSize);
  text(round(cSize), width*0.75, height/1.5);
  circleTime += circleInterval;
}

function staircase(){
  let rectWidth = 20;
  for(let x=0; x <= width; x += rectWidth){
    noFill();
    let rectHeight = random(50,100);
    rect(x, height, rectWidth, -rectHeight);
  }
}