// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let perlinTime = 20;
let terrainSteepness = 0.01;

let rectWidth = 20;

let tallest = 0;

let flagX = 0;
let flagY = 0;


function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate(10);
}

function draw() {
  background(220);
  if(keyIsPressed){
    if(keyCode===39){
      rectWidth+=5;
    }
    if(keyCode===37 && rectWidth > 5){
        rectWidth-=5;
    }
  }
  terrain();
}

function terrain(){
  let flagHeightList = [];
  for(let x=0; x <= width; x += rectWidth){
    noFill();
    let rectHeight = noise(perlinTime);
    rectHeight = map(rectHeight, 0, 1, 5, windowHeight-windowHeight/5);
    rect(x, height, rectWidth, -rectHeight);
    perlinTime += terrainSteepness;
    flagHeightList.push(rectHeight);
  }
  perlinTime = 20;
  for (let r=0; r < flagHeightList.length; r++) {
    if (flagHeightList[r] > tallest) {
        tallest = flagHeightList[r];
        flagX = r*rectWidth+rectWidth/2;
        flagY = windowHeight-tallest;
    }
  }
  tallest = 0;
  drawFlag(flagX,flagY);
}

function drawFlag(x, y){
  strokeWeight(5);
  line(x,y,x,y-50);
  triangle(flagX,flagY-50,flagX,flagY-25,flagX+20,flagY-37.5);
  strokeWeight(1);
}
