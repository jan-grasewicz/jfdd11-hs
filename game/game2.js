let gameBoard = document.querySelector('.plansza')
let player = document.createElement('div')
player.classList.add('player')


let game = {
    player: {
        rotation: 0,
        position: { x: 50, y: 50 },
        startPosition: { x: 50, y: 50 },
        speed: 0,
        maxSpeed: 2,
        direction: { x: 0, y: 0 }, //Current Speed Vector 
        acceleration: 0.2,
        rotateLeft: false,
        rotateRight: false,
        moveForward: false,
        moveBackward: false,
        rotationSpeed: 6,
        rotationInRadians: 0,
    },
    board: {
        //to miejsce nalezy wyregulowac po ustawieniu awatara gracza coby nie przechodził przez ściany!
        width: gameBoard.offsetWidth - 70,
        height: gameBoard.offsetHeight - 60,
    }
}
//functions being launched here

spawnPlayer()
setInterval(animation, 16)

function animation() {

    rotation()
    rotationToRadians()
    computeDirection()
    accelerate()
    move()
    detectWallCollision()

    //console.log(game.player.direction)
}

function detectWallCollision() {
    if (game.player.position.x <= 0 || game.player.position.x >= game.board.width) {
        spawnPlayer()
    }
    if (game.player.position.y <= 0 || game.player.position.y >= game.board.height) {
        spawnPlayer()
    }
}

function accelerate() {
    if (game.player.moveForward === false && game.player.moveBackward === false || game.player.moveForward === true && game.player.moveBackward === true) {
        if (game.player.speed > 0) {
            game.player.speed = game.player.speed - game.player.acceleration
        }
        if (game.player.speed < 0) {
            game.player.speed = game.player.speed + game.player.acceleration
        }
    }
    if (game.player.moveForward === true && game.player.moveBackward === false) {
        if (game.player.speed <= game.player.maxSpeed) {
            game.player.speed += game.player.acceleration
        }
    }
    if (game.player.moveBackward === true && game.player.moveForward === false) {
        if (game.player.speed >= (-1 * game.player.maxSpeed)) {
            game.player.speed -= game.player.acceleration
        }
    }
}

function move() {
    game.player.position.x += (game.player.direction.x * Math.abs(game.player.speed))
    game.player.position.y += game.player.direction.y * Math.abs(game.player.speed)
    if (game.player.position.x > 0 && game.player.position.y > 0) {
        player.style.top = game.player.position.y + "px"
        player.style.left = game.player.position.x + "px"
    }
}

function computeDirection() {
    game.player.direction.y = game.player.speed * Math.sin(game.player.rotationInRadians)
    game.player.direction.x = game.player.speed * Math.cos(game.player.rotationInRadians)
}

function rotationToRadians() {
    game.player.rotationInRadians = game.player.rotation * Math.PI * (1 / 180)
}

function rotation() {
    if (game.player.rotateLeft === true) {
        game.player.rotation += game.player.rotationSpeed
        player.style.transform = "rotate(" + game.player.rotation + "deg)"
        if (game.player.rotation >= 360) {
            game.player.rotation = 0
        }
    }
    if (game.player.rotateRight === true) {
        game.player.rotation -= game.player.rotationSpeed
        player.style.transform = "rotate(" + game.player.rotation + "deg)"
        if (game.player.rotation <= (-360)) {
            game.player.rotation = 0
        }
    }
}

function spawnPlayer() {
    game.player.direction.x = 0
    game.player.direction.y = 0
    game.player.speed = 0
    game.player.rotation = 0
    player.style.top = game.player.startPosition.x + "px"
    player.style.left = game.player.startPosition.y + "px"
    player.style.transform = "rotate(" + game.player.rotation + "deg)"
    game.player.position.x = game.player.startPosition.x
    game.player.position.y = game.player.startPosition.y
    gameBoard.appendChild(player)
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