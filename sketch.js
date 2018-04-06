let cnv;
let box = [];

function setup() {
	cnv = createCanvas(800, 800);
	rectMode(CENTER);
	cnv.mouseClicked(makeBox);

	box.push(new Box(width/2, height/2));
}

function draw() {
	cnv.background(0);

	for (let b = box.length - 1; b > 0; b--) {
		box[b].update();
		box[b].show();
	}
}

function makeBox() {
	if (box.length > 20) {
		box.splice(0, 1);
	} else {
		box.push(new Box(width/2, height/2));
	}
}
