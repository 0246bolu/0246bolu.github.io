function setup(){
  createCanvas(500, 400);
  draw();
}

function draw(){
  background(220);
  drawCircles();
}

function drawCircles(){
  fill(101,0,255);
  circle(0,0,50);
  fill(150,255,0);
  circle(500,0,50);
  fill(150,0,90);
  circle(500,400,50); 
  fill(0,255,90);
  circle(0,400,50);

  let x = 2/3*width;
  circle(x, 200, 40);
  fill(90,90,90);
}