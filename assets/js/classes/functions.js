import {
    view
} from "../app.js";

let rectCollision = (rect1, rect2) => {

    if (rect1.pos.x < rect2.pos.x + rect2.width &&
        rect1.pos.x + rect1.width > rect2.pos.x &&
        rect1.pos.y < rect2.pos.y + rect2.height &&
        rect1.pos.y + rect1.height > rect2.pos.y) {
        return true;
    }
    return false;
}

let withinBorderRectRect = (rect1, rect2, border) => {
    let borderedRect = {
        pos: {
            x: rect1.pos.x - border,
            y: rect1.pos.y - border
        },
        width: rect1.width + (border * 2),
        height: rect1.height + (border * 2)
    }
    return rectCollision(borderedRect, rect2);
}

let rectCircleColliding = (circle, rect) => {
    var distX = Math.abs(circle.pos.x - rect.pos.x - rect.width / 2);
    var distY = Math.abs(circle.pos.y - rect.pos.y - rect.height / 2);

    if (distX > (rect.width / 2 + circle.r)) {
        return false;
    }
    if (distY > (rect.height / 2 + circle.r)) {
        return false;
    }

    if (distX <= (rect.width / 2)) {
        return true;
    }
    if (distY <= (rect.height / 2)) {
        return true;
    }

    // also test for corner collisions
    var dx = distX - rect.width / 2;
    var dy = distY - rect.height / 2;
    return (dx * dx + dy * dy <= (circle.r * circle.r));
}

let pointFromPoint = (pointx, pointy, distance, angle) => {
    return {
        x: Math.cos(angle * Math.PI / 180) * distance + pointx,
        y: Math.sin(angle * Math.PI / 180) * distance + pointy
    }
}

let unitToCanvasConversionRect = (x, y, w, h) => {
    let unit = view.getMap().getUnitSize();
    let padding = view.getMap().getPadding();
    return {
        x: (x * unit) + padding.x,
        y: (y * unit) + padding.y,
        w: (w * unit),
        h: (h * unit)
    }
}

let unitToCanvasConversionArc = (x, y, r) => {
    let unit = view.getMap().getUnitSize();
    let padding = view.getMap().getPadding();
    return {
        x: (x * unit) + padding.x,
        y: (y * unit) + padding.y,
        r: (r * unit)
    }
}

export {
    rectCollision,
    rectCircleColliding,
    pointFromPoint,
    unitToCanvasConversionRect,
    unitToCanvasConversionArc,
    withinBorderRectRect
}