import {
    canvas,
    ctx
} from "./../app.js";

export class View {
    draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
}