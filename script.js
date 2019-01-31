let nav = document.querySelector('nav');
let section = document.querySelector('#features');

/* navbar fixed position function */

function changeNavPosition() {
    if (window.scrollY > (section.offsetTop - 50)) { /* section offset - 50px */
        nav.classList.add('js__fixed')
    } else {
        nav.classList.remove('js__fixed')
    }
}

/*  event listeners for different window actions */

window.addEventListener('load', changeNavPosition);
window.addEventListener('resize', changeNavPosition);
window.addEventListener('scroll', changeNavPosition);


/* popup */

let btnSub = document.querySelector('.subscribe_button')
let popupDiv = document.createElement('div');
let popupText = document.createElement('h2');
let popupBtn = document.createElement('a');
let divInside = document.createElement('div');
let bodyAdd = document.querySelector('body');
let containerBlur = document.querySelector('.container');
let formValid = document.querySelector('form');
let popupFinal = document.body.appendChild(popupDiv).appendChild(divInside);

formValid.addEventListener('submit', function(event) {
    event.stopPropagation();
    event.preventDefault()
    containerBlur.style.filter = 'blur(5px)';
    popupDiv.classList.add('popup');
    popupFinal.appendChild(popupText);
    popupFinal.appendChild(popupBtn);
    popupText.innerText = 'Thank you for your trust! We have prepared a small surprise for you, tap the button and play our web game!'
    popupBtn.innerText = "Play!"
    popupBtn.href = "#";
    popupDiv.style.display = 'block';
})

popupDiv.addEventListener('click', function(event) {
    event.stopPropagation();
})

containerBlur.addEventListener('click', function() {
    popupDiv.style.display = 'none';
    containerBlur.style.filter = 'none'
})