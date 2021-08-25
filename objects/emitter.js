class Emitter {
  constructor(x, y, direction) {
    this.position = createVector(x, y);
    this.particles = [];
    this.direction = direction.mult(2);
    this.gravity = createVector(0, 0.2);
  }

  emit(num) {
    for (let i = 0; i < num; i++) {
      this.particles.push(new Particle(this.position.x, this.position.y));
    }
  }

  update() {
    for (let particle of this.particles) {
      particle.applyForce(this.direction.mult(this.gravity));
      particle.update();
    }

    for (let i = this.particles.length - 1; i >= 0; i--) {
      if (this.particles[i].finished()) {
        this.particles.splice(i, 1);
      }
    }
  }

  show() {
    for (let particle of this.particles) {
      particle.show();
    }
  }
}
