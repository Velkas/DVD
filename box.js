class Box {
    constructor(x, y, size) {
        this.pos = createVector(x, y);
        this.size = size || 40;
        this.c = this.getNewColor();
        this.lastC;
        this.curC;

        this.baseSpeed = 1;
        this.maxSpeed = 1.10;
        this.minSpeed = -0.90;
        this.vel = createVector(random(-this.maxSpeed, this.maxSpeed), 
                                random(-this.maxSpeed, this.maxSpeed));
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
        if (this.pos.x - this.size < 0 || this.pos.x + this.size > width) {
            this.vel.x *= -1;
            this.vel.x += random(-0.1, 0.1);
            this.pos.x = (this.pos.x <= 0 + this.size) ? this.size + 1 : width - this.size - 1;
            this.colorSwitch();
        }
        if (this.pos.y - this.size < 0 || this.pos.y + this.size > height) {
            this.vel.y *= -1;
            this.vel.y += random(-0.1, 0.1);
            this.pos.y = (this.pos.y - this.size < 0) ? this.size + 1 : height - this.size - 1;
            this.colorSwitch();
        }
    }

    update() {
        this.hit();
        this.move();
    }

    colorSwitch() {
        this.lastC = this.curC
        let newC = this.getNewColor();
        while (this.lastC === this.curC) {
            newC = this.getNewColor();
        }
        this.c = newC;
    }

    getNewColor() {
        let newColor;
        switch (floor(random(0, 6))) {
            // ROYGBIV
            case 0:
                this.curC = 0;
                newColor = color(255, 0, 0);
                break;
            case 1:
                this.curC = 1;
                newColor = color(255, 127, 0);
                break;
            case 2:
                this.curC = 2;
                newColor = color(255, 255, 0);
                break;
            case 3:
                this.curC = 3;
                newColor = color(0, 255, 0);
                break;
            case 4:
                this.curC = 4;
                newColor = color(0, 0, 255);
                break;
            case 5:
                this.curC = 5;
                newColor = color(75, 0, 130);
                break;
            default:
                this.curC = 6;
                newColor = color(139, 0, 255);
                break;
        }

        return newColor;
    }

    show() {
        fill(this.c);
        noStroke();
        rect(this.pos.x, this.pos.y, this.size * 2, this.size * 2);
    }
}