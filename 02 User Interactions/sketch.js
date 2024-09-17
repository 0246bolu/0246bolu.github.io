// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let tSize = 40;

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  textSize(random(10, 100));
  background(0);
  fill(random(0,500), random(0, 500), random(0, 500))
  text(mouseX, random(windowWidth, 0), random(0, windowHeight));
  text(mouseX, random(windowWidth, 0), random(0, windowHeight));
  text(mouseX, random(windowWidth, 0), random(0, windowHeight));
  text(mouseY,  random(windowWidth, 0),  random(0, windowHeight));
  text(mouseX, random(windowWidth, 0), random(0, windowHeight));
  text(mouseX, random(windowWidth, 0), random(0, windowHeight));
  text(mouseX, random(windowWidth, 0), random(0, windowHeight));
  text(mouseY,  random(windowWidth, 0),  random(0, windowHeight));
}
