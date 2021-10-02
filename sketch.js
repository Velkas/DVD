let box;
let img;
let emitters = [];
let emitterSpeed = 0.2;

function preload() {
  img = loadImage("assets/Maggie_blink.gif");
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
  let boxSpawnX = random(5 + img.width, width - img.width - 5);
  let boxSpawnY = random(5 + img.height, height - img.height - 5);
  box = new Box(boxSpawnX, boxSpawnY, img);
  box.manualControl = false;
}

function draw() {
  clear();

  box.update();
  box.show();

  for (let e of emitters) {
    e.update();
    e.show();
  }
}

function mousePressed() {
  if (
    (mouseX > box.pos.x && mouseX < box.pos.x + box.size.x && mouseY > box.pos.y && mouseY < box.pos.y + box.size.y) ||
    box.manualControl
  ) {
    box.manualControl = !box.manualControl;
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);

  box = null;
  emitters = [];

  emitters.push(new Emitter(0, 0, createVector(emitterSpeed, emitterSpeed))); // top left
  emitters.push(new Emitter(width, 0, createVector(-emitterSpeed, emitterSpeed))); // top right
  emitters.push(new Emitter(0, height, createVector(emitterSpeed, -emitterSpeed))); // bottom left
  emitters.push(new Emitter(width, height, createVector(-emitterSpeed, -emitterSpeed))); // bottom right

  box = new Box(random(width / 3, width / 4), random(height / 3, height / 4), img);
}
