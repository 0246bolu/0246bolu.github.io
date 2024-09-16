// Interactive Scene
// Lucas Boyd
// 9/16/24
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let numBuildings = 0;
let currentBack = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(RGB);
}

function draw() {
  drawBg();
}

function mouseClicked(){
  if(currentBack<3){
    currentBack++;
  }
  else{
    currentBack===0;
  }
}

function drawBg() {
  if(currentBack = 0){
    background(0, 0, 225);
    fill(255, 255, 0);
    circle(0, 0, 200);
  }
  if(currentBack = 1){
    background(0, 0, 225);
    fill(255, 255, 0);
    circle(0, 0, 200);
  }
  drawCity();
}

function drawCity() {
  fill(150);
  rect(0, windowHeight-windowHeight/10, windowWidth);

  while (numBuildings<=5){
    let heightBuild = random(500, 1000);
    let widthBuild = random(200, 500);
    let buildXPos = random(0, windowWidth);
    let buildYPos = windowHeight-windowHeight/10;

    fill(160,82,45);
    rect(buildXPos, buildYPos, widthBuild, -heightBuild);

    numBuildings++;
  }
}

function drawCharacter() {

}
