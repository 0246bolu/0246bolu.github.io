// Perlin Noise Terrain Generation
// Lucas Boyd
// 10/3/2024
// Uses Perlin noise to generate terrain, each frame drawing a flag at the highest point, finding the average height and drawing a line there and panning


let perlinTime = 20; // Assigning values to global variables to be used later
let terrainSteepness = 0.01;
let rectWidth = 10;

let tallest = 0;

let flagX = 0;
let flagY = 0;

let timePassed = 0;


function setup() { //Sets up canvas, determines frame rate and sets color mode to RGB
  createCanvas(windowWidth, windowHeight);
  frameRate(60);
  colorMode(RGB);
}

function draw() { // Runs every frame, drawing the background, checking for arrow key presses to increase and decrease rectangle width and calls the terrain drawing function
  background(220);
  if(keyIsPressed){
    if(keyCode===39){
      rectWidth+=1;
    }
    if(keyCode===37 && rectWidth > 1){
        rectWidth-=1;
    }
  }
  terrain();
}

function terrain(){
  let flagHeightList = []; // Resets dynamic variables and arrays for usage each time the terrain is drawn
  let average = 0;
  let tallest = 0;
  let heightAdder = 0;
  for(let x=0; x <= windowWidth; x += rectWidth){ // Loop that draws rectangles of random height and at a predetermined width until the screen is filled
    noFill();
    let rectHeight = noise(perlinTime+timePassed); // Randomly generates rectangles and adds time elapsed to pan
    rectHeight = map(rectHeight, 0, 1, 5, windowHeight-windowHeight/5);
    rect(x, height, rectWidth, -rectHeight);
    perlinTime += terrainSteepness;
    flagHeightList.push(rectHeight); // Adds each rectangle height to an array to be used later
  }
  for(let r=0; r < flagHeightList.length; r++) { // Parses through aforementioned array to find tallest point, then creates two variables which determine the flag's x and y positions from that information
    if (flagHeightList[r] > tallest) {
        tallest = flagHeightList[r];
        flagX = r*rectWidth+rectWidth/2;
        flagY = windowHeight-tallest;
    }
  perlinTime = 20;
  }
  for(let i=0; i < flagHeightList.length; i++){ // For each item in the flagHeightList, it adds the value to heightAdder
    heightAdder+=flagHeightList[i];
  }
  average = heightAdder/flagHeightList.length; // Finds the average by dividing the added heights by the amount of rectangles on screen
  timePassed+=0.01; 
  drawFlag(flagX,flagY);
  drawAverage(average);
}

function drawFlag(x, y){ // Draws a green flag at predetermined tallest peak at x and y
  strokeWeight(5);
  line(x,y,x,y-50);
  fill(0,255,0);
  triangle(x,y-50,x,y-25,x+20,y-37.5);
  noFill();
  strokeWeight(1);
}

function drawAverage(average){ // Draws a green line at the average terrain height
  strokeWeight(3);
  stroke(0,255,0);
  line(0, windowHeight-average, windowWidth, windowHeight-average);
  stroke(0);
  strokeWeight(1);
}
