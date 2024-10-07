let lionL, lionR;
let facingRight  = true;
let pinImages = [];

function preload(){
  lionL =  loadImage("assets/lion-left.png");
  lionR = loadImage("assets/lion-right.png")
  for(let i = 0; i<9; i++){
    pinImages.push("assets/pin-0"+i+".png")
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  imageMode(CENTER);
}

function draw() {
  background(220);
  if(pmouseX<mouseX){
    facingRight = true;
  }
  else if (pmouseX>mouseX){
    facingRight = false;
  }
  if(facingRight){
    image(lionR, mouseX, mouseY, lionR.width/5, lionR.height/5);
  }
  else{
    image(lionL, mouseX, mouseY, lionL.width/5, lionL.height/5);
  }
  image(pinImages[currentFrame, width/2, height/2]);
  currentFram++;
  if(currentFrame > 8){
    currentFrame = 0;
  }
}
