import player from "../classes/player.js";
import {
    SpinningBallBar
} from "../classes/obsticles.js";
import {
    Bridge,
    BridgePiece
} from "../classes/bridge.js";

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
    entities: [
        new BridgePiece(),
        new Bridge(),
        new SpinningBallBar(),
        player
    ]
}