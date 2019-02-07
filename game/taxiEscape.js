function computePlayerAbsolutePositionX() {
    let margins = window.innerWidth - (310 + 850)
    let margin = margins/2
    let playerAbsolutePositionX = margin + 310 + game.player.position.x
    return playerAbsolutePositionX
}