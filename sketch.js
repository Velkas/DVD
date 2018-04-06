let cnv;
let box;

function setup() {
	cnv = createCanvas(800, 800);
	rectMode(CENTER);
	box = new Box(width/2, height/2);
}

function draw() {
	cnv.background(0);

	box.update();
	box.show();

}