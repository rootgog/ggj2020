import {
    canvas,
    ctx
} from "../app.js";

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

    collisions(node) {
        if (node.pos.x < this.padding.x ||
            node.pos.x + node.width > (this.padding.x + (this.unit * this.width)) ||
            node.pos.y < this.padding.y ||
            node.pos.y + node.width > (this.padding.y + (this.unit * this.height))) {
            return "out of bounds";
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


                ctx.beginPath();
                ctx.fillStyle = cell; //color for now

                let x = c * this.unit;
                let y = r * this.unit;

                ctx.rect(x + this.padding.x, y + this.padding.y, this.unit, this.unit);

                ctx.fill();

            }
        }
    }
}