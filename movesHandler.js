function moveLeft(tiles) {
    const empty = tiles.findIndex(el => el === 0);

    if ((empty % 4) === 3) {
        return { tiles };
    }

    let retValue = tiles.filter(el => el !== 0);
    retValue.splice(empty + 1, 0, 0);
    return {
        tiles: retValue,
        idx: empty,
        dir: 'Left',
    }
}

function moveRight(tiles) {
    const empty = tiles.findIndex(el => el === 0);

    if ((empty % 4) === 0) {
        return { tiles };
    }

    let retValue = tiles.filter(el => el !== 0);
    retValue.splice(empty - 1, 0, 0);
    return {
        tiles: retValue,
        idx: empty,
        dir: 'Right',
    }
}

function moveUp(tiles) {
    const empty = tiles.findIndex(el => el === 0);

    if (empty >= 12) {
        return { tiles };
    }

    let retValue = [...tiles];
    retValue[empty] = retValue.splice(empty + 4, 1, retValue[empty])[0];
    return {
        tiles: retValue,
        idx: empty,
        dir: 'Up',
    }

}

function moveDown(tiles) {
    const empty = tiles.findIndex(el => el === 0);

    if (empty < 4) {
        return { tiles };
    }

    let retValue = [...tiles];
    retValue[empty] = retValue.splice(empty - 4, 1, retValue[empty])[0];
    return {
        tiles: retValue,
        idx: empty,
        dir: 'Down',
    }

}

function moveTile(tiles, tile) {
    const empty = tiles.findIndex(el => el === 0);
    const relativePos = tile - empty;

    switch (relativePos) {
        case 1: return moveLeft(tiles);
        case -1: return moveRight(tiles);
        case 4: return moveUp(tiles);
        case -4: return moveDown(tiles);

        default: break;
    }

    return { tiles };
}

export { moveLeft, moveRight, moveUp, moveDown, moveTile };