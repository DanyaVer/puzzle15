function generateSequentialArray(length) {
    let puzzle = [...Array(length - 1)].map((_, i) => i + 1);
    puzzle.push(0);
    return puzzle;
};

export { generateSequentialArray }