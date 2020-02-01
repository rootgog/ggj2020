import {
    pointFromPoint
} from "./functions.js";
import {
    view,
    ctx,
    deltaTime
} from "../app.js";

class SpinningBallBar {
    constructor({
        x = 1.5,
        y = 1.5,
        balls = 5,
        gap = 0.25,
        speed = 150
    } = {}) {
        this.pos = {
            x: x,
            y: y
        }
        this.balls = balls;
        this.gap = gap;
        this.speed = speed;
        this.rotation = 0;
    }

    updateRotation() {
        this.rotation += this.speed * deltaTime;
    }

    draw() {
        let gap = this.gap;
        for (let i = 0; i < this.balls; i++) {
            let ballcoords = pointFromPoint(this.pos.x, this.pos.y, gap, this.rotation);
            Ball.draw(ballcoords.x, ballcoords.y, 0.05);
            gap += this.gap;
        }
        this.updateRotation();
    }
}

class Ball {
    static draw(x, y, r) {

        let unit = view.getMap().getUnitSize();

        ctx.beginPath();
        ctx.fillStyle = 'lightblue';
        ctx.arc(x * unit, y * unit, r * unit, 0, 2 * Math.PI);
        ctx.fill();
    }
}

export {
    SpinningBallBar
}