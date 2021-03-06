import {
    canvas,
    ctx,
    sounds
} from "./../app.js";

export class View {
    constructor() {
        this.active = true;
    }
    draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    static clearCanvas() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
}


export class Menu extends View {
    constructor() {
        super();
        sounds.menusoundtrack.loop = true;
        sounds.menusoundtrack.play();
    }
}