window.addEventListener('load', ()=> {
    FactoryQuestionOne();
})

function FactoryQuestionOne(){
    const button = document.querySelector('#questão1 > form button');
    const input = document.querySelector('#questão1 > form input');
    const resultado = document.querySelector('#questão1 > form .resultado')

    button.addEventListener('click', (event)=> {
        event.preventDefault();
        try {
            const factorial = calculateFactorial(input.value);
            resultado.innerHTML = `O fatorial de ${input.value} é <b>${factorial}</b>`
        } catch (error) {
            resultado.innerHTML = `<span class="msg__error">${error.message}</span>`
        }
    })

}

function calculateFactorial(number){
    if(!number || number < 0){
        throw new Error('É necessário informar uma valor válido');
    }

    let factorial = number;

    for(let i= --number; i>0; i--){
        factorial *= i;
    }

    return factorial;
}