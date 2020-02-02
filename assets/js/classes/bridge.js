import {
    unitToCanvasConversionRect
} from "./functions.js";
import {
    ctx,
    sprites
} from "../app.js";
import {
    Pickupable
} from "./pickupables.js";

class Bridge {
    constructor({
        x = 5,
        y = 2,
        w = 2,
        h = 3,
        piecesRequired = 3
    } = {}) {
        this.pos = {
            x: x,
            y: y
        }
        this.width = w;
        this.height = h;
        this.piecesRequired = piecesRequired;
        this.piecesAquired = 0;
        this.completed = false;
    }
    draw() {
        let coords = unitToCanvasConversionRect(this.pos.x, this.pos.y, this.width, this.height);
        ctx.beginPath();
        if (this.completed) {
            ctx.drawImage(sprites.bridge, coords.x, coords.y, coords.w, coords.h);
        } else {
            ctx.drawImage(sprites.brokenbridge, coords.x, coords.y, coords.w, coords.h);
        }
        ctx.fill();
    }
    addPiece() {
        this.piecesAquired++;
        if (this.piecesAquired == this.piecesRequired) {
            this.completed = true;
        }
    }
}

class BridgePiece extends Pickupable {
    draw({
        x = this.pos.x,
        y = this.pos.y,
        w = this.width,
        h = this.height
    } = {}) {

        let coords = unitToCanvasConversionRect(x, y, w, h);

        ctx.beginPath();
        ctx.drawImage(sprites.sticks, coords.x, coords.y, coords.w, coords.h);
        ctx.fill();
    }
}

export {
    Bridge,
    BridgePiece
}