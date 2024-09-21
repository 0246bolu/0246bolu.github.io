// Interactive Scene
// Lucas Boyd 
// 9/21/24
//This project creates a city by randomly generating buildings, and allows the user to control a plane, as well as change the color of the sky and plane.

let currentBack = 0;              //Defining Global Variables to be used elsewhere
let buildingRan = false;
let windowColor = 0;

let carX = 20;                    
let carY = 90;

let planeIteration = 0;
let planeColor = 0;
let colorChange = false;

function setup() {     // Sizes canvas on which the city will be draw, sets color mode and calls the background drawer
  createCanvas(windowWidth, windowHeight);
  colorMode(RGB);
  drawBg(); 
}


function mouseClicked(){  // Checks if mouse is clicked, and if it is, it changes the currentBack variable by one and calls the background drawer again
  if(currentBack<3){
    currentBack++;
  }
  else{
    currentBack=0;
  }
  buildingRan = false;
  drawBg();
}

function drawBg() {  //Draws the background, whose color depends on the current value of currentBack(see the mouseClicked funtion)
  if(currentBack === 0){
    background(0, 0, 225);
    fill(255, 255, 0);
    circle(0, 0, 200);
    windowColor = [0,0,225];
  }
  else if(currentBack === 1){
    background(0, 0, 0);
    fill(500);
    circle(0, 0, 200);
    windowColor = [255,255,0];
  }
  else if(currentBack === 2){
    background(0, 0, 100);
    fill(255, 255, 0);
    circle(0, 0, 200);
    windowColor = [0,0,100];
  }
  else if(currentBack === 3){
    background(0, 0, 150);
    fill(255, 255, 0);
    circle(0, 0, 200);
    windowColor = [0,0,150];
  }

  if (buildingRan === false){  // Checks if buildings have already been drawn. If not, the drawCity function is called
    colorChange = false;
    drawCity();
  }
}

function drawCity() { // Draws the ground, then runs a loop 5 times that draws the buildings and a random position and size and their respective windows, and then finally writes Lucas Boyd and then the name of the piece in itallics
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
    rect(buildXPos, buildYPos, widthBuild, -heightBuild); //Drawing the buildings

    fill(windowColor);
    rect(buildXPos+widthBuild/4, buildYPos-heightBuild/5, widthBuild/8, heightBuild/8);   //Drawing the windows
    rect(buildXPos+widthBuild/1.5, buildYPos-heightBuild/5, widthBuild/8, heightBuild/8);

    rect(buildXPos+widthBuild/4, buildYPos-heightBuild/2, widthBuild/8, heightBuild/8);
    rect(buildXPos+widthBuild/1.5, buildYPos-heightBuild/2, widthBuild/8, heightBuild/8);

    rect(buildXPos+widthBuild/4, buildYPos-heightBuild/1.25, widthBuild/8, heightBuild/8);
    rect(buildXPos+widthBuild/1.5, buildYPos-heightBuild/1.25, widthBuild/8, heightBuild/8);


    numBuildings++;
  }
  
  fill(250);  //Writing the Lucas Boyd and Chicago
  textStyle(NORMAL); 
  text("Lucas Boyd", 20, windowHeight-windowHeight/10);
  textStyle(ITALIC);
  text("Chicago", 20, windowHeight-windowHeight/12); 
  
  buildingRan = true;
}

function draw(){ //Runs every frame, checks for user input to move and change the color of the plane, which is then drawn
  if(keyIsPressed){
    if (key === "c"  && colorChange===false){
      if(planeIteration<2){
        planeIteration++;
      }
      else if(planeIteration>=2){
        planeIteration = 0;
      }
      colorChange = true;
    }
    if (key === "d"){
      buildingRan = false;
      drawBg();
      carX += 10;
    }
    else if (key === "a"){
      buildingRan = false;
      drawBg();
      carX -= 10;
    }
    if(carX>=windowWidth){  //Checks if plane is off screen. If it is, it is transported to the other side of the screen
      carX=0;
    }
    else if(carX<=-75){
      carX=windowWidth;
    }
  }

  if(planeIteration === 0){
    planeColor = [255,255,255];
  }
  else if(planeIteration === 1){
    planeColor = [255,0,0];
  }
  else if(planeIteration === 2){
    planeColor = [0,128,0];
  }

  fill(planeColor);  // Drawing the plane
  ellipse(carX+150/2, carY+25/2, 200/2, 50/2); 
  triangle(carX+70/2, carY, carX+140/2, carY, carX, carY-70/2);
  triangle(carX+80/2, carY, carX+150/2, carY, carX, carY+140/2);
  triangle(carX-1/2, carY+50/2, carX+50/2, carY+50/2, carX, carY-70/2);
  strokeWeight(0);
  rect(carX, carY, 150/2, 50/2);
  strokeWeight(1);
  
  fill(0);
  rect(carX+175/2, carY+2/2, 25/2);
  ellipse(carX+205/2, carY+15/2, 50/2, 25/2);

  let windiesNum = 0;
  let windowOffset = 15;

  while(windiesNum <= 3){ //Loop to draw windows
    fill(0);
    circle(carX+windowOffset, carY+25/2, 16/2);
    windiesNum++;
    windowOffset+=35/2;
  }
}
