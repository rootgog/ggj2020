import {
    View,
    Menu
} from "../classes/view.js";
import {
    renderFrame,
    setView,
    overlay,
    sounds
} from "../app.js";
import MainMenu from "./mainmenu.js";

export default class PauseScreen extends Menu {
    constructor(game) {
        super();
        this.active = false;
        this.game = game;
        View.clearCanvas();
        this.clickhandlerEvt = this.clickHandler.bind(this);
        overlay.addEventListener("click", this.clickhandlerEvt);
    }
    clickHandler(e) {
        switch (e.target.id) {
            case "resume":
                overlay.innerHTML = "";
                setView(this.game);
                this.game.active = true;
                renderFrame();
                sounds.menusoundtrack.pause();
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
        overlay.innerHTML = /* html */ `
        <div id="pause" class="menu">
            <h1>Paused</h1>
            <button id="resume">Resume</button>
            <button id="main">Main Menu</button>
        </div>`;
    }
}