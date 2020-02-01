let rectCollision = (rect1, rect2) => {

    if (rect1.pos.x < rect2.pos.x + rect2.width &&
        rect1.pos.x + rect1.width > rect2.pos.x &&
        rect1.pos.y < rect2.pos.y + rect2.height &&
        rect1.pos.y + rect1.height > rect2.pos.y) {
        return true;
    }
    return false;
}

let rectCircleColliding = (circle, rect) => {
    var distX = Math.abs(circle.pos.x - rect.pos.x - rect.w / 2);
    var distY = Math.abs(circle.pos.y - rect.pos.y - rect.h / 2);

    if (distX > (rect.w / 2 + circle.r)) {
        return false;
    }
    if (distY > (rect.h / 2 + circle.r)) {
        return false;
    }

    if (distX <= (rect.w / 2)) {
        return true;
    }
    if (distY <= (rect.h / 2)) {
        return true;
    }

    var dx = distX - rect.w / 2;
    var dy = distY - rect.h / 2;
    return (dx * dx + dy * dy <= (circle.r * circle.r));
}

let pointFromPoint = (pointx, pointy, distance, angle) => {
    return {
        x: Math.cos(angle * Math.PI / 180) * distance + pointx,
        y: Math.sin(angle * Math.PI / 180) * distance + pointy
    }
}

export {
    rectCollision,
    rectCircleColliding,
    pointFromPoint
}