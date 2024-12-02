// The Balloon Tree
// Lucas Boyd
// 11/18/2024
// Created a semi-fractal tree with random leaf colors that can be adjusted at will


let scale = 15; // Set global variables to be used later
let x = 5;
let interval;
let leaf;
let randomChooser;

function setup() { // Creates canvas and chooses a random number to be used later
    createCanvas(500, 500);
    interval = random(0,100);
}

function draw() { // Runs every frame, sets what leaf its drawing to zero, and draws a tree with specific parameters
    leaf = 0;
    background(255);
    drawTree(width/2, height*.9, 90, 6);
}

function drawLine(x1, y1, x2, y2, depth) { //draw a line segment connecting (x1,y1) to (x2,y2) with varying thickness based on depth
    strokeWeight(depth*1.25);
    line(x1, y1, x2, y2);
}

function drawTree(x1, y1, angle, depth) { // Draws tree and calls drawLeaf function
    if (depth > 0) {
        let x2 = x1 + (cos(radians(angle))*depth*scale); //calculate endpoints ofcurrent branch
        let y2 = y1 - (sin(radians(angle))*depth*scale); //using trig ratios. Getshorter based on depth
        drawLine(x1, y1, x2, y2, depth);
        let spread = mouseX/width * 18;
        drawTree(x2, y2, angle-spread, depth-1);
        drawTree(x2, y2, angle+spread, depth-1);
        drawTree(x2, y2, angle, depth-1);
        drawLeaf(x1,y1,x2,y2,depth);
        leaf++;
    }
}

function keyPressed(){ // Runs when key pressed, if key is z, x is decreased and therefore the height required for a leaf is increased, opposite happens with x
    if(key==='z'){
        x--;
    }
    else if(key==='x'){
        x++;
    }
}

function drawLeaf(x1,y1,x2,y2,depth){ // Draws a leaf at specific size and color based on a random value and depth of its branch
    randomSeed(leaf*interval);
    leafColor = [random(0,255),random(0,255),random(0,255)];
    fill(leafColor);
    let d = random(depth*5, depth*5+15)
    if(depth<x){
        line(x1, y1, x2, y2);
        circle(x2,y2,d);
    }
}
