let points = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(255);
  for(let i = 0; i<points.length; i++){
    points[i].move();
    points[i].connectPoints(points);
    points[i].display();
  }
}

function mouseClicked(){
  points.push(new MiniPoint(mouseX,mouseY));
}

class MiniPoint{
  constructor(x,y){
    this.x = x;
    this.y = y;
    this.s = 20;
    this.c = color(random(255), random(255), random(255));
    this.noiseX = random(10);
    this.noiseY = random(10);
    this.MAX_SPEED = 5;
    this.offset = 0.1;
  }

  display(){
    fill(this.c);
    noStroke();
    console.log(this.x);
    ellipse(this.x,this.y,this.s, this.s);
  }

  connectPoints(pointArray){
    stroke(this.c);
    for(let i=0;i<pointArray.length;i++){
      if(this!==pointArray[i]){
        if(dist(this.x,this.y,pointArray[i].getX(),pointArray[i].getY())<100){
          line(this.x,this.y,pointArray[i].getX(),pointArray[i].getY());
        }
      }
    }
  }
  
  getX(){return this.x;}
  getY(){return this.y;}

  move(){
    let xSpeed = map(noise(this.noiseX),0,1,-this.MAX_SPEED,this.MAX_SPEED);
    let ySpeed = map(noise(this.noiseY),0,1,-this.MAX_SPEED,this.MAX_SPEED);
    this.x += xSpeed;
    this.y += ySpeed;
    console.log(xSpeed);
    this.noiseX += this.offset;
    this.noiseY += this.offset;
  }

}