import player from "../classes/player.js";
import {
    Pickupable
} from "../classes/pickupables.js";
import {
    SpinningBallBar
} from "../classes/obsticles.js";

export default {
    map: [
        ["black", "green", "yellow"],
        ["aqua", "blue", "black"],
        ["white", "green", "orange"],
    ],
    entities: [ //ARRAY OF NODES
        player,
        new Pickupable(),
        new SpinningBallBar()
    ]
}