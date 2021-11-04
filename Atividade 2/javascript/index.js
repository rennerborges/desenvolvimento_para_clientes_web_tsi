window.addEventListener('load',()=> {
    setEventDivs();
});

function setEventDivs(){
    const divs = getAllDivs();

    divs.forEach((div)=> {
        div.addEventListener('mouseover', handleChangeColorDiv);
    });
}

function handleChangeColorDiv(event){
    event.target.style.backgroundColor = generateRBG(0.6);
}

function generateRBG(alpha) {
    const r = generateNumberRandom(256,0);
    const g = generateNumberRandom(256,0);
    const b = generateNumberRandom(256,0);

    return `rgb(${r}, ${g}, ${b}, ${alpha || 1})`;

}

function generateNumberRandom(max = 100, min = 0){
    return Math.floor(Math.random()  * (max - min) + min);
}

function getAllDivs(){
    const [...divs] = document.querySelectorAll('section > div');
    return divs;
}