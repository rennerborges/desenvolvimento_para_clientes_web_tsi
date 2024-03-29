window.addEventListener('load', ()=> {
    FactoryQuestion1();
    FactoryQuestion2();
    FactoryQuestion3();
    FactoryQuestion4();
})

function FactoryQuestion1(){
    const form = document.querySelector('#questão1 > form');
    const input = document.querySelector('#questão1 > form input');
    const resultado = document.querySelector('#questão1 > form .resultado')

    form.addEventListener('submit', (event)=> {
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
    const form = document.querySelector('#questão2 > form');
    const input = document.querySelector('#questão2 > form input');
    const resultado = document.querySelector('#questão2 .resultado');
    const errorMsg = document.querySelector('#questão2 .error_message');

    form.addEventListener('submit', (event)=> {
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

function FactoryQuestion3(){
    const form = document.querySelector('#questão3 > form');
    const peso = document.querySelector('#questão3 > form input[name="peso"]');
    const altura = document.querySelector('#questão3 > form input[name="altura"]');
    const title = document.querySelector('#questão3 .content__info  h1');
    const content = document.querySelector('#questão3 .content__info  h2');
    const errorMsg = document.querySelector('#questão3 .error_message');

    form.addEventListener('submit', (event)=> {
        event.preventDefault();
        try {
            const imc = calculeImc(peso.value, altura.value);
            const classificacao = classifyImc(imc);

            if(!peso.value || !altura.value) {
                throw new Error('É necessário informar todos os campos');
            }

            title.innerHTML = `${classificacao.title}!!!`
            content.innerHTML = `Seu IMC é ${imc.toFixed(2)} sua classificação é <b>${classificacao.content}</b>.`
        } catch (error) {
            errorMsg.innerHTML = error.message;
        }
    })
}

function calculeImc(peso, altura){
    return peso/Math.pow(altura,2);
};

function classifyImc(imc){

    const classificacoes = {
        'abaixo_do_peso': {
            condition: (imc)=> imc <= 18.5,
            title: 'Atenção',
            content: 'abaixo do peso',
        },
        'peso_ideal': {
            condition: (imc)=> imc >= 18.6 && imc < 25,
            title: 'Parabéns',
            content: 'peso ideal',
        },
        'acima_do_peso': {
            condition: (imc)=> imc >= 25 && imc < 30,
            title: 'Cuidado',
            content: 'levemente acima do peso',
        },
        'obesidade1': {
            condition: (imc)=> imc >= 30 && imc < 35,
            title: 'Atenção',
            content: 'obesidade grau I',
        },
        'obesidade2': {
            condition: (imc)=> imc >= 35 && imc < 40,
            title: 'Atenção',
            content: 'obesidade grau II',
        },
        'obesidade3': {
            condition: (imc)=> imc >= 40,
            title: 'Alerta',
            content: 'obesidade grau III',
        }
    };

    for(const classificacao of Object.values(classificacoes)){
        if(classificacao.condition(imc)){
            return classificacao;
        }
    }

}

function FactoryQuestion4(){
    const form = document.querySelector('#questão4 > form');
    const input = document.querySelector('#questão4 > form input');
    const containerNotas = document.querySelector('#questão4 .container__notasItem');
    const htmlValue = document.querySelector('#questão4 .card__total b');
    const resultado =  document.querySelector('#questão4 .resultado');

    form.addEventListener('submit', (event)=> {
        event.preventDefault();

        const valueInput = parseFloat(input.value);
        const values = getMoneyFractioned(valueInput);
        const containerItens = Object.entries(values).reverse().map(([nota, quantidade])=>(generateNotasItem(nota, quantidade)));

        containerNotas.innerHTML = containerItens.join('');
        htmlValue.innerHTML = valueInput.toLocaleString('pt-br', {minimumFractionDigits: 2});

        if(resultado.style.display !== 'block'){
            resultado.style.display = 'block';
        }
    });

}

function getMoneyFractioned(value){
    const notas = {
        "50": 0,
        "10":0,
        "5":0,
        "1": 0,
    }

    let valueRestante = value;

    for(const nota of Object.keys(notas).reverse()){
        if(valueRestante === 0){
            break;
        }

        notas[nota] += Math.floor(valueRestante / nota);
        valueRestante = valueRestante % nota;
    }

    return notas;
}

function generateNotasItem(nota, quantidade){
    return (`
    <div class="nota__item">
        <h2>${nota} ${nota == 1 ? 'real': 'reais'}</h2>
        <h3>Quantidade:</h3>
        <p>${quantidade}x</p>
    </div>
    `);
}