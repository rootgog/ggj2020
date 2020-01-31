import {
    ctx,
    deltaTime,
    view
} from "../app.js";

export default class Player {
    constructor() {
        window.addEventListener("keydown", this.keyDown.bind(this));
        window.addEventListener("keyup", this.keyUp.bind(this));
        this.pos = {
            x: 200,
            y: 200
        }
        this.up = 0;
        this.right = 0;
        this.speed = 100;
        this.width = 35;
        this.height = 35;
        this.dir = 0;
    }

    draw() {
        this.updatePosition();
        ctx.beginPath();
        ctx.fillStyle = 'red';
        ctx.rect(this.pos.x, this.pos.y, this.width, this.height);
        ctx.fill();
    }

    keyDown(e) {
        switch (e.key.toLowerCase()) {
            case "w":
                //up
                this.up = -this.speed;
                break;
            case "a":
                //left
                this.right = -this.speed;
                break;
            case "s":
                //down
                this.up = this.speed;
                break;
            case "d":
                //right
                this.right = this.speed;
                break;
        }
    }
    keyUp(e) {
        switch (e.key.toLowerCase()) {
            case "w":
                //up
                this.up = 0;
                break;
            case "a":
                //left
                this.right = 0;
                break;
            case "s":
                //down
                this.up = 0;
                break;
            case "d":
                //right
                this.right = 0;
                break;
        }
    }
    updatePosition() {

        view.getMap().collisions(this);

        this.pos.x += this.right * deltaTime;
        this.pos.y += this.up * deltaTime;
    }
}