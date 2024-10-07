let scl = 40;
let w = 1600;
let h = 2400;
let cols = w / scl;
let rows = h / scl;
let diff = 100;
let xyScale = 0.2;
const timeScale = 1;

function setup() {
  createCanvas(600, 600, WEBGL);
  setInterval(() => console.log(frameRate()),1000);
}

let terrain = (function(){
  let t = [];
  for (let i=0; i<rows*cols; ++i) t.push(0);
  return t;
})();

function getZ(x, y) {
  return map(noise(x*xyScale, y*xyScale), 0, 1, -diff, diff);
}

function draw() {
  background(0);
  stroke(255);
  noFill();

  //translate(-width/2, -height/2);
  rotateX(PI / 2.3);
  translate(-w / 2, -h/2);

  // let terrain = emptyTerrain();
  for (let y = 0; y < rows; ++y) {
    for (let x = 0; x < cols; ++x) {
      terrain[x+y*rows] = getZ(x, (y-frameCount)*timeScale);
    }
  }

  for (let y = 0; y < rows-1; ++y) {
    beginShape(TRIANGLE_STRIP);
    for (let x = 0; x < cols; ++x) {
      vertex(x*scl, (y+0)*scl, terrain[x+(y+0)*rows]);
      vertex(x*scl, (y+1)*scl, terrain[x+(y+1)*rows]);
    }
    endShape();
  }
}
