let box;
let img;

function preload() {
  img = loadImage("maggie_blink.gif");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  rectMode(CENTER);
  frameRate(60);

  // add the one true maggs
  box = new Box(width / 2, height / 2, img);
}

function draw() {
  colorMode(RGB);

  background(0, 255, 0);

  box.update();
  box.show();
}
