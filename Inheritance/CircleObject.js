class CircleObject extends AnimatedObject{
    constructor(x,y){
        super(x,y);
        this.size = random(20,40);
    }

    display(){
        strokeWeight(2);
        let d = dist(mouseX, mouseY, this.x, this.y);
        if(d<this.size/2){
            fill(255,0,0);
        }
        else{
            fill(255);
        }
        circle(this.x, this,y, this.size);
    }
}