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

let bridge = new Image();
bridge.src = `./assets/img/bridge.png`;
let brokenbridge = new Image();
brokenbridge.src = `./assets/img/bridge-broken.png`;
let grass = new Image();
grass.src = `./assets/img/grass.png`;
let water = new Image();
water.src = `./assets/img/water.png`;
let sticks = new Image();
sticks.src = `./assets/img/sticks.png`;
let fireball = new Image();
fireball.src = `./assets/img/fire-ball.png`;
let player = new Image();
player.src = `./assets/img/player.png`;

let sprites = {
    bridge: bridge,
    grass: grass,
    water: water,
    sticks: sticks,
    brokenbridge: brokenbridge,
    fireball: fireball,
    player: player
}

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
    sounds,
    sprites
};