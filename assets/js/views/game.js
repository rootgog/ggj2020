import {
    View
} from "../classes/view.js";
import level1 from "../maps/level1.js";
import Map from "./../classes/map.js";
import player from "../classes/player.js";
import {
    rectCollision,
    rectCircleColliding
} from "../classes/functions.js";
import {
    Pickupable
} from "../classes/pickupables.js";
import {
    SpinningBallBar
} from "../classes/obsticles.js";
import {
    gameLoop
} from "../app.js";

class Game extends View {

    constructor() {
        super();
        this.map;
        this.levels = [level1];
        this.level = 0;

        this.entities = this.levels[this.level].entities;

        this.setMap(new Map(this.levels[this.level].map));
    }

    getMap() {
        return this.map;
    }

    setMap(map) {
        this.map = map;
    }

    checkPlayerCollisions() {
        for (let i = 0; i < this.entities.length; i++) {
            const entity = this.entities[i];
            if (entity != player) {
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

    draw() {
        super.draw();
        //draw elements
        this.map.draw();

        this.entities.forEach(entity => {

            //if colliding pickup else draw

            this.checkPlayerCollisions();

            entity.draw();
        });
    }
}

export {
    Game
}