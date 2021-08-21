class Box {
  constructor(x, y, img) {
    this.pos = createVector(x, y);
    this.img = img;
    this.size = createVector(this.img.width, this.img.height);
    this.hitCount = 0;
    this.maxSpeed = 3;
    this.minSpeed = -3;
    this.tint = 127;
    this.counter = 1200;
    this.vel = createVector(
      random(1) >= 0.5
        ? random(this.minSpeed * -1, this.maxSpeed) + random(-0.01, 0.01)
        : -random(this.minSpeed * -1, this.maxSpeed) + random(-0.01, 0.01),
      random(1) >= 0.5
        ? random(this.minSpeed * -1, this.maxSpeed) + random(-0.01, 0.01)
        : -random(this.minSpeed * -1, this.maxSpeed) + random(-0.01, 0.01)
    );
    this.flashing = false;
    this.detecting = true;
    print(this.vel);
  }

  move() {
    if (this.vel.x < this.minSpeed) {
      this.vel.x = this.minSpeed;
    }
    if (this.vel.y < this.minSpeed) {
      this.vel.y = this.minSpeed;
    }
    this.pos = p5.Vector.add(this.pos, this.vel);
  }

  hit() {
    var hitLR = false;
    var hitUD = false;
    if (
      this.pos.x - this.size.x < 0 - this.size.x ||
      this.pos.x + this.size.x > width
    ) {
      this.vel.x *= -1;
      this.vel.x += random(-0.1, 0.1);
      this.pos.x = this.pos.x <= 0 + this.size.x ? 1 : width - this.size.x - 1;
      hitLR = true;
    }
    if (
      this.pos.y - this.size.y < 0 - this.size.y ||
      this.pos.y + this.size.y > height
    ) {
      this.vel.y *= -1;
      this.vel.y += random(-0.1, 0.1);
      this.pos.y = this.pos.y - this.size.y < 0 ? 1 : height - this.size.y - 1;
      hitUD = true;
    }

    if (hitLR && hitUD && this.detecting) {
      this.hitCount++;
      this.flashing = true;
      this.detecting = false;
    }
  }

  update() {
    this.hit();
    this.move();
  }

  show() {
    if (this.counter <= 0) {
      this.counter = 3000;
      this.flashing = false;
      this.detecting = true;
    }
    if (this.flashing) {
      colorMode(HSB);
      tint(this.tint, 127, 127);
      this.tint = this.tint <= 1 ? (this.tint = 255) : (this.tint -= 10);
      this.counter -= 60;
    } else {
      noTint();
    }

    image(this.img, this.pos.x, this.pos.y, this.size.x, this.size.y);
    textSize(28);
    fill(255);
    strokeWeight(4);
    stroke(0);
    text(this.hitCount, this.pos.x + 10, this.pos.y + 32);
  }
}
