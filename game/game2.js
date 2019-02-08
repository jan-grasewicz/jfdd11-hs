let gameBoard = document.querySelector('.board')
let player = document.createElement('div')
let taxiBoard = document.querySelector('.taxi-board')
let taxi = document.createElement('div')
taxi.classList.add('taxi')
player.classList.add('player')
let everyPopup = document.querySelector('.popup')
let popupFail = document.querySelector('.failMsg')
let popupWin = document.querySelector('.winMsg')
let popupStart = document.querySelector('.startMsg')
let startGameBtn = document.querySelector('#start-game')
let tryAgainBtn = document.querySelector('.tryAgain')
const timerDisplay = document.querySelector('.secs')
const audioTagBackground = document.querySelector('audio')
const audioTagBeerUp = document.querySelector('#beer-up')
const audioStop = document.querySelector('.audio-stop')
let audioPlay = false
let countdown

let game = {
    player: {
        rotation: 0,
        position: { x: 50, y: 50 },
        startPosition: { x: 390, y: 600 },
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
        catchRadius: 25,
        score: 0,
    },
    board: {
        //to miejsce nalezy wyregulowac po ustawieniu awatara gracza coby nie przechodził przez ściany!
        width: gameBoard.offsetWidth - 60,
        height: gameBoard.offsetHeight - 20,
    },
    beer: {
        catchRadius: 25,
        amountToSpawn: 5,
        expiration: 3,
    },
    taxi: {
        position: { y: 0 },
        direction: { y: 0 },
        speed: 0,
        catchRadius: 25,
        timeToArrive: 2,
        isComing: false,
    },
    taxiboard: {
        width: taxiBoard.offsetHeight,
        nextToDoor: 0,
    },
    time: {
        gameTime: 60,
    },
}

//functions being launched here
startGameBtn.addEventListener('click', startGame)
tryAgainBtn.addEventListener('click', startGame)
audioStop.addEventListener('click', toggleAudioBackground)

let animationId = 0;

function startGame() {
    reset();
    audioTagBackground.play()
    everyPopup.style.display = 'none';
    popupStart.style.display = 'none';
    timer(game.time.gameTime);
    timerDisplay.style.fontSize = `3rem`;
    timerDisplay.style.color = 'white';
    timerDisplay.style.fontWeight = 'normal';
    computeNextToDoor()
    spawnPlayer()
    clearInterval(animationId);
    animationId = setInterval(animation, 16)
    spawnBeers(game.beer.amountToSpawn)

}

function reset() {
    beers = document.querySelectorAll('.beer')
    beers.forEach(beer => {
        beer.parentElement.removeChild(beer)
    })
    game.player.maxSpeed = 2
    game.player.acceleration = 0.2
    game.player.rotationSpeed = 6
    game.player.score = 0
    game.taxi.isComing = false
    game.taxi.position.y = 0
    game.time.gameTime = 60
    if (document.querySelector('.taxi') !== null) {
        taxiBoard.removeChild(taxi);
    }
    blurBody.style.filter = 'none'
    document.querySelector('progress').value = 0;
}

function animation() {
    detectTaxiCollision2()
    detectBeerCollision()
    rotation()
    rotationToRadians()
    computeDirection()
    accelerate()
    move()
    detectWallCollision()
    computeTaxiSpeed()
    taxiIsComing()
    beerDisappear()

    console.log("x: " + game.player.position.x + "|| y: " + game.player.position.y)
    //console.log(game.player.direction)
}

function toggleAudioBackground() {
    if (audioPlay === true) {
        audioTagBackground.play()
        audioStop.style.backgroundImage = 'url(icon.png)'
        audioPlay = false
    } else if (audioPlay === false) {
        audioTagBackground.pause()
        audioStop.style.backgroundImage = 'url(iconplay.png)'
        audioPlay = true
    }
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
        game.player.rotateLeft = true
    }
    if (event.code === 'ArrowLeft') {
        game.player.rotateRight = true
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
        game.player.rotateLeft = false
    }
    if (event.code === 'ArrowLeft') {
        game.player.rotateRight = false
    }
    if (event.code === 'ArrowUp') {
        game.player.moveForward = false
    }
    if (event.code === 'ArrowDown') {
        game.player.moveBackward = false
    }
})

function createBeer(whereNode, top, left) {
    const beerNode = document.createElement("div");
    beerNode.classList.add("beer");
    beerNode.style.top = top;
    beerNode.style.left = left;
    beerNode.prefixs = game.time.gameTime
    whereNode.appendChild(beerNode);
}

function spawnBeers(howMany) {
    randomBeerPosition(howMany).forEach(pos => createBeer(gameBoard, pos.top, pos.left))
}

function randomBeerPosition(howMany) {

    let range = Array.from({ length: 9 }, (_, i) => i)
    let nestedPositions = range.map(y => range.map(x => ({ x, y })))
    let flatPositions = nestedPositions.reduce((result, next) => result.concat(next), [])
    let normalizedPositions = flatPositions.map(pos => ({ x: pos.x * 10 + 10, y: pos.y * 10 + 10 }))
    let cssPositions = normalizedPositions.map(pos => ({ ...pos, left: (pos.x - 3) + '%', top: (pos.y - 3) + '%' }))
    let positions = []
    for (let i = 0; i < howMany; i++) {

        positions = positions.concat(
            cssPositions.splice(
                Math.floor(Math.random() * cssPositions.length),
                1
            )
        )
    }
    return positions
}

