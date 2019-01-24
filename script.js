let nav = document.querySelector('nav');
let section = document.querySelector('#features');

/* navbar fixed position function */

function changeNavPosition(){
    if(window.scrollY > (section.offsetTop-50)) { /* section offset - 50px */
        nav.classList.add('js__fixed')
    }else{
        nav.classList.remove('js__fixed')
    }
}

/*  event listeners for different window actions */

window.addEventListener('load', changeNavPosition);
window.addEventListener('resize', changeNavPosition);
window.addEventListener('scroll', changeNavPosition);