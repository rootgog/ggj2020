import {
    canvas,
    ctx,
    view
} from "../app.js";
import {
    rectCollision
} from "./functions.js";
import player from "./player.js";
import {
    Water
} from "./tiles.js";

export default class Map {
    constructor(map) {
        this.map = map;
        this.height = map.length;
        this.width = map[0].length;
        this.padding = {
            x: 0,
            y: 0
        }
        this.unit;
        window.addEventListener("resize", this.setSizeParameters.bind(this));
        this.setSizeParameters();
    }

    getUnitSize() {
        return this.unit;
    }

    getPadding() {
        return this.padding;
    }

    isInBounds(node) {
        let unit = view.getMap().getUnitSize();
        if (node.pos.x * unit < 0 ||
            (node.pos.x + node.width) * unit > this.unit * this.width ||
            node.pos.y * unit < 0 ||
            (node.pos.y + node.width) * unit > this.unit * this.height) {
            return false;
        } else {
            return true;
        }
    }

    setSizeParameters() {
        if (this.height > this.width) {
            this.unit = canvas.height / this.height;
        } else {
            this.unit = canvas.width / this.width;
        }

        if ((this.unit * this.height) > canvas.height) {
            this.unit = canvas.height / this.height;
        }

        if ((this.unit * this.width) > canvas.width) {
            this.unit = canvas.width / this.width;
        }

        this.padding.x = (canvas.width - (this.unit * this.width)) / 2;
        this.padding.y = (canvas.height - (this.unit * this.height)) / 2;
    }

    draw() {

        for (let r = 0; r < this.map.length; r++) {

            const row = this.map[r];

            for (let c = 0; c < row.length; c++) {

                const cell = row[c];


                cell.pos.x = c;
                cell.pos.y = r;
                cell.width = 1;
                cell.height = 1;

                cell.draw();

            }
        }
    }
}