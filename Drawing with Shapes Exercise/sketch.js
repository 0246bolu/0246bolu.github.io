let headSize = 150;

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(RGB);
}

function draw() {
  noStroke();
  background(500);
  fill(170,250,170);
  circle(windowWidth/2, windowHeight/2, headSize);
  rect(windowWidth/2-headSize/2,windowHeight/2, headSize, headSize/2 );
  rect(windowWidth/2-headSize/2,windowHeight/2, headSize/12, headSize/1.4);
  rect(windowWidth/2+headSize/2-headSize/12,windowHeight/2, headSize/12, headSize/1.4);
  stroke(0);
  strokeWeight(headSize/50);
  line(windowWidth/2-headSize/4, windowHeight/2+headSize/5, windowWidth/2+headSize/4, windowHeight/2+headSize/5);
  fill(0);
  circle(windowWidth/2-headSize/4, windowHeight/2, headSize/10);
  circle(windowWidth/2+headSize/4, windowHeight/2, headSize/10);
}
