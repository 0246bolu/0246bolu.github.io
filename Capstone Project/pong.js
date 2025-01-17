let paddle1X;
let paddle1Y;
let paddle2X;
let paddle2Y;
let gameOver = false;
let p1Win = false;
let p2Win = false;
let p1WinCount = 0;
let p2WinCount = 0;
let paddleSpeed = 12;
let pos;
let vel;
let font;
let ballMinusButton;
let ballPlusButton;
let paddleMinusButton;
let paddlePlusButton;

function preload(){
    bounceSound = loadSound("assets/impact-sound-effect-8-bit-retro-151796.mp3");
    scoreSound = loadSound("assets/8-bit-video-game-points-version-1-145826.mp3");
    font = loadFont("assets/ARCADE_N.TTF");
}

function setup(){
    createCanvas(950,948);
    rectMode(CENTER);
    textAlign(CENTER);
    textFont(font);
    paddle1X = 100;
    paddle1Y = height/2;
    paddle2X = width-100;
    paddle2Y = height/2;
    ballMinusButton = createButton("-");
    ballMinusButton.position(692.5,height/13-10);
    ballPlusButton = createButton("+");
    ballPlusButton.position(933.5,height/13-10);
    paddleMinusButton = createButton("-");
    paddleMinusButton.position(1055,height/13-10);
    paddlePlusButton = createButton("+");
    paddlePlusButton.position(1330,height/13-10);
    pos = createVector(width/2, random(0,height));
    let velSign = Math.round(random());
    if(velSign===0){
        vel = createVector(-8,6);
    }
    else{
        vel = createVector(8,6);
    }
}

function draw(){
    background(0);
    ballMinusButton.mousePressed(ballSpeedChange("minus"));
    ballPlusButton.mousePressed(ballSpeedChange("plus"));
    paddleMinusButton.mousePressed(paddleSpeed-=2);
    paddlePlusButton.mousePressed(paddleSpeed+=2);
    for(let i=0;i<windowWidth;i+=60){
        stroke(255);
        strokeWeight(5);
        line(windowHeight/2, i,  windowHeight/2, i+30);
    }
    rect(paddle1X, paddle1Y,height/65,width/14);
    rect(paddle2X, paddle2Y,height/65,width/14);
    if((keyIsDown(87))&&gameOver===false){
        if(paddle1Y>0){
        paddle1Y-=paddleSpeed;
        }
    }
    else if((keyIsDown(83))&&gameOver===false){
        if(paddle1Y<height){
            paddle1Y+=paddleSpeed;
        }
    }
    if((keyIsDown(UP_ARROW))&&gameOver===false){
        if(paddle2Y>0){
        paddle2Y-=paddleSpeed;
        }
    }
    else if((keyIsDown(DOWN_ARROW))&&gameOver===false){
        if(paddle2Y<height){
            paddle2Y+=paddleSpeed;
        }
    }
    textSize(height/12/2);
    strokeWeight(3);
    text(p1WinCount, width/13, height/13);
    text(p2WinCount, width-width/13, height/13);
    strokeWeight(1);
    textSize(height/25/2);
    text("-"+" Ball Speed "+"+", width/13+width/4.5, height/13);
    text("-"+" Paddle Speed "+"+", width-width/13-width/4.5, height/13)
    if(gameOver===false){
        ball();
    }
    else{
        strokeWeight(5);
        if(p1Win===true){
            fill(0,255,0);
            textSize(60/1.5);
            text("PLAYER ONE WINS", width/2, height/2);
            fill(255);
        }
        else{
            fill(0,255,0);
            textSize(60/1.5);
            text("PLAYER TWO WINS", width/2, height/2);
            fill(255);
        }
        textSize(30);
        strokeWeight(1);
        text("PRESS SPACE  TO RESTART", width/2-15, height/2+90);
        if(keyIsDown(32)){
            location.reload();
        }
    }
}

function ballSpeedChange(dir){
    if(dir==="minus"){
        vel.y-=5;
        vel.x-=5;
    }
    else{
        vel.y+=5;
        vel.x+=5;
    }
}

function ball(){
    let left = pos.x-width/120;
    let right = pos.x+width/120;
    let top = pos.y-width/120;
    let bottom = pos.y+width/120;
    let p1Left = paddle1X-height/65/2;
    let p1Right = paddle1X+height/65/2;
    let p1Top = paddle1Y-width/14/2;
    let p1Bottom = paddle1Y+width/14/2;
    let p2Left = paddle2X-height/65/2;
    let p2Right = paddle2X+height/65/2;
    let p2Top = paddle2Y-width/14/2;
    let p2Bottom = paddle2Y+width/14/2;
    strokeWeight(0);
    fill(255);
    pos.add(vel);
    if(right>p1Left&&left<p1Right&&bottom>p1Top&&top<p1Bottom){
        if(vel.x<0){
            vel.x *= -1;
            if(keyIsDown(87)){
                vel.y = abs(vel.y)*(-1);
            }
            else if(keyIsDown(83)){
                vel.y = abs(vel.y);
            }
            pos.x = p1Right+height/120+5;
            bounceSound.play();
        }
    }
    if(left<p2Right&&right>p2Left&&bottom>p2Top&&top<p2Bottom){
        if (vel.x>0){
            vel.x *= -1;
            if(keyIsDown(UP_ARROW)){
                vel.y = abs(vel.y)*(-1);
            }
            else if(keyIsDown(DOWN_ARROW)){
                vel.y = abs(vel.y);
            }
            pos.x = p2Left-height/120+5;
            bounceSound.play();
        }
    }
    if(pos.x<=0){
        if(p2WinCount<3&&p1WinCount<3){
            p2WinCount++;
            scoreSound.play();
            if(p2WinCount<3&&p1WinCount<3){
                pos.x = width/2;
                pos.y = height/2;
                let velSign = Math.round(random());
                if(velSign===0){
                    vel = createVector(-8,6);
                }
                else{
                    vel = createVector(8,6);
                }
            }
            paddle1Y = height/2;
            paddle2Y = height/2;
        }
        else{
            gameOver = true;
            p2Win = true;
        }
    }
    if(pos.x>=width){
        if(p1WinCount<3&&p2WinCount<3){
            p1WinCount++;
            scoreSound.play();
            if(p2WinCount<3&&p1WinCount<3){
                pos.x = width/2;
                pos.y = height/2;
                let velSign = Math.round(random());
                if(velSign===0){
                    vel = createVector(-8,6);
                }
                else{
                    vel = createVector(8,6);
                }
            }
            paddle1Y = height/2;
            paddle2Y = height/2;
        }
        else{
            gameOver = true;
            p1Win = true;
        }
    }
    if(pos.y<0){
        vel.y *= -1;
        bounceSound.play();
    }
    if(pos.y>height){
      vel.y *= -1;
      bounceSound.play();
    }
    rect(pos.x, pos.y, height/60);
}