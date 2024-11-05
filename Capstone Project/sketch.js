let inMenu = true;
let gameId = 0;
let bgImage;

function preload(){
  bgImage =  loadImage("Assets/MenuBackground.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  imageMode(CENTER);
}

function draw() {
  background(220);
  menu();
}

function menu(){
  image(bgImage,windowWidth/2,windowHeight/2,  windowWidth, windowHeight); 
}