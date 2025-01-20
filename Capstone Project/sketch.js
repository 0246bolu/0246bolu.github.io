let inMenu = true;
let gameId = 0;
let bgImage;
let bgMusic;
let logo;
let xScale;
let yScale;
let i = 0;

function preload(){
  bgImage = loadImage("assets/MenuGif.gif");
  bgMusic = loadSound("assets/retro-game-arcade-236133.mp3");
  logo = loadImage("assets/logo.png");

}

function setup() {
  createCanvas(windowWidth, windowHeight);
  xScale = windowWidth/1365;
  yScale = windowHeight/945;
}

function draw() {
  background(220);
  menu();
  if(i===0){
    bgMusic.loop();
    i++;
  }
}

function menu(){
  image(bgImage, 0, 0, windowWidth, windowHeight);
  imageMode(CENTER);
  image(logo, width/2, height/5.75, logo.width/1.4,logo.height/1.4);
  imageMode(CORNER);
}
