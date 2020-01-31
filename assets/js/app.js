import {
    Game
} from "./views/game.js";

let canvas = document.getElementById("game");
let ctx = canvas.getContext("2d");

window.addEventListener("resize", e => {
    setCanvasFullScreen();
});

let setCanvasFullScreen = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

//init

setCanvasFullScreen();


let view = new Game();


let deltaTime;
let lastFrame = Date.now();

let gameLoop;

let renderFrame = () => {
    deltaTime = (Date.now() - lastFrame) / 1000;
    lastFrame = Date.now();

    view.draw();

    requestAnimationFrame(renderFrame);
}

gameLoop = requestAnimationFrame(renderFrame);

export {
    deltaTime,
    ctx,
    canvas,
    gameLoop,
    view
}