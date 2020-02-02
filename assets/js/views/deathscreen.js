import {
    View,
    Menu
} from "../classes/view.js";
import {
    setView,
    renderFrame,
    view,
    overlay,
    sounds
} from "../app.js";
import MainMenu from "./mainmenu.js";
import {
    Game
} from "./game.js";

export default class DeathScreen extends Menu {
    constructor({
        level
    } = {}) {
        super();
        this.active = false;
        this.level = level;
        this.clickhandlerEvt = this.clickHandler.bind(this);
        overlay.addEventListener("click", this.clickhandlerEvt);
    }
    clickHandler(e) {
        switch (e.target.id) {
            case "restart":
                sounds.menusoundtrack.pause();
                overlay.innerHTML = "";
                setView(
                    new Game({
                        level: this.level
                    })
                );
                overlay.removeEventListener("click", this.clickhandlerEvt);
                renderFrame();
                break;
            case "main":
                overlay.innerHTML = "";
                setView(new MainMenu());
                overlay.removeEventListener("click", this.clickhandlerEvt);
                renderFrame();
                break;
        }
    }
    draw() {
        View.clearCanvas();
        overlay.innerHTML = /* html */ `
        <div id="deathscreen" class="menu">
            <h1>You Died</h1>
            <button id="restart">Restart Level</button>
            <button id="main">Main Menu</button>
        </div>`;
    }
}