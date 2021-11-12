window.addEventListener('load', ()=> {
    InitEvents();
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

function handleChangeCard(preserve){
    const card = document.querySelector('.card');
    const text = document.querySelector('section > .content__right > h1');

    if(card.style.display !== 'block' || preserve){
        card.style.display = 'block';
        text.style.display = 'none';
    }else{
        card.style.display = 'none';
        text.style.display = 'block';
    }
}

function toBackTextContent(){
    const card = document.querySelector('.card');
    const text = document.querySelector('section > .content__right > h1');

    card.style.display = 'none';
    text.style.display = 'block';
}

function InitEvents(){
    document.querySelector('.icon').addEventListener('click', ()=> {
        handleChangeMenu();
        toBackTextContent();
    });
    document.querySelector('.btn__action').addEventListener('click', quickActionClick);
    document.querySelector('form').addEventListener('submit', submitAluno);

    document.querySelectorAll('.btn__vertical').forEach((button)=>{
        button.addEventListener('click', buttonAction);
    });
}

function quickActionClick(){
    const alunos = JSON.parse(window.localStorage.getItem('alunos'));

    if(!alunos || !alunos.length){
        return notFoundAlunos();
    }

    handleChangeMenu();
}

function buttonAction(event){
    const indexButton = this.querySelector('.btn__index').innerHTML;
    const title = document.querySelector('.card h1');
    const alunos = JSON.parse(window.localStorage.getItem('alunos'));

    if(!alunos || !alunos.length){
        return notFoundAlunos();
    }

    const controllerButtons = {
        1: {
            title: 'Lista dos alunos em ordem alfabética',
            function: ()=> getAlunosOrder('asc','nome'),
        },
        2: {
            title: 'Lista dos alunos em ordem decrescente',
            function: ()=> getAlunosOrder('desc','nota'),
        },
        3: {
            title: 'Lista de alunos com maior nota',
            function: getMaiorNota,
        },
        4: {
            title: 'Média das notas dos alunos',
            function: getMediaNota,
        },
        5: {
            title: 'Lista de alunos aprovados',
            function: ()=> getAlunosByStatus('aprovado'),
        },
        6: {
            title: 'Lista de alunos reprovados',
            function: ()=> getAlunosByStatus('reprovado'),
        },
        7: {
            title: 'Removendo alunos',
            function: clearAlunos,
        }
    }

    handleChangeCard(true);
    const actions = controllerButtons[indexButton];

    title.innerHTML = actions.title;
    actions.function();

    console.log(alunos);
}

function submitAluno(event){
    event.preventDefault();
    const nome = document.querySelector('input[name="nome"]');
    const nota = document.querySelector('input[name="nota"]');

    const errorElement = document.querySelector('.error_message');

    if(nota.value < 0 || nota.value > 10){
        return errorElement.innerHTML = 'A nota precisa ser maior que 0 e menor que 10'
    }else{
        errorElement.innerHTML = ''
    }

    let alunos = JSON.parse(window.localStorage.getItem('alunos'));

    const aluno = {
        nome: nome.value,
        nota: parseFloat(nota.value)
    }
    if(alunos){
        alunos.push(aluno);
    }else{
        alunos = [aluno];
    }

    window.localStorage.setItem('alunos', JSON.stringify(alunos));
    event.target.reset();

    Toastify({
        text: "Aluno cadastrado com sucesso!",
        duration: 3000,
        close: true,
        gravity: "top",
        position: "right",
        stopOnFocus: true,
        style: {
          background: "linear-gradient(to right, #00b09b, #96c93d)",
        },
    }).showToast();
}

function getAlunosOrder(order, attribute){
    const containerAlunos = document.querySelector('.containerAlunos');
    const alunos = JSON.parse(window.localStorage.getItem('alunos'));

    const alunosOrdenados = orderByAttribute(alunos, attribute, order);
    containerAlunos.innerHTML = generateAlunoItem(alunosOrdenados);
}

function orderByAttribute(array, attribute, order){
    let arrayOrder = array.sort((a, b) => {
        if (a[attribute] > b[attribute]) {
          return 1;
        }
        if (a[attribute] < b[attribute]) {
          return -1;
        }

        return 0;
    });

    if(order === 'desc'){
        arrayOrder = arrayOrder.reverse();
    }

    return arrayOrder;
}

function generateAlunoItem(itens){
    return itens.map(item => {
        const tag = item.nota >= 6 ? '<div class="tag aprovado">Aprovado</div>' : '<div class="tag reprovado">Reprovado</div>';

        return (`
            <div class="aluno__item">
                <div class="line">
                    <p class="label">Nome:</p>
                    <p>${item.nome}</p>
                </div>
                <div class="line">
                    <p class="label">Nota:</p>
                    <p>${item.nota.toFixed(2)}</p>
                </div>
                ${tag}
            </div>
        `);
    }).join('');
}

function getMaiorNota(){
    const containerAlunos = document.querySelector('.containerAlunos');
    const alunos = JSON.parse(window.localStorage.getItem('alunos'));

    const [alunoNotaMaior] = orderByAttribute(alunos, 'nota', 'desc');

    const alunosNotaMaior = alunos.filter(aluno => aluno.nota === alunoNotaMaior.nota);

    containerAlunos.innerHTML = generateAlunoItem(alunosNotaMaior);
}

function getMediaNota(){
    const containerAlunos = document.querySelector('.containerAlunos');
    const alunos = JSON.parse(window.localStorage.getItem('alunos'));

    const somaNotas = alunos.reduce((sum, aluno)=> sum + aluno.nota, 0);
    const media = somaNotas/alunos.length;

    const alunosAprovados = alunos.filter(aluno => aluno.nota >= 6);
    const somaNotasAprovados = alunosAprovados.reduce((sum, aluno)=> sum + aluno.nota, 0);
    const mediaAprovados = somaNotasAprovados/alunosAprovados.length;

    const alunosReprovados = alunos.filter(aluno => aluno.nota < 6);
    const somaNotasReprovados = alunosReprovados.reduce((sum, aluno)=> sum + aluno.nota, 0);
    const mediaReprovados = somaNotasReprovados/alunosReprovados.length;

    containerAlunos.innerHTML = `
        <div class="aluno__item">
            <div class="line">
                <p>Média</p>
            </div>
            <div class="line">
                <p class="label">Valor:</p>
                <p>${media.toFixed(2)}</p>
            </div>
        </div>

        ${alunosAprovados.length > 0 ?
            `<div class="aluno__item">
                <div class="line">
                    <p>Média aprovados</p>
                </div>
                <div class="line">
                    <p class="label">Valor:</p>
                    <p>${mediaAprovados.toFixed(2)}</p>
                </div>
            </div>` : ''
        }

        ${alunosReprovados.length > 0 ?
            `<div class="aluno__item">
                <div class="line">
                    <p>Média reprovados</p>
                </div>
                <div class="line">
                    <p class="label">Valor:</p>
                    <p>${mediaReprovados.toFixed(2)}</p>
                </div>
            </div>`: ''
        }
    `
}

function getAlunosByStatus(status){

    const conditionStatus = {
        'aprovado': (nota) => nota >= 6,
        'reprovado': (nota) => nota < 6,
    }

    const containerAlunos = document.querySelector('.containerAlunos');
    const alunos = JSON.parse(window.localStorage.getItem('alunos'));

    const alunosStatus = alunos.filter(aluno => conditionStatus[status](aluno.nota));

    if(!alunosStatus.length){
        return containerAlunos.innerHTML = "<p class='notFound'>Nenhum aluno encontrado!</p>";
    }

    containerAlunos.innerHTML = generateAlunoItem(alunosStatus);
}

function clearAlunos(){
    toBackTextContent();
    handleChangeMenu();

    window.localStorage.removeItem('alunos');

    Toastify({
        text: "Dados limpados com sucesso!",
        duration: 3000,
        close: true,
        gravity: "top",
        position: "right",
        stopOnFocus: true,
        style: {
          background: "linear-gradient(to right, #00b09b, #96c93d)",
        },
    }).showToast();

}

function notFoundAlunos(){
    Toastify({
        text: "Nenhum aluno cadastrado!",
        duration: 3000,
        close: true,
        gravity: "top",
        position: "right",
        stopOnFocus: true,
    }).showToast();
}