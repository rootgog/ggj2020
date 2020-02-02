import {
    Game
} from "./views/game.js";
import MainMenu from "./views/mainmenu.js";
import level1 from "./maps/level1.js";
import level2 from "./maps/level2.js";
import level3 from "./maps/level3.js";

let canvas = document.getElementById("game");
let ctx = canvas.getContext("2d");

window.addEventListener("resize", e => {
    setCanvasFullScreen();
});

let setCanvasFullScreen = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
};

//init

let sounds = {
    pickup: new Audio("assets/audio/pickup.wav"),
    addpiece: new Audio("assets/audio/bridgepieceadded.wav"),
    completelevel: new Audio("assets/audio/completelevel.wav"),
    click: new Audio("assets/audio/click.wav"),
    menusoundtrack: new Audio("assets/audio/menu.wav"),
    gameLoop: new Audio("assets/audio/gameloop.wav")
};

window.addEventListener("click", e => {
    if (e.target.localName == "button") {
        sounds.click.play();
    }
});

setCanvasFullScreen();

let view = new MainMenu();

let setView = newView => {
    view = newView;
};

let deltaTime;
let lastFrame = Date.now();

let levels = [level1, level2, level3];

let gameLoop;

let renderFrame = () => {
    deltaTime = (Date.now() - lastFrame) / 1000;
    lastFrame = Date.now();

    if (view != null) {
        view.draw();

        if (view.active) {
            requestAnimationFrame(renderFrame);
        }
    }
};

let overlay = document.getElementById("overlay");

gameLoop = requestAnimationFrame(renderFrame);

export {
    deltaTime,
    ctx,
    canvas,
    gameLoop,
    view,
    renderFrame,
    setView,
    levels,
    overlay,
    sounds
};