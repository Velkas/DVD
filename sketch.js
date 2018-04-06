let cnv;
let box = [];
let clicks = 0;
let slide;
let slideVal;

function setup() {
	cnv = createCanvas(800, 800);
	rectMode(CENTER);
	cnv.mouseClicked(makeBox);
	slide = createSlider(1, 50, 40, 1);
	slideVal = createP(slide.value());
	slide.mouseMoved(changeSize);

	box.push(new Box(width/2, height/2, slide.value()));
}

function draw() {
	cnv.background(0);

	if (clicks === 0) {
		fill(255);
		textAlign(CENTER, CENTER);
		textSize(72);
		noStroke();
		text("CLICK", width/2, height/2);
	}

	slideVal.html(slide.value());

	for (let b = box.length - 1; b > 0; b--) {
		box[b].update();
		box[b].show();
	}
}

function makeBox() {
	if (clicks === 0) {
		clicks++;
	}
	if (box.length > 200) {
		box.splice(0, 1);
	} else {
		box.push(new Box(width/2, height/2, slide.value()));
	}
}

function changeSize() {
	for (let b = box.length - 1; b > 0; b--) {
		box[b].size = slide.value();
	}
}