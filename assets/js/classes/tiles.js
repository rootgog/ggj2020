import {
    unitToCanvasConversionRect
} from "./functions.js";
import {
    ctx
} from "../app.js";

class Tile {

    constructor() {
        this.pos = {
            x: 0,
            y: 0
        }
        this.height = 1;
        this.width = 1;
    }

}

class Water extends Tile {
    draw() {

        let coords = unitToCanvasConversionRect(this.pos.x, this.pos.y, this.width, this.height);

        ctx.beginPath();
        ctx.fillStyle = 'blue';
        ctx.rect(coords.x, coords.y, coords.w, coords.h);
        ctx.fill();
    }
}

class Grass extends Tile {
    draw() {
        let coords = unitToCanvasConversionRect(this.pos.x, this.pos.y, this.width, this.height);

        ctx.beginPath();
        ctx.fillStyle = 'green';
        ctx.rect(coords.x, coords.y, coords.w, coords.h);
        ctx.fill();
    }
}

export {
    Grass,
    Water
}