let gameBoard = document.querySelector('.plansza')
let player = document.createElement('div')
player.classList.add('player')


const game = {
    player: {
        rotation: 0,
        position: { x: 50, y: 50 },
        speed: 0,
        maxSpeed: 18,
        direction: { x: 0, y: 0 },
        acceleration: 0.35,
        rotateLeft: false,
        rotateRight: false,
        moveForward: false,
        moveBackward: false,
        rotationSpeed: 5
    }
}

//functions being launched here (CUZ SCOPE)
spawnPlayer()
setInterval(updatePosition, 16)


function updatePosition() {
    detectRotation()
    ifAccelerate()
    console.log(game.player.speed)
    player.style.transform = 'rotate(' + game.player.rotation + "deg)"
}

window.addEventListener('keydown', function (event) {
    if (event.code === 'ArrowRight') {
        game.player.rotateRight = true
    }
    if (event.code === 'ArrowLeft') {
        game.player.rotateLeft = true
    }
    if (event.code === 'ArrowUp') {
        game.player.moveForward = true
    }
    if (event.code === 'ArrowDown') {
        game.player.moveBackward = true
    }
})

window.addEventListener('keyup', function (event) {
    if (event.code === 'ArrowRight') {
        game.player.rotateRight = false
    }
    if (event.code === 'ArrowLeft') {
        game.player.rotateLeft = false
    }
    if (event.code === 'ArrowUp') {
        game.player.moveForward = false
    }
    if (event.code === 'ArrowDown') {
        game.player.moveBackward = false
    }
})

function spawnPlayer() {
    player.style.top = game.player.position.y + "px"
    player.style.left = game.player.position.x + "px"
    gameBoard.appendChild(player)
}

function detectRotation() {
    if (game.player.rotateLeft === true) {
        game.player.rotation -= game.player.rotationSpeed
    }
    if (game.player.rotateRight === true) {
        game.player.rotation += game.player.rotationSpeed
    }
}

function ifAccelerate() {
    if (game.player.moveForward === true) {
        if (game.player.speed <= game.player.maxSpeed) {
            game.player.speed += game.player.acceleration
        }
    }
    if (game.player.moveBackward === true) {
        if (game.player.speed >= (game.player.maxSpeed * (-1))) {
            game.player.speed -= game.player.acceleration
        }
    }
}