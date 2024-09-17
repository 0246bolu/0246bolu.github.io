// Interactive Scene
// Lucas Boyd
// 9/16/24
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

// let numBuildings = 0;
let currentBack = 0;
let buildingRan = false;

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(RGB);
  drawBg();
}

function mouseClicked(){
  if(currentBack<3){
    currentBack++;
  }
  else{
    currentBack=0;
  }
  drawBg();
  buildingRan = false;
}

function drawBg() {
  if(currentBack === 0){
    background(0, 0, 225);
    fill(255, 255, 0);
    circle(0, 0, 200);
  }
  if(currentBack === 1){
    background(0, 0, 0);
    fill(255, 255, 0);
    circle(0, 0, 200);
  }
  if(currentBack === 2){
    background(0, 0, 100);
    fill(255, 255, 0);
    circle(0, 0, 200);
  }
  if(currentBack === 3){
    background(0, 0, 150);
    fill(255, 255, 0);
    circle(0, 0, 200);
  }

  if (buildingRan === false){
    drawCity();
  }

}

function drawCity() {
  let numBuildings = 0;
  
  fill(150);
  rect(0, windowHeight-windowHeight/10, windowWidth);

  while (numBuildings<=4){
    let heightBuild = random(300, 700);
    let widthBuild = random(200, 500);
    let buildXPos = random(0, windowWidth);
    let buildYPos = windowHeight-windowHeight/10;

    fill(160,82,45);
    rect(buildXPos, buildYPos, widthBuild, -heightBuild);

    numBuildings++;
  }

  buildingRan = true;
}

function drawCharacter() {
  
}
