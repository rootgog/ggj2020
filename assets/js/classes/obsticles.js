import {
    pointFromPoint,
    unitToCanvasConversionArc
} from "./functions.js";
import {
    ctx,
    deltaTime,
    view
} from "../app.js";

class Obsticle {

}

class SpinningBallBar extends Obsticle {
    constructor({
        x = 4,
        y = 4,
        ballscount = 5,
        gap = 0.5,
        speed = 100,
        rotation = 0,
        clockwise = true
    } = {}) {
        super();
        this.pos = {
            x: x,
            y: y
        }
        this.ballscount = ballscount;
        this.gap = gap;
        this.speed = speed;
        this.rotation = rotation;
        this.balls = [];
        this.clockwise = clockwise;
        for (let b = 0; b < this.ballscount; b++) {
            this.balls.push(new Ball());
        }
        this.calculateBallPositions();
    }

    updateRotation() {
        if (this.clockwise) {
            this.rotation += this.speed * deltaTime;
        } else {
            this.rotation -= this.speed * deltaTime;
        }
    }

    calculateBallPositions() {
        let gap = 0;
        for (let i = 0; i < this.ballscount; i++) {
            let ballcoords = pointFromPoint(this.pos.x, this.pos.y, gap, this.rotation);
            this.balls[i].pos = ballcoords;
            gap += this.gap;
        }
    }

    draw() {
        this.balls.forEach(ball => {
            ball.draw();
        });
        this.updateRotation();
        this.calculateBallPositions();
    }
}


class ScrollingBallBar extends Obsticle {
    constructor({
        x = 4,
        y = 4,
        ballscount = 5,
        gap = 2,
        radius = 0.4,
        speed = 2,
        distance = 15,
        direction = 0,
        angle = 90
    } = {}) {
        super();
        this.startPos = {
            x: x,
            y: y
        }
        this.pos = this.startPos;
        this.distanceTraveled = 0;
        this.ballscount = ballscount;
        this.gap = gap;
        this.speed = speed;
        this.distance = distance;
        this.direction = direction;
        this.returning = false;
        this.angle = angle;
        this.balls = [];
        this.radius = radius;
        for (let b = 0; b < this.ballscount; b++) {
            this.balls.push(new Ball({
                r: radius
            }));
        }
        this.calculateBallPositions();
    }

    calculateBallPositions() {

        if (this.returning) {
            this.distanceTraveled -= this.speed * deltaTime;
        } else {
            this.distanceTraveled += this.speed * deltaTime;
        }

        if (this.distanceTraveled > this.distance && !this.returning) {
            //spin round
            this.distanceTraveled = this.distance;
            this.returning = true;
        }

        if (this.distanceTraveled < 0 && this.returning) {
            this.returning = false;
            this.distanceTraveled = 0;
        }

        let barpos = pointFromPoint(this.startPos.x, this.startPos.y, this.distanceTraveled, this.direction);
        this.pos = barpos;

        let gap = 0;
        for (let i = 0; i < this.ballscount; i++) {
            let ballcoords = pointFromPoint(this.pos.x, this.pos.y, gap, this.angle);
            this.balls[i].pos = ballcoords;
            gap += this.gap;
        }
    }

    draw() {
        this.balls.forEach(ball => {
            ball.draw();
        });
        this.calculateBallPositions();
    }
}


class Ball {

    constructor({
        x = 1,
        y = 1,
        r = 0.2
    } = {}) {
        this.pos = {
            x: x,
            y: y
        }
        this.r = r;
    }

    draw() {

        let coords = unitToCanvasConversionArc(this.pos.x, this.pos.y, this.r);

        ctx.beginPath();
        ctx.fillStyle = 'red';
        ctx.arc(coords.x, coords.y, coords.r, 0, 2 * Math.PI);
        ctx.fill();
    }
}

export {
    Obsticle,
    SpinningBallBar,
    ScrollingBallBar
}