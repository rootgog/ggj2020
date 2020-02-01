import {
    canvas,
    ctx
} from "./../app.js";

export class View {
    constructor() {
        this.active = true;
    }
    draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
}