let gridSpacing = 20;


function setup() {
  createCanvas(windowWidth, windowHeight);
  // loopReview();
}

function loopReview(){
  for(let x=0;x<4;x++){
    for(let y=0;y<4;y++){
      console.log(x,y);
    }
  }
}

function draw() {
  background(220);
  // renderGrid();
  for(let i=0; i<width; i += 40){
    circle(i,0,20);
    line(i,0,mouseX,mouseY);
  }
  for(let m=0; m<height; m += 40){
    circle(width,m,20);
    line(width,m,mouseX,mouseY);
  }
  for(let r=width; r>0; r -= 40){
    circle(r,height,20);
    line(r,height,mouseX,mouseY);
  }
  for(let l=height; l>0; l -= 40){
    circle(0,l,20);
    line(0,l,mouseX,mouseY);
  }
}

function circleDistance(x1,y1,x2,y2){
  let a = abs(x1-x2);
  let b = abs(y1 - y2);
  let c = sqrt(sq(a)+sq(b));
  return round(c);
}

function renderGrid(){
  for(let x=0;x<width;x=x+gridSpacing){
    for(let y=0;y<height;y=y+gridSpacing){
      let  d = circleDistance(x,y,mouseX,mouseY);
      if(d>150){
        fill(0);
      }
      else{
        fill(200,50,120);
      }
      circle(x,y,gridSpacing);
      fill(200);
      textSize(gridSpacing/2);
      textAlign(CENTER,CENTER);
      text(d,x,y);
    }
  }
}
