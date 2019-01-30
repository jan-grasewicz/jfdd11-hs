let gameBoard = document.querySelector('.plansza')

spawnPlayer()

let game = {
    player:{
        rotation : 0,
        position : {x:0, y:0},
        speed : {x:0, y:0},
        acceleration : {x:0, y:0},

    }
}


function spawnPlayer(){
    let player = document.createElement('div')
    player.classList.add('player')
    player.style.top = "50px;"
    player.style.left = "50px;"
    gameBoard.appendChild(player)
}

window.addEventListener('keydown', )
window.addEventListener('keyup', )