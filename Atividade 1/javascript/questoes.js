window.addEventListener('load', ()=> {
    FactoryQuestion1();
    FactoryQuestion2();
})

function FactoryQuestion1(){
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

function FactoryQuestion2(){
    const button = document.querySelector('#questão2 > form button');
    const input = document.querySelector('#questão2 > form input');
    const resultado = document.querySelector('#questão2 .resultado');
    const errorMsg = document.querySelector('#questão2 .error_message');

    button.addEventListener('click', (event)=> {
        event.preventDefault();
        try {
            const date = returnDateExtension(input.value);
            resultado.innerHTML = date;
            errorMsg.innerHTML = '';
        } catch (error) {
            errorMsg.innerHTML = error.message;
        }
    })
}

function returnDateExtension(date){

    if(!date){
        throw new Error('Informe uma data válida');
    }

    const meses = {
        1: 'janeiro',
        2: 'feveiro',
        3: 'março',
        4: 'abril',
        5: 'maio',
        6: 'junho',
        7: 'julho',
        8: 'agosto',
        9: 'setembro',
        10: 'outubro',
        11: 'novembro',
        12: 'dezembro',
    };

    const [ano, mes, dia] = date.split('-');

    return `${dia} de ${meses[mes]} de ${ano}`;
}