import {
    View
} from "../classes/view.js";
import level1 from "../maps/level1.js";
import Map from "./../classes/map.js";
import player from "../classes/player.js";
import {
    rectCollision,
    rectCircleColliding,
    withinBorderRectRect
} from "../classes/functions.js";
import {
    Pickupable
} from "../classes/pickupables.js";
import {
    SpinningBallBar
} from "../classes/obsticles.js";
import {
    Bridge,
    BridgePiece
} from "../classes/bridge.js";
import level2 from "../maps/level2.js";

class Game extends View {

    constructor() {
        super();
        this.map;
        this.levels = [level1, level2];
        this.level = 0;

        this.entities = this.levels[this.level].entities;

        this.setMap(new Map(this.levels[this.level].map));
    }

    getMap() {
        return this.map;
    }

    setMap(map) {
        this.map = map;
        this.levels[this.level].init();
    }

    checkPlayerCollisions() {
        for (let i = 0; i < this.entities.length; i++) {
            const entity = this.entities[i];
            if (entity != player) {
                if (entity instanceof Bridge) {
                    if (withinBorderRectRect(player, entity, 1)) {

                        let bridgepieces = player.inventory.filter((item) => item instanceof BridgePiece);

                        //consume item
                        for (let p = 0; p < bridgepieces.length; p++) {
                            const piece = bridgepieces[p];


                            player.inventory.splice(player.inventory.indexOf(piece), 1);

                            entity.addPiece();

                            console.log(piece + "added to bridge");

                            console.log(entity.completed);


                        }




                    }
                } else {
                    if (rectCollision(player, entity)) {

                        //pop off entity from entities array
                        if (entity instanceof Pickupable) {
                            this.entities.splice(i, 1);


                            //give item to player
                            player.inventory.push(entity);
                        }
                    }
                    if (entity instanceof SpinningBallBar) {
                        for (let i = 0; i < entity.balls.length; i++) {
                            const ball = entity.balls[i];
                            if (rectCircleColliding(ball, player)) {
                                //player dead
                                console.log(i);
                                this.active = false;
                            }
                        };
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

            entity.draw();
        });

        if (this.levels[this.level].winCondition()) {
            //this.active = false; //stop animation

            if (this.levels.length - 1 == this.level) {
                console.log("all levels done");
            } else {

                //load next level

                this.level++;

                let nextLevel = this.levels[this.level];

                this.entities = nextLevel.entities;

                this.setMap(new Map(nextLevel.map));

                nextLevel.init();

            }
        }
    }
}

export {
    Game
}