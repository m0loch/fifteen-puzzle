function moveLeft(state) {
    const empty = state.findIndex(el => el === 0);

    if ((empty % 4) === 3) {
        return state;
    }

    let retValue = state.filter(el => el !== 0);
    retValue.splice(empty + 1, 0, 0);
    return retValue;
}

function moveRight(state) {
    const empty = state.findIndex(el => el === 0);

    if ((empty % 4) === 0) {
        return state;
    }

    let retValue = state.filter(el => el !== 0);
    retValue.splice(empty - 1, 0, 0);
    return retValue;
}

function moveUp(state) {
    const empty = state.findIndex(el => el === 0);
    console.log(empty);

    if (empty >= 12) {
        return state;
    }

    let retVal = [...state];
    retVal[empty] = retVal.splice(empty + 4, 1, retVal[empty])[0];
    return retVal;
}

function moveDown(state) {
    const empty = state.findIndex(el => el === 0);

    if (empty < 4) {
        return state;
    }

    let retVal = [...state];
    retVal[empty] = retVal.splice(empty - 4, 1, retVal[empty])[0];
    return retVal;
}

export { moveLeft, moveRight, moveUp, moveDown };