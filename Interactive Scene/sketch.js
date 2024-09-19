// Interactive Scene
// Lucas Boyd 
// 9/16/24
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let currentBack = 0;
let buildingRan = false;
let windowColor = 0;

let carX = 0;
let carY = 90;

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
  buildingRan = false;
  drawBg();
}

function drawBg() {
  if(currentBack === 0){
    background(0, 0, 225);
    fill(255, 255, 0);
    circle(0, 0, 200);
    windowColor = [0,0,225];
  }
  if(currentBack === 1){
    background(0, 0, 0);
    fill(500);
    circle(0, 0, 200);
    windowColor = [255,255,0];
  }
  if(currentBack === 2){
    background(0, 0, 100);
    fill(255, 255, 0);
    circle(0, 0, 200);
    windowColor = [0,0,100];
  }
  if(currentBack === 3){
    background(0, 0, 150);
    fill(255, 255, 0);
    circle(0, 0, 200);
    windowColor = [0,0,150];
  }

  if (buildingRan === false){
    drawCity();
  }

}

function drawCity() {
  let numBuildings = 0;
  
  fill(150);
  rect(0, windowHeight-windowHeight/10, windowWidth);

  randomSeed(10);

  while (numBuildings<=4){
    let heightBuild = random(300, 700);
    let widthBuild = random(200, 500);
    let buildXPos = random(0, windowWidth);
    let buildYPos = windowHeight-windowHeight/10;

    fill(160,82,45);
    rect(buildXPos, buildYPos, widthBuild, -heightBuild);

    fill(windowColor);
    rect(buildXPos+widthBuild/4, buildYPos-heightBuild/5, widthBuild/8, heightBuild/8);
    rect(buildXPos+widthBuild/1.5, buildYPos-heightBuild/5, widthBuild/8, heightBuild/8);

    rect(buildXPos+widthBuild/4, buildYPos-heightBuild/2, widthBuild/8, heightBuild/8);
    rect(buildXPos+widthBuild/1.5, buildYPos-heightBuild/2, widthBuild/8, heightBuild/8);

    rect(buildXPos+widthBuild/4, buildYPos-heightBuild/1.25, widthBuild/8, heightBuild/8);
    rect(buildXPos+widthBuild/1.5, buildYPos-heightBuild/1.25, widthBuild/8, heightBuild/8);


    numBuildings++;
  }
  
  fill(250);
  textStyle(NORMAL);
  text("Lucas Boyd", 20, windowHeight-windowHeight/10);
  textStyle(ITALIC);
  text("Chicago", 20, windowHeight-windowHeight/12); 
  
  buildingRan = true;
}

function draw(){
  if(keyIsPressed){
    if (key === "d"){
      buildingRan = false;
      drawBg();
      carX += 10;
    }
    if (key === "a"){
      buildingRan = false;
      drawBg();
      carX -= 10;
    }
    if(carX>=windowWidth){
      carX=0;
    }
    if(carX<=0-250){
      carX=windowWidth;
    }
  }

  fill(255);
  ellipse(carX+150, carY+25, 200, 50);
  triangle(carX+70, carY, carX+140, carY, carX, carY-70);
  triangle(carX+80, carY, carX+150, carY, carX, carY+140);
  triangle(carX, carY, carX, carY, carX, carY);
  rect(carX, carY, 150, 50);
}
