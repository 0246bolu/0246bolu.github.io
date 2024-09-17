

let rX = 50; 
let rY = 50;

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);
  if(keyIsPressed){
    if (key === "s"){
      rY += 10;
    }
    if (key === "w"){
      rY -= 10;
    }

    if(rY>=windowHeight){
      ry=0;
    }
  }
  fill(50,150,255)
  rect(rX, rY, 100, 100)
}

function keyPressed(){
  if(keyCode===40){
    rY += 100;
  }
}

