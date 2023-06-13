function repeatAction(num, action) {
    for (let i = num; i > 0; i--) {
        action();
    }
}

export { repeatAction }