let degree = 45;

function setup() {
  createCanvas(500, 500);
  angleMode(DEGREES);
}


function draw() {
  background(220);
  circle(width/2, height/2, 200);
  let centerX = width/2
  let centerY = height/2
  for(let i = 0; i<4; i++){
    line(width/2,height/2-100,width/2,height/2-50);
    translate(centerX,centerY);
    rotate(90);
    translate(100,100);
  }
}
