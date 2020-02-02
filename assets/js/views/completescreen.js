import { View } from "../classes/view.js";
import { setView, renderFrame, overlay } from "../app.js";
import MainMenu from "./mainmenu.js";

export default class CompleteScreen extends View {
  constructor() {
    super();
    this.active = false;
    View.clearCanvas();
    this.clickhandlerEvt = this.clickHandler.bind(this);
    overlay.addEventListener("click", this.clickhandlerEvt);
  }
  clickHandler(e) {
    switch (e.target.id) {
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
        <div id="completescreen" class="menu">
            <h1>Well Done!</h1>
            <p>You completed the game</p>
            <button id="main">Main Menu</button>
        </div>`;
  }
}
