class Box {
  constructor(x, y, img) {
    this.pos = createVector(x, y);
    this.img = img;
    this.size = createVector(this.img.width, this.img.height);
    this.baseSpeed = 10;
    this.maxSpeed = 10;
    this.minSpeed = -10;
    this.vel = createVector(
      random(-this.maxSpeed, this.maxSpeed),
      random(-this.maxSpeed, this.maxSpeed)
    );
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
    if (
      this.pos.x - this.size.x < 0 - this.size.x ||
      this.pos.x + this.size.x > width
    ) {
      this.vel.x *= -1;
      this.vel.x += random(-1, 1);
      this.pos.x = this.pos.x <= 0 + this.size.x ? 1 : width - this.size.x - 1;
    }
    if (
      this.pos.y - this.size.y < 0 - this.size.y ||
      this.pos.y + this.size.y > height
    ) {
      this.vel.y *= -1;
      this.vel.y += random(-1, 1);
      this.pos.y = this.pos.y - this.size.y < 0 ? 1 : height - this.size.y - 1;
    }
  }

  update() {
    this.hit();
    this.move();
  }

  show() {
    image(this.img, this.pos.x, this.pos.y, this.size.x, this.size.y);
  }
}
