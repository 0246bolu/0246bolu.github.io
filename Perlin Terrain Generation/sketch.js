// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let perlinTime = 20;
let terrainSteepness = 0.01;


function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate(10);
}

function draw() {
  background(220);
  terrain();
}

function terrain(){
  let rectWidth = 20;
  for(let x=0; x <= width; x += rectWidth){
    noFill();
    let rectHeight = noise(perlinTime);
    rectHeight = map(rectHeight, 0, 1, 15, 200);
    rect(x, height, rectWidth, -rectHeight);
    perlinTime += terrainSteepness;
  }
  perlinTime = 20;
}
