let inMenu = true;
let gameId = 0;
let bgImage;
let xScale 
let yScale

function preload(){
  bgImage = loadImage("/Assets/MenuGif.gif");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  xScale = windowWidth/1365;
  yScale = windowHeight/945;

}

function draw() {
  background(220);
  menu();
  //console.log(mouseX, mouseY)
}

function mouseClicked(){
  location.replace("M:/Github Repo/0246bolu.github.io/0246bolu.github.io/Space Invaders/index.html")
}

function menu(){
  image(bgImage, 0, 0, windowWidth, windowHeight);
  fill(0);
  // rect(windowWidth/2-25, windowHeight/2-120, windowWidth/2, windowHeight/3+250);
  //quad(324 * xScale, 52 * yScale, 994 * xScale, 52 * yScale , 984 * xScale, 732 * yScale,  334 * xScale, 732 * yScale);
}
