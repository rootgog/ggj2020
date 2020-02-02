import {
    ctx
} from "./../app.js";
import {
    unitToCanvasConversionRect
} from "./functions.js";

class Pickupable {
    constructor({
        img = null,
        width = 1,
        height = 1,
        x = 1.5,
        y = 1.5
    } = {}) {
        this.img = img;
        this.pos = {
            x: x,
            y: y
        }
        this.width = width;
        this.height = height;
    }
}

export {
    Pickupable
}