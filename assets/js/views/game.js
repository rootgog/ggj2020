import {
    View
} from "../classes/view.js";
import Map from "./../classes/map.js";
import player from "../classes/player.js";
import {
    rectCollision,
    rectCircleColliding,
    withinBorderRectRect,
    unitToCanvasConversionRect
} from "../classes/functions.js";
import {
    Pickupable
} from "../classes/pickupables.js";
import {
    Bridge,
    BridgePiece
} from "../classes/bridge.js";
import {
    setView,
    renderFrame,
    levels,
    gameLoop,
    ctx,
    sounds
} from "../app.js";
import DeathScreen from "./deathscreen.js";
import CompleteScreen from "./completescreen.js";
import PauseScreen from "./pause.js";
import {
    Obsticle
} from "../classes/obsticles.js";

class Game extends View {
    constructor({
        level = 0
    } = {}) {
        super();
        this.map;
        this.levelint = level;
        this.level = levels[level]();

        player.inventory = [];

        this.entities = this.level.entities;
        this.setMap(new Map(this.level.map));

        this.keydownhandler = this.keydown.bind(this);
        window.addEventListener("keydown", this.keydownhandler);

        this.soundtrack = sounds.gameLoop;
        this.soundtrack.loop = true;
        this.soundtrack.play();
    }

    keydown(e) {
        if (e.key.toLowerCase() == "escape") {
            if (this.active) {
                this.active = false;
                window.removeEventListener("resize", this.map.resizeHandler);
                cancelAnimationFrame(gameLoop);
                setView(new PauseScreen(this));
                this.soundtrack.pause();
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
                            if (!entity.completed) {
                                const piece = bridgepieces[p];

                                player.inventory.splice(player.inventory.indexOf(piece), 1);

                                entity.addPiece();

                                sounds.addpiece.play();
                            }
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

                                sounds.pickup.play();
                            }
                        }
                    }
                    if (entity instanceof Obsticle) {
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
                                this.soundtrack.pause();
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

            sounds.completelevel.play();

            if (levels.length - 1 == this.levelint) {
                this.active = false;
                cancelAnimationFrame(gameLoop);
                window.removeEventListener("keydown", this.keydownhandler);
                window.removeEventListener("resize", this.map.resizeHandler);
                setView(new CompleteScreen());
                renderFrame();
                this.soundtrack.pause();

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

        if (this.active) {
            //draw inv

            let coords = unitToCanvasConversionRect(
                this.map.width - 3,
                this.map.height - 3,
                2.5,
                2.5
            );
            ctx.beginPath();
            ctx.globalAlpha = 0.5;
            ctx.fillStyle = "black";
            ctx.rect(coords.x, coords.y, coords.w, coords.h);
            ctx.fill();
            ctx.globalAlpha = 1;

            player.inventory.forEach(item => {
                item.draw({
                    x: this.getMap().width - 2.25,
                    y: this.getMap().height - 2.25
                });
            });
        }
    }
}

export {
    Game
};