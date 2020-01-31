import {
    View
} from "../classes/view.js";
import level1 from "../maps/level1.js";
import Map from "./../classes/map.js";

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

    draw() {
        super.draw();
        //draw elements
        this.map.draw();
        this.entities.forEach(entity => {
            entity.draw();
        });
    }
}

export {
    Game
}