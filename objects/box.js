class Box {
  constructor(x, y, img) {
    this.pos = createVector(x, y);
    this.img = img;
    this.size = createVector(this.img.width, this.img.height);
    this.hitCount = 0;
    this.maxSpeed = 2;
    this.minMaxOffset = 0.25;
    this.maxSpeedDiff = 1;
    this.randJitter = 0.2;
    this.tint = 127;
    this.flashCounter = 8000;
    this.blinkCounter = 45000;
    // starting direction should be random
    this.vel = createVector(
      random(1) >= 0.5
        ? random(-this.maxSpeed * -1, this.maxSpeed) + random(-0.01, 0.01)
        : -random(-this.maxSpeed * -1, this.maxSpeed) + random(-0.01, 0.01),
      random(1) >= 0.5
        ? random(-this.maxSpeed * -1, this.maxSpeed) + random(-0.01, 0.01)
        : -random(-this.maxSpeed * -1, this.maxSpeed) + random(-0.01, 0.01)
    );
    this.flashing = false;
    this.detecting = true;
    this.corner = [false, false, false, false]; // LU, RU, LD, RD
  }

  move() {
    // clamp the values in a donut shape so its never too slow or too fast
    let xClamp = this.clamp(
      Math.abs(this.vel.x),
      this.maxSpeed - this.maxSpeed * this.minMaxOffset,
      this.maxSpeed + this.maxSpeed * this.minMaxOffset
    );
    this.vel.x < 0 ? (this.vel.x = xClamp * -1) : (this.vel.x = xClamp);

    let yClamp = this.clamp(
      Math.abs(this.vel.y),
      this.maxSpeed - this.maxSpeed * this.minMaxOffset,
      this.maxSpeed + this.maxSpeed * this.minMaxOffset
    );
    this.vel.y < 0 ? (this.vel.y = yClamp * -1) : (this.vel.y = xClamp);

    let xDeltaAdj = this.clamp(
      Math.abs(this.vel.x),
      Math.abs(this.vel.y) - this.maxSpeedDiff,
      Math.abs(this.vel.y) + this.maxSpeedDiff
    );
    this.vel.x < 0 ? (this.vel.x = xDeltaAdj * -1) : (this.vel.x = xDeltaAdj);

    // do the move
    this.pos = p5.Vector.add(this.pos, this.vel);
  }

  hit() {
    let hitL = this.pos.x - this.size.x < 0 - this.size.x;
    let hitR = this.pos.x + this.size.x > width;
    let hitU = this.pos.y - this.size.y < 0 - this.size.y;
    let hitD = this.pos.y + this.size.y > height;

    // check X bounds
    if (hitL || hitR) {
      this.vel.x *= -1;
      this.vel.x += random(-this.randJitter, this.randJitter);
      this.pos.x = this.pos.x <= 0 + this.size.x ? 1 : width - this.size.x - 1;
    }

    // check Y bounds
    if (hitU || hitD) {
      this.vel.y *= -1;
      this.vel.y += random(-this.randJitter, this.randJitter);
      this.pos.y = this.pos.y - this.size.y < 0 ? 1 : height - this.size.y - 1;
    }

    // we hit a corner! special surprise :)
    if (this.detecting && ((hitL && hitU) || (hitL && hitD) || (hitR && hitU) || (hitR && hitD))) {
      this.hitCount++;
      this.flashing = true;
      this.detecting = false;

      this.corner[0] = hitL && hitU;
      this.corner[1] = hitR && hitU;
      this.corner[2] = hitL && hitD;
      this.corner[3] = hitR && hitD;
    }
  }

  blink() {
    // reset the gif counter if its complete
    if (this.blinkCounter <= 0) {
      this.img.reset();
      this.blinkCounter = random(25000, 65000);
    }

    this.blinkCounter -= 60;
  }

  update() {
    this.hit();
    this.move();
    this.blink();

    // flash counter is up
    if (this.flashCounter <= 0) {
      this.flashCounter = 8000;
      this.tint = 127;
      this.flashing = false;
      this.detecting = true;
    }
  }

  show() {
    // flashing reward for corner hit!
    if (this.flashing) {
      colorMode(HSB);
      tint(this.tint, 200, 255);
      this.tint = this.tint <= 1 ? (this.tint = 255) : (this.tint -= 10);
      this.flashCounter -= 60;

      for (let i in this.corner) {
        if (this.corner[i]) {
          emitters[i].emit(5);
        }
      }
    }
    // flashing is not happening
    else {
      noTint();

      this.corner = [false, false, false, false];
    }

    // draw the maggles
    image(this.img, this.pos.x, this.pos.y, this.size.x, this.size.y);

    // draw the hit counter so we know how many happened
    if (this.hitCount > 0) {
      textSize(32);
      fill(255);
      strokeWeight(4);
      stroke(0);
      text(this.hitCount, this.pos.x + 10, this.pos.y + 48);
    }
  }

  clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
  }
}
