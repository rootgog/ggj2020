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
        new BridgePiece({
            x: 2,
            y: 2
        }),
        new BridgePiece({
            x: 2,
            y: 5
        }),
        new BridgePiece({
            x: 7,
            y: 2
        }),
        new Bridge(),
        new SpinningBallBar(),
        player
    ]
}