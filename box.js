class Box {
    constructor(x, y, s, c) {
        this.pos = createVector(x, y);
        this.size = s || 50;
        this.c = c || color(255, 0, 0);

        this.baseSpeed = 1;
        this.maxSpeed = 1.10;
        this.minSpeed = 0.90;
        this.vel = createVector(random(-this.maxSpeed, this.maxSpeed), 
                                random(-this.maxSpeed, this.maxSpeed));
    }

    move() {
        // if (this.vel.x < this.minSpeed || this.vel.x > this.maxSpeed) {
        //     this.vel.x = this.baseSpeed;
        // }
        // if (this.vel.y < this.minSpeed || this.vel.y > this.maxSpeed) {
        //     this.vel.y = this.baseSpeed;
        // }
        this.pos = p5.Vector.add(this.pos, this.vel);
    }

    hit() {
        if (this.pos.x < 0 + this.size || this.pos.x > width - this.size) {
            console.log(this.vel);
            this.vel.x *= -1;
            this.vel.x += random(-0.1, 0.1);
            this.colorSwitch();
        }
        if (this.pos.y < 0 + this.size || this.pos.y > height - this.size) {
            console.log(this.vel);
            this.vel.y *= -1;
            this.vel.y += random(-0.1, 0.1);
            this.colorSwitch();
        }
    }

    update() {
        this.hit();
        this.move();
    }

    colorSwitch() {
        let oldC = this.c;
        let newC = this.getNewColor();
        while (newC === oldC) {
            newC = getNewColor();
        }
        this.c = newC;
    }

    getNewColor() {
        let newColor;
        switch (floor(random(0, 6))) {
            // ROYGBIV
            case 0:
                newColor = color(255, 0, 0);
                break;
            case 1:
                newColor = color(255, 127, 0);
                break;
            case 2:
                newColor = color(255, 255, 0);
                break;
            case 3:
                newColor = color(0, 255, 0);
                break;
            case 4:
                newColor = color(0, 0, 255);
                break;
            case 5:
                newColor = color(75, 0, 130);
                break;
            default:
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