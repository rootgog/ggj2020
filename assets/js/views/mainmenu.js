import {
    View,
    Menu
} from "../classes/view.js";
import {
    renderFrame,
    setView,
    sounds
} from "../app.js";
import {
    Game
} from "./game.js";

export default class MainMenu extends Menu {
    constructor() {
        super();
        this.active = false;
        this.clickhandlerEvt = this.clickHandler.bind(this);
        overlay.addEventListener("click", this.clickhandlerEvt);
    }

    clickHandler(e) {
        switch (e.target.id) {
            case "start":
                overlay.innerHTML = "";
                setView(
                    new Game({
                        level: 2
                    })
                );
                overlay.removeEventListener("click", this.clickhandlerEvt);
                renderFrame();
                sounds.menusoundtrack.pause();
                break;
            case "help":
                overlay.innerHTML = /* html */ `
                    <div id="mainmenu" class="menu">
                        <h1>Help</h1>
                        <p>The game is simple, collect the bridge pieces and take them to the bridge, cross to the next level.</p>
                        <h2>Key Bindings</h2>
                        <h4>Movement</h4>
                        <div class="controls">
                            <div class="key w">W</div>
                            <div class="key a">A</div>
                            <div class="key s">S</div>
                            <div class="key d">D</div>
                            <div class="or">or</div>
                            <div class="key up">&#x2B06;</div>
                            <div class="key left">&#x2B05;</div>
                            <div class="key down">&#x2B07;</div>
                            <div class="key right">&#x27A1;</div>
                        </div>
                        <h4>Misc</h4>
                        <div>Pause:<span class="key esc">ESC</span></div>
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
                        <p>Game Made for <a href="https://globalgamejam.org/2020/games/bridge-repair-1"></a>Global Game Jam 2020 by George Bishop</p>
                        <a href="https://georgebishop.me" class="btn">My Portfolio</a>
                        <a href="https://github.com/rootgog" class="btn">My GitHub</a>
                        <button id="main">Main Menu</button>
                    </div>`;
                break;
        }
    }

    draw() {
        View.clearCanvas();
        overlay.innerHTML = /* html */ `
        <div id="mainmenu" class="menu">
            <h1>Bridge Repair</h1>
            <button id="start">Start Game</button>
            <button id="help">Help</button>
            <button id="info">Info</button>
        </div>`;
    }
}