import { Game } from "./views/game.js";
import MainMenu from "./views/mainmenu.js";
import level1 from "./maps/level1.js";
import level2 from "./maps/level2.js";

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

setCanvasFullScreen();

let view = new MainMenu();

let setView = newView => {
  view = newView;
};

let deltaTime;
let lastFrame = Date.now();

let levels = [level1, level2];

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
  overlay
};
