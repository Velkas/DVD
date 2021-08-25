let box;
let img;
let emitters = [];
let emitterSpeed = 0.2;

function preload() {
  img = loadImage("assets/maggie_blink.gif");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  rectMode(CENTER);
  frameRate(60);

  img.resize(img.width * 0.95, 0);

  emitters.push(new Emitter(0, 0, createVector(emitterSpeed, emitterSpeed))); // top left
  emitters.push(new Emitter(width, 0, createVector(-emitterSpeed, emitterSpeed))); // top right
  emitters.push(new Emitter(0, height, createVector(emitterSpeed, -emitterSpeed))); // bottom left
  emitters.push(new Emitter(width, height, createVector(-emitterSpeed, -emitterSpeed))); // bottom right

  // add the one true maggs
  box = new Box(width / 2, height / 2, img);
}

function draw() {
  colorMode(RGB);
  clear();
  //background(0, 0, 0, 0);

  box.update();
  box.show();

  for (let e of emitters) {
    e.update();
    e.show();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
