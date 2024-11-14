let scale = 15;
let x = 5;
let interval;

function setup() {
    createCanvas(500, 500);
    background(255);
    interval = random(0,100);
}

function draw() {
    background(255);
    drawTree(width/2, height*.9, 90, 6);
}

function drawLine(x1, y1, x2, y2, depth) {
//draw a line segment connecting (x1,y1) to (x2,y2)
    strokeWeight(depth*1.25);
    line(x1, y1, x2, y2);
}

function drawTree(x1, y1, angle, depth) {
    if (depth > 0) {
        let x2 = x1 + (cos(radians(angle))*depth*scale); //calculate endpoints ofcurrent branch
        let y2 = y1 - (sin(radians(angle))*depth*scale); //using trig ratios. Getshorter based on depth
        drawLine(x1, y1, x2, y2, depth);
        let spread = mouseX/width * 18;
        drawTree(x2, y2, angle-spread, depth-1);
        drawTree(x2, y2, angle+spread, depth-1);
        drawTree(x2, y2, angle, depth-1);
        drawLeaf(x1,y1,x2,y2,depth);
    }
    else{y=0;}
    y++;
}

function keyPressed(){
    if(key==='z'){
        x--;
    }
    else if(key==='x'){
        x++;
    }
}

function drawLeaf(x1,y1,x2,y2,depth){
    randomSeed(y*interval*depth*x2);
    leafColor = [random(0,255),random(0,255),random(0,255)];
    fill(leafColor);
    let d = random(depth*5, depth*5+15)
    if(depth<x){
        line(x1, y1, x2, y2);
        circle(x2,y2,d);
    }
}