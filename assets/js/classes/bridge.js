import {
    unitToCanvasConversionRect
} from "./functions.js";
import {
    ctx
} from "../app.js";
import {
    Pickupable
} from "./pickupables.js";

class Bridge {
    constructor({
        x = 5,
        y = 2,
        w = 2,
        h = 3
    } = {}) {
        this.pos = {
            x: x,
            y: y
        }
        this.width = w;
        this.height = h;
    }
    draw() {
        let coords = unitToCanvasConversionRect(this.pos.x, this.pos.y, this.width, this.height);
        ctx.beginPath();
        ctx.fillStyle = 'saddlebrown';
        ctx.rect(coords.x, coords.y, coords.w, coords.h);
        ctx.fill();
    }
}

class BridgePiece extends Pickupable {

}

export {
    Bridge,
    BridgePiece
}