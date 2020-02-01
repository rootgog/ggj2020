import {
    pointFromPoint,
    unitToCanvasConversionArc
} from "./functions.js";
import {
    view,
    ctx,
    deltaTime
} from "../app.js";

class SpinningBallBar {
    constructor({
        x = 4,
        y = 4,
        ballscount = 5,
        gap = 0.5,
        speed = 100
    } = {}) {
        this.pos = {
            x: x,
            y: y
        }
        this.ballscount = ballscount;
        this.gap = gap;
        this.speed = speed;
        this.rotation = 0;
        this.balls = [];
        for (let b = 0; b < this.ballscount; b++) {
            this.balls.push(new Ball());
        }
        this.calculateBallPositions();
    }

    updateRotation() {
        this.rotation += this.speed * deltaTime;
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
    SpinningBallBar
}