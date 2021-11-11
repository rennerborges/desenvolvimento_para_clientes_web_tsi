window.addEventListener('load', ()=> {
    prepareMenu();
})

function handleChangeMenu(){
    const containerAction = document.querySelector('.container__actions');
    const form = document.querySelector('form');

    if(containerAction.style.display !== 'block'){
        containerAction.style.display = 'block';
        form.style.display = 'none';
    }else{
        containerAction.style.display = 'none';
        form.style.display = 'block';
    }
}

function prepareMenu(){
    document.querySelector('.icon').addEventListener('click', handleChangeMenu);
    document.querySelector('.btn__action').addEventListener('click', handleChangeMenu);
}