function beerDisappear() {
    let beerList = document.querySelectorAll('.beer')
    for (i = 0; i < beerList.length; i++) {
        let beer = beerList[i]
        let beerCreated = (beer.prefixs)
        if (beerCreated - game.time.gameTime >= game.beer.expiration) {
            beer.parentElement.removeChild(beer)
            spawnBeers(1)
        }
    }
}

function detectBeerCollision() {
    let beerNodeList = document.querySelectorAll('.beer')
    beerNodeList.forEach((beer) => {
        // console.log(beer.style.top)
        let beerTop = beer.offsetTop
        let beerLeft = beer.offsetLeft
        if (game.player.catchRadius + game.beer.catchRadius > Math.hypot(
            game.player.position.x - beerLeft,
            game.player.position.y - beerTop)) {
            audioTagBeerUp.play()
            beer.parentElement.removeChild(beer)
            game.player.score += 1
            spawnBeers(1)
            beerProgressUp()
        }
    })
}

function computeNextToDoor() {
    let margins = window.innerHeight - 1800;
    game.taxiboard.nextToDoor = margins / 2 + 735;
}

function computeTaxiSpeed() {
    game.taxi.speed = (game.taxiboard.nextToDoor / (game.taxi.timeToArrive * 60));
}

function taxiIsComing() {
    if (game.taxi.isComing === true) {
        game.taxi.position.y += game.taxi.speed;
        taxi.style.bottom = game.taxi.position.y + "px";
        if (game.taxi.position.y > game.taxiboard.nextToDoor) {
            taxi.style.bottom = game.taxiboard.nextToDoor + "px"
            return;
        }
    }
}

// beer indicator and "make it harder" function!
let blurBody = document.querySelector('.board');
let drinkingMsgDiv = document.createElement('div');
let drinkingMsgText = document.createElement('h1');

function makeItHarder(number) {
    blurBody.style.filter = `blur(${number}px)`;
}

//  function shakeYourBoomBoom
function shakeYourBoomBoom() {
    player.classList.toggle('shakeAnimation');

}

function drinkingMessage(msg) {
    if (msg.length > 0) {
        drinkingMsgDiv.classList.add('drinking-msg')
        document.querySelector('body').appendChild(drinkingMsgDiv);
        document.querySelector('.drinking-msg').appendChild(drinkingMsgText);
        drinkingMsgText.innerText = msg;
        shakeYourBoomBoom();
        setTimeout(shakeYourBoomBoom, 3000);
    }
    setTimeout(stopDrinkingMsg, 1500);
}

function stopDrinkingMsg() {
    document.querySelector('.drinking-msg').removeChild(drinkingMsgText);
}

function beerProgressUp() {
    document.querySelector('progress').value = game.player.score * 2;
    if (game.player.score > 5 && game.player.score < 10) {
        makeItHarder(1);
    }
    if (game.player.score === 6) {
        drinkingMessage('You are getting drunk!')
    }
    if (game.player.score > 10 && game.player.score < 20) {
        makeItHarder(3);
    }
    if (game.player.score > 20 && game.player.score < 30) {
        makeItHarder(4);
    }
    if (game.player.score === 22) {
        drinkingMessage('Slow down bro...')
    }
    if (game.player.score > 30 && game.player.score < 40) {
        makeItHarder(5);
    }
    if (game.player.score > 40 && game.player.score < 51) {
        makeItHarder(8);
        game.player.acceleration = 0.2;
        game.player.maxSpeed = 3;
    }
    if (game.player.score === 40) {
        drinkingMessage('I hope you can make it...')
    }
    if (game.player.score === 51) {
        taxiBoard.appendChild(taxi);
        game.time.gameTime += 10;
        game.taxi.isComing = true;
        taxiIsComing();
        drinkingMessage('GET TO DA TAXXAA!')
    }
}

// countdown
function timer(seconds) {
    const now = Date.now();
    const then = now + seconds * 1000;
    displayTimeLeft(game.time.gameTime);

    countdown = setInterval(() => {

        if (game.time.gameTime <= 0) {
            clearInterval(countdown);
            timerDisplay.style.fontSize = `22px`;
            timerDisplay.style.color = 'red';
            timerDisplay.style.fontWeight = 'bold';
            timerDisplay.innerHTML = 'Failed to get DRUNK'
            game.player.speed = 0;
            game.player.maxSpeed = 0;
            everyPopup.style.display = 'block';
            popupFail.style.display = 'block';
            gameBoard.style.filter = 'blur(10px)'
            return;
        }

        displayTimeLeft(game.time.gameTime);
        game.time.gameTime--
    }, 1000)

    function displayTimeLeft(seconds) {
        const minutes = Math.floor(seconds / 60);
        const secondsLeft = seconds % 60;
        const display = `${minutes}:${secondsLeft < 10 ? '0' : ''}${secondsLeft}`;
        timerDisplay.innerHTML = display;
    }
}

function detectTaxiCollision2() {
    if (player !== null && game.player.position.x >= 780 && game.player.position.y >= 420 && game.player.position.y <= 470 && game.taxi.isComing === true) {
        player.parentElement.removeChild(player)
        beers = document.querySelectorAll('.beer')
        beers.forEach(beer => {
            beer.parentElement.removeChild(beer)
        })
        game.player.maxSpeed = 0
        game.player.rotationSpeed = 0
        taxi.parentElement.removeChild(taxi)
        clearInterval(animationId)
        clearInterval(countdown)
    }
}