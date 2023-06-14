import { repeatAction } from "../utils/RepeatAction";

// check if a cell exists
const canMoveRight = (index, fieldSize) => // for 4*4 are; 0, 1, 2 - 4, 5, 6 - 8, 9, 10 - 12, 13, 14 
  (index + 1) % fieldSize !== 0 && index >= 0;
const canMoveLeft = (index, fieldSize) => // for 4*4 are: 1, 2, 3 - 5, 6, 7 - 9, 10, 11 - 13, 14, 15
  index % fieldSize !== 0 && index < fieldSize * fieldSize;
const canMoveUp = (index, fieldSize) => // must be within (0..15)
  index < fieldSize * fieldSize;
const canMoveDown = (index, fieldSize) => // must be within (0..15)
  index >= 0;

function swapCell(field, movingCell) {
  field.cells[field.emptyCell] = field.cells[movingCell];
  field.cells[movingCell] = 0;
  field.emptyCell = movingCell;
  field.slidesNumber++;
}

// these functions shift the field
function moveLeft(field) {
  const movingCell = field.emptyCell + 1;
  const willMove = canMoveLeft(movingCell, field.size);
  if (willMove) swapCell(field, movingCell);
  return willMove;
}
function moveRight(field) {
  const movingCell = field.emptyCell - 1;

  const willMove = canMoveRight(movingCell, field.size);
  if (willMove) swapCell(field, movingCell);
  return willMove;
}
function moveDown(field) {
  const movingCell = field.emptyCell - field.size;
  const willMove = canMoveDown(movingCell, field.size);
  if (willMove) swapCell(field, movingCell);
  return willMove;
}
function moveUp(field) {
  const movingCell = field.emptyCell + field.size;
  const willMove = canMoveUp(movingCell, field.size);
  if (willMove) swapCell(field, movingCell);
  return willMove;
}

// detects the direction a cell can move and moves it for the calculated the number of times (offset)
function moveCell(index, field) {
  // can move horizontally
  if (Math.floor(index / field.size) === Math.floor(field.emptyCell / field.size)) {
    // can move right
    if (index < field.emptyCell) {
      let offset = field.emptyCell - index;
      repeatAction(offset, () => moveRight(field));
    }
    // can move left
    else if (index > field.emptyCell) {
      let offset = index - field.emptyCell;
      repeatAction(offset, () => moveLeft(field));
    }
  }
  // can move vertically
  else if (Math.abs((index - field.emptyCell) % field.size === 0)) {
    // can move down
    if (index < field.emptyCell) {
      let offset = (field.emptyCell - index) / field.size;
      repeatAction(offset, () => moveDown(field));
    }
    // can move up
    else if (index > field.emptyCell) {
      let offset = (index - field.emptyCell) / field.size;
      repeatAction(offset, () => moveUp(field));
    }
  }
}

export {
  moveUp,
  moveDown,
  moveRight,
  moveLeft,
  moveCell,
};