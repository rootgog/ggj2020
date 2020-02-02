import {
    pointFromPoint,
    unitToCanvasConversionArc
} from "./functions.js";
import {
    ctx,
    deltaTime
} from "../app.js";

class SpinningBallBar {
    constructor({
        x = 4,
        y = 4,
        ballscount = 5,
        gap = 0.5,
        speed = 100,
        rotation = 0,
        clockwise = true
    } = {}) {
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


class ScrollingBallBar {
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


        let distance = this.speed * deltaTime;


        if (this.returning) {
            this.distanceTraveled -= distance;
        } else {

            this.distanceTraveled += distance;
        }

        if (this.distanceTraveled > this.distance && !this.returning) {
            //spin round
            this.direction += 180;
            this.returning = true;
        }

        if (this.distanceTraveled < 0 && this.returning) {
            this.direction -= 180;
            this.returning = false;
        }

        let barpos = pointFromPoint(this.pos.x, this.pos.y, distance, this.direction);
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
    SpinningBallBar,
    ScrollingBallBar
}