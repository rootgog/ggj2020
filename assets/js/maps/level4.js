import player from "../classes/player.js";
import {
    SpinningBallBar,
    ScrollingBallBar
} from "../classes/obsticles.js";
import {
    Bridge,
    BridgePiece
} from "../classes/bridge.js";
import {
    Grass,
    Water
} from "../classes/tiles.js";

let g = new Grass();
let w = new Water();

export default () => {
    return {
        map: [
            [g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g],
            [g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g],
            [g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g],
            [g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g],
            [w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w],
            [w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w],
            [w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w],
            [g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, w, w, w, w, w, w, w, w, w, w, w, w, w, w],
            [g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, w, w, w, w, w, w, w, w, w, w, w, w],
            [g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, w, w, w, w, w, w, w, w, w, w, w],
            [g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, w, w, w, w, w, w, w, w, w],
            [g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, w, w, w, w, w, w],
            [g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g],
            [g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g],
            [g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g],
            [g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g],
            [g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g],
            [g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g],
            [g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g],
            [g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g],
            [g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g],
        ],
        entities: [
            new BridgePiece({
                x: 5,
                y: 15
            }),
            new BridgePiece({
                x: 35,
                y: 12
            }),
            new Bridge({
                x: 19.5,
                y: 3,
                h: 5,
                piecesRequired: 2
            }),
            new ScrollingBallBar({
                angle: 45,
                x: 23,
                y: 7.5,
                distance: 8,
                speed: 8,
                ballscount: 7,
                gap: 2.9
            }),
            new SpinningBallBar({
                x: 25,
                y: 15,
                ballscount: 5,
                gap: 1
            }),
            new SpinningBallBar({
                x: 15,
                y: 15,
                ballscount: 6,
                gap: 1
            }),
            new SpinningBallBar({
                x: 15,
                y: 15,
                ballscount: 6,
                gap: 1,
                rotation: 90
            }),
            new SpinningBallBar({
                x: 15,
                y: 15,
                ballscount: 6,
                gap: 1,
                rotation: 180
            }),
            new SpinningBallBar({
                x: 15,
                y: 15,
                ballscount: 6,
                gap: 1,
                rotation: 270
            }),
            new ScrollingBallBar({
                angle: 0,
                direction: 90,
                x: 1,
                y: 7.5,
                distance: 13,
                speed: 8,
                ballscount: 5,
                gap: 2.1
            }),
            player
        ],
        init: () => {
            player.pos = {
                x: 21,
                y: 18
            }
        },
        winCondition: () => {
            return player.pos.y < 3;
        }
    }
}