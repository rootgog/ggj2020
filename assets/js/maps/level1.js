import player from "../classes/player.js";
import {
    Pickupable
} from "../classes/pickupables.js";
import {
    SpinningBallBar
} from "../classes/obsticles.js";

export default {
    map: [
        ["grey", "lightgrey", "grey", "lightgrey", "grey", "lightgrey", "grey", "lightgrey", "grey", "lightgrey", "grey"],
        ["lightgrey", "grey", "lightgrey", "grey", "lightgrey", "grey", "lightgrey", "grey", "lightgrey", "grey", "lightgrey"],
        ["grey", "lightgrey", "grey", "lightgrey", "grey", "lightgrey", "grey", "lightgrey", "grey", "lightgrey", "grey"],
        ["lightgrey", "grey", "lightgrey", "grey", "lightgrey", "grey", "lightgrey", "grey", "lightgrey", "grey", "lightgrey"],
        ["grey", "lightgrey", "grey", "lightgrey", "grey", "lightgrey", "grey", "lightgrey", "grey", "lightgrey", "grey"],
        ["lightgrey", "grey", "lightgrey", "grey", "lightgrey", "grey", "lightgrey", "grey", "lightgrey", "grey", "lightgrey"],
        ["grey", "lightgrey", "grey", "lightgrey", "grey", "lightgrey", "grey", "lightgrey", "grey", "lightgrey", "grey"],
        ["lightgrey", "grey", "lightgrey", "grey", "lightgrey", "grey", "lightgrey", "grey", "lightgrey", "grey", "lightgrey"]
    ],
    entities: [ //ARRAY OF NODES
        player,
        new Pickupable(),
        new SpinningBallBar()
    ]
}