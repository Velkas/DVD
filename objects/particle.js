class Particle {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.vel = p5.Vector.random2D();
    this.vel.mult(random(1, 3));
    this.acc = createVector(0, 0);
    this.size = createVector(random(10, 14), random(12, 16));
    this.maxSizeX = this.size.x;
    this.r = random(4, 8);
    this.lifetime = random(400, 500);
    this.color = random(255);
    this.rot = random(0, 20);
    this.fixedRot = random(PI);
  }

  finished() {
    return this.lifetime < 0;
  }

  applyForce(force) {
    this.acc.add(force);
  }

  edges() {
    if (this.pos.y >= height - this.r) {
      this.pos.y = height - this.r;
      this.vel.y *= -1;
    }

    if (this.pos.x >= width - this.r) {
      this.pos.x = width - this.r;
      this.vel.x *= -1;
    } else if (this.pos.x <= this.r) {
      this.pos.x = this.r;
      this.vel.x *= -1;
    }
  }

  update() {
    this.edges();
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.set(0, 0);

    this.rot += 0.15;
    this.lifetime -= 7;
    this.size.x = map(sin(this.rot), -1, 1, 2, this.maxSizeX / 1.5);
  }

  show() {
    push();
    colorMode(HSB);
    noStroke();
    fill(this.color, 255, 255, map(this.lifetime, 20, 500, 0.1, 1)); //, this.lifetime);
    translate(this.pos.x, this.pos.y);
    rotate(this.fixedRot);
    rect(0, 0, this.size.x, this.size.y);
    pop();
  }
}
