import {
    View
} from "../classes/view.js";
import {
    renderFrame,
    setView
} from "../app.js";
import {
    Game
} from "./game.js";

export default class MainMenu extends View {

    constructor() {
        super();
        this.active = false;
    }

    draw() {
        let overlay = document.getElementById("overlay");
        overlay.innerHTML = /* html */ `
        <div id="mainmenu" class="menu">
            <h1>Bridge Repair</h1>
            <button id="start">Start Game</button>
            <button id="help">Help</button>
            <button id="info">Info</button>
        </div>`;

        overlay.addEventListener("click", e => {
            switch (e.target.id) {
                case "start":
                    overlay.innerHTML = "";
                    setView(new Game());
                    renderFrame();
                    break;
                case "help":
                    overlay.innerHTML = /* html */ `
                    <div id="mainmenu" class="menu">
                        <h1>Help</h1>
                        <p>The game is simple, collect the bridge pieces and take them to the bridge, cross to the next level.</p>
                        <h2>Controls</h2>
                        <div id="controls">
                            <div></div>
                            <div class="key">W</div>
                            <div></div>
                            <div class="key">A</div>
                            <div class="key">S</div>
                            <div class="key">D</div>
                        </div>
                        <button id="main">Main Menu</button>
                    </div>`;
                    break;
                case "main":
                    this.draw();
                    break;
                case "info":
                    overlay.innerHTML = /* html */ `
                    <div id="mainmenu" class="menu">
                        <h1>Info</h1>
                        <p>Game Made for Global Game Jam 2020 by George Bishop</p>
                        <a href="https://georgebishop.me" class="btn">My Portfolio</a>
                        <button id="main">Main Menu</button>
                    </div>`;
                    break;
            }
        });
    }
}