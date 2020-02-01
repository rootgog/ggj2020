import {
    ctx,
    deltaTime,
    view
} from "../app.js";
import {
    unitToCanvasConversionRect,
    rectCollision
} from "./functions.js";
import {
    Bridge
} from "./bridge.js";

class Player {
    constructor({
        x = 1,
        y = 1
    } = {}) {
        window.addEventListener("keydown", this.keyDown.bind(this));
        window.addEventListener("keyup", this.keyUp.bind(this));
        this.pos = {
            x: x,
            y: y
        }
        this.up = 0;
        this.right = 0;
        this.speed = 10;
        this.width = 0.5;
        this.height = 0.5;
        this.dir = 0;
        this.inventory = [];
    }

    draw() {
        this.updatePosition();

        let coords = unitToCanvasConversionRect(this.pos.x, this.pos.y, this.width, this.height);

        ctx.beginPath();
        ctx.fillStyle = 'black';
        ctx.rect(coords.x, coords.y, coords.w, coords.h);
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

        let newpos = {
            pos: {
                x: this.pos.x + this.right * deltaTime,
                y: this.pos.y + this.up * deltaTime
            },
            width: this.width,
            height: this.height
        }

        if (view.getMap().isInBounds(newpos)) {

            let moveLegal = true;

            view.entities.forEach(entity => {
                if (entity != player) {
                    if (entity instanceof Bridge) {
                        if (!entity.completed) {
                            if (rectCollision(entity, newpos)) {
                                moveLegal = false;
                            }
                        } else {
                            if (rectCollision(entity, newpos)) {
                                console.log("colliding");
                                //no out on x axis
                                if (newpos.pos.x < entity.pos.x ||
                                    newpos.pos.x + newpos.width > entity.pos.x + entity.width) {
                                    moveLegal = false;
                                }
                            }
                        }
                    }
                }
            });

            if (moveLegal) {
                this.pos.x = newpos.pos.x;
                this.pos.y = newpos.pos.y;
            }


        } else {
            //console.log("out of bounds");
        }




    }
}

let player = new Player();

export default player;