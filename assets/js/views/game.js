import { View } from "../classes/view.js";
import Map from "./../classes/map.js";
import player from "../classes/player.js";
import {
  rectCollision,
  rectCircleColliding,
  withinBorderRectRect
} from "../classes/functions.js";
import { Pickupable } from "../classes/pickupables.js";
import { SpinningBallBar } from "../classes/obsticles.js";
import { Bridge, BridgePiece } from "../classes/bridge.js";
import { setView, renderFrame, levels, gameLoop } from "../app.js";
import DeathScreen from "./deathscreen.js";
import CompleteScreen from "./completeScreen.js";
import PauseScreen from "./pause.js";

class Game extends View {
  constructor({ level = 0 } = {}) {
    super();
    this.map;
    this.levelint = level;
    this.level = levels[level]();

    player.inventory = [];

    this.entities = this.level.entities;
    this.setMap(new Map(this.level.map));

    this.keydownhandler = this.keydown.bind(this);
    window.addEventListener("keydown", this.keydownhandler);
  }

  keydown(e) {
    if (e.key.toLowerCase() == "escape") {
      if (this.active) {
        this.active = false;
        window.removeEventListener("keydown", this.keydownhandler);
        window.removeEventListener("resize", this.map.resizeHandler);
        cancelAnimationFrame(gameLoop);
        setView(new PauseScreen(this));
      }
    }
  }

  getLevel() {
    return this.levelint;
  }

  getMap() {
    return this.map;
  }

  setMap(map) {
    this.map = map;
    this.level.init();
  }

  checkPlayerCollisions() {
    for (let i = 0; i < this.entities.length; i++) {
      const entity = this.entities[i];
      if (entity != player) {
        if (entity instanceof Bridge) {
          if (withinBorderRectRect(player, entity, 1)) {
            let bridgepieces = player.inventory.filter(
              item => item instanceof BridgePiece
            );

            //consume item
            for (let p = 0; p < bridgepieces.length; p++) {
              const piece = bridgepieces[p];

              player.inventory.splice(player.inventory.indexOf(piece), 1);

              entity.addPiece();
            }
          }
        } else {
          if (rectCollision(player, entity)) {
            //pop off entity from entities array
            if (entity instanceof Pickupable) {
              if (player.inventory.length < player.maxInventory) {
                this.level.entities.splice(i, 1);
                //give item to player
                player.inventory.push(entity);
              }
            }
          }
          if (entity instanceof SpinningBallBar) {
            for (let i = 0; i < entity.balls.length; i++) {
              const ball = entity.balls[i];
              if (rectCircleColliding(ball, player)) {
                //player dead
                window.removeEventListener("keydown", this.keydownhandler);
                window.removeEventListener("resize", this.map.resizeHandler);
                this.active = false;
                cancelAnimationFrame(gameLoop);
                setView(
                  new DeathScreen({
                    level: this.levelint
                  })
                );
                renderFrame();
              }
            }
          }
        }
      }
    }
  }

  draw() {
    super.draw();
    //draw elements
    this.map.draw();

    this.checkPlayerCollisions();

    this.entities.forEach(entity => {
      //if colliding pickup else draw

      if (this.active) {
        entity.draw();
      }
    });

    if (this.level.winCondition()) {
      //this.active = false; //stop animation

      if (levels.length - 1 == this.levelint) {
        this.active = false;
        cancelAnimationFrame(gameLoop);
        window.removeEventListener("keydown", this.keydownhandler);
        window.removeEventListener("resize", this.map.resizeHandler);
        setView(new CompleteScreen());
        renderFrame();

        console.log("all levels done");
      } else {
        //load next level

        this.levelint++;
        window.removeEventListener("keydown", this.keydownhandler);
        window.removeEventListener("resize", this.map.resizeHandler);
        setView(
          new Game({
            level: this.levelint
          })
        );
        renderFrame();
      }
    }
  }
}

export { Game };
