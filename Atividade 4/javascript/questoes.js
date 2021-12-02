window.addEventListener('load', ()=> {
    InitEvents();
    prepareValuesSelectEstado()
})

function prepareValuesSelectEstado(){
    const estados = data.estados;

    let select = document.forms['cadastro'].estado;

    select.innerHTML = estados.reduce((inner, estado)=> inner + `<option value="${estado.sigla}">${estado.sigla} - ${estado.nome}</option>`,'<option disabled selected>Selecione um estado</option>');
}

function prepareValuesSelectCidade(siglaEstado){
    const {cidades} = data.estados.find((estado) => estado.sigla === siglaEstado);
    const select = document.forms['cadastro'].cidade;

    if(select.disabled){
        select.disabled = false;
    }

    select.innerHTML = cidades.reduce((inner, cidade)=> inner + `<option value="${siglaEstado}-${cidade}">${cidade}</option>`,'<option disabled selected>Selecione uma cidade</option>');
}



function InitEvents(){
    const form = document.forms['cadastro']
    form.estado.addEventListener('change', selectEstado);

    form.nome.addEventListener('blur', validarNome);
    form.idade.addEventListener('blur', validarIdade);
    form.dataNascimento.addEventListener('blur', validarDataNascimento);
    form.identificacao.addEventListener('blur', validarIdentificacao);
    form.email.addEventListener('blur', validarEmail);
}

function selectEstado(event){
    const {selectedIndex} = event.target;

    const optionSelecionada = data.estados[selectedIndex-1];

    prepareValuesSelectCidade(optionSelecionada.sigla);
}

function validarInput(input){
    const {value} = input;
    if(!value){
        input.classList.add('error__input');
    }else{
        input.classList.remove('error__input');
    }
}

function validarNome(event){
    const regex = /^([A-Z][a-z]{1,29})$/;

    const input = event.target;
    const {value} = input;

    if(regex.test(value)){
        input.classList.remove('error__input');
    }else{
        input.classList.add('error__input');
    }

}

function validarIdade(event){
    const input = event.target;
    const {value} = input;

    if(value < 18 || value > 110){
        input.classList.add('error__input');
    }else{
        input.classList.remove('error__input');
    }
}

function validarDataNascimento(event){
    const regex = /^([0-9]{2}\/[0-9]{2}\/[0-9]{4})$/;

    const input = event.target;
    const {value} = input;

    if(regex.test(value) && isValidDate(value)){
        input.classList.remove('error__input');
    }else{
        input.classList.add('error__input');
    }
}

function isValidDate(date){

    date = date.split('/').reverse().join('-');

    return Boolean(new Date(date).getTime());

}

function validarIdentificacao(event){
    const regexCPF = /^([0-9]{3}\.[0-9]{3}\.[0-9]{3}-[0-9]{2})$/;
    const regexCNPJ = /^([0-9]{2}\.[0-9]{3}\.[0-9]{3}\/[0-9]{4}-[0-9]{2})$/;
    const input = event.target;
    const {value} = input;

    const valueNotFormmated = value.replace(/[\.\-\/]/g, '');

    if((regexCPF.test(value) || regexCNPJ.test(value)) && (isCNPJ(valueNotFormmated) || isCPF(valueNotFormmated))){
        input.classList.remove('error__input');
    }else{
        input.classList.add('error__input');
    }
}

function validarEmail(event){
    const regex = /^([a-zA-Z][a-zA-Z0-9\-\_\.]+@[a-zA-Z]{3,}\.(com|biz|me)(\.[A-Za-z]{2})?)$/;

    const input = event.target;
    const {value} = input;

    if(regex.test(value)){
        input.classList.remove('error__input');
    }else{
        input.classList.add('error__input');
    }
}

function validarTelefone(event){}

function validarSexo(event){}

function validarIdiomas(event){}

function validarSelect(event){}
