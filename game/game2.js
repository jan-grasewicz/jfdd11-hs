let gameBoard = document.querySelector('.plansza')
let player = document.createElement('div')
player.classList.add('player')


let game = {
    player: {
        rotation: 0,
        position: { x: 50, y: 50 },
        speed: 1,
        maxSpeed: 10,
        direction: { x: 0, y: 0 }, //Current Speed Vector 
        acceleration: 0.35,
        rotateLeft: false,
        rotateRight: false,
        moveForward: false,
        moveBackward: false,
        rotationSpeed: 5,
        rotationInRadians: 0,
    }
}

//functions being launched here
spawnPlayer()
setInterval(animation, 25)

function animation() {
    rotation()
    rotationToRadians()
    computeDirection()
    //console.log(game.player.direction)
}

function computeDirection() {
    game.player.direction.y = (-1) * game.player.speed * Math.sin(game.player.rotationInRadians)
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
    player.style.top = game.player.position.y + "px"
    player.style.left = game.player.position.x + "px"
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


///feature/23
//81 positions on a map written in %
let range = Array.from({ length: 9 }, (_, i) => i)
let nestedPositions = range.map(y => range.map(x => ({ x, y })))
let flatPositions = nestedPositions.reduce((result, next) => result.concat(next), [])
let normalizedPositions = flatPositions.map(pos => ({ x: pos.x * 10 + 10, y: pos.y * 10 + 10 }))
let cssPositions = normalizedPositions.map(pos => ({ x: pos.x + '%', y: pos.y + '%' }))


var items = cssPositions;
var result = []
for (let i = 0; i < 5; i++) {
    result.push(
        items.splice(
            Math.floor(Math.random() * items.length),
            1
        )
    )
}

function createBeer(whereNode) {
    const beerNode = document.createElement("div");
    beerNode.classList.add("beer");
    whereNode.appendChild(rawCakeNode);
}