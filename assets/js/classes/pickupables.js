import {
    view,
    ctx
} from "./../app.js";

class Pickupable {
    constructor({
        img = null,
        width = 0.2,
        height = 0.2,
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
    draw() {

        let unit = view.getMap().getUnitSize();
        let padding = view.getMap().getPadding();

        ctx.beginPath();
        ctx.fillStyle = 'darkgreen';
        ctx.rect((this.pos.x * unit) + padding.x, (this.pos.y * unit) + padding.y, this.width * unit, this.height * unit);
        ctx.fill();
    }
}

export {
    Pickupable
}