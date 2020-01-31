import {
    View
} from "../classes/view.js";
import {
    deltaTime
} from "../app.js";
import Player from "../classes/player.js";
import level1 from "../maps/level1.js";
import Map from "./../classes/map.js";

export default class Game extends View {

    constructor() {
        super();
        this.player = new Player();
        this.map;
        this.levels = [level1.map];
        this.level = 0;

        this.setMap(new Map(this.levels[this.level]));
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

        this.player.draw();
    }
}