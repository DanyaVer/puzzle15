import { generateSequentialArray } from "../utils/ArrayGeneration";
import { moveUp, moveDown, moveRight, moveLeft } from "./CellMoving";

function fieldFactory(size) {
    return {
        size,
        cells: generateSequentialArray(size * size),
        emptyCell: 15,
        slidesNumber: 0,
    };
}

// randomized the field based on the moves of an empty cell from the solution field
function randomizeField(field) {
    const moves = [moveUp, moveDown, moveLeft, moveRight];
    for (let i = 0; i < 100; i++) {
        let randomMove;
        // so that the empty cell is moved
        do {
            let randomMoveType = Math.floor(Math.random() * 4);
            randomMove = moves[randomMoveType];
        } while (randomMove(field));
    }
    field.slidesNumber = 0;
}

// a function that checks if the field is solved
function checkFieldState(field) {
    if (field.length === 0)
        return false;
    for (let i = 0; i < field.cells.length - 1; i++) {
        if (i + 1 !== field.cells[i])
            return false;
    }
    return true;
}

export {
    fieldFactory,
    randomizeField,
    checkFieldState,
};