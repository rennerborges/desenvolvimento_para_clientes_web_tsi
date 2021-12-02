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
    const form = document.forms['cadastro'];
    form.estado.addEventListener('change', selectEstado);

    form.nome.addEventListener('blur', validarNome);
    form.idade.addEventListener('blur', validarIdade);
    form.dataNascimento.addEventListener('blur', validarDataNascimento);
    form.identificacao.addEventListener('blur', validarIdentificacao);
    form.email.addEventListener('blur', validarEmail);
    form.telefone.addEventListener('blur', validarTelefone);
    form.estado.addEventListener('blur', validarSelect);
    form.cidade.addEventListener('blur', validarSelect);

    form.addEventListener('submit', submit);
}

function selectEstado(event){
    const {selectedIndex} = event.target;

    const optionSelecionada = data.estados[selectedIndex-1];

    prepareValuesSelectCidade(optionSelecionada.sigla);
}

function validarNome(event){
    const regex = /^([A-Z][a-z]{1,29})$/;

    const input = event.target || event;
    const {value} = input;

    const condition = regex.test(value);

    if(condition){
        removeError(input);
    }else{
        setError(input);
    }

    return condition;

}

function validarIdade(event){
    const input = event.target || event;
    const {value} = input;

    const condition = value < 18 || value > 110;

    if(condition){
        setError(input);
    }else{
        removeError(input);
    }

    return !condition;
}

function validarDataNascimento(event){
    const regex = /^([0-9]{2}\/[0-9]{2}\/[0-9]{4})$/;

    const input = event.target || event;
    const {value} = input;

    const condition = regex.test(value) && isValidDate(value);

    if(condition){
        removeError(input);
    }else{
        setError(input);
    }

    return condition;
}

function isValidDate(date){

    date = date.split('/').reverse().join('-');

    return Boolean(new Date(date).getTime());

}

function validarIdentificacao(event){
    const regexCPF = /^([0-9]{3}\.[0-9]{3}\.[0-9]{3}-[0-9]{2})$/;
    const regexCNPJ = /^([0-9]{2}\.[0-9]{3}\.[0-9]{3}\/[0-9]{4}-[0-9]{2})$/;
    const input = event.target || event;
    const {value} = input;

    const valueNotFormmated = value.replace(/[\.\-\/]/g, '');

    const condition = (regexCPF.test(value) || regexCNPJ.test(value)) && (isCNPJ(valueNotFormmated) || isCPF(valueNotFormmated));

    if(condition){
        removeError(input);
    }else{
        setError(input);
    }

    return condition;
}

function validarEmail(event){
    const regex = /^([a-zA-Z][a-zA-Z0-9\-\_\.]+@[a-zA-Z]{3,}\.(com|biz|me)(\.[A-Za-z]{2})?)$/;

    const input = event.target || event;
    const {value} = input;

    const condition =  regex.test(value);

    if(condition){
        removeError(input);
    }else{
        setError(input);
    }

    return condition;
}

function validarTelefone(event){
    const regex = /^((\([0-9]{2}\))? ?9?[0-9]{4}\-?[0-9]{4})$/;

    const input = event.target || event;
    const {value} = input;

    const condition =  regex.test(value);

    if(condition){
        removeError(input);
    }else{
        setError(input);
    }
    
    return condition;
}

function validarSexo(){
    const form = document.forms['cadastro'];

    const [...radios] = form.sexo;
    
    const checked = radios.find(radio => radio.checked);

    const fieldset = document.getElementById("sexo");
    
    if(checked){
        removeError(fieldset);
    }else{
        setError(fieldset);
    }

    return checked;
}

function validarIdiomas(){
    const form = document.forms['cadastro'];

    const [...checkboxs] = form.idiomas;

    const checkeds = checkboxs.filter(checkbox => checkbox.checked);

    const fieldset = document.getElementById("idiomas");

    const condition = checkeds.length <= 2;

    if(condition){
        setError(fieldset);
    }else{
        removeError(fieldset);
    }

    return !condition;
}

function validarSelect(event){
    const select = event.target || event;
    const {selectedIndex} = select;

    if(selectedIndex){
        removeError(select);
    }else{
        setError(select)
    }

    return selectedIndex;
}

function setError(element){
    element.classList.add('error__input');
}

function removeError(element){
    element.classList.remove('error__input');
}

function submit(event){
    const form = document.forms['cadastro'];

    const validacoes = {
        nome: {
            input: form.nome,
            function: validarNome,
        },
        idade: {
            input: form.idade,
            function: validarIdade,
        },
        dataNascimento: {
            input: form.dataNascimento,
            function: validarDataNascimento,
        },
        identificacao: {
            input: form.identificacao,
            function: validarIdentificacao,
        },
        email: {
            input: form.email,
            function: validarEmail,
        },
        telefone: {
            input: form.telefone,
            function: validarTelefone,
        },
        sexo: {
            function: validarSexo,
        },
        idiomas: {
            function: validarIdiomas
        },
        estado: {
            input: form.estado,
            function: validarSelect,
        },
        cidade: {
            input: form.cidade,
            function: validarSelect,
        }
    }

    for(const inputName in validacoes){

        const element = validacoes[inputName];
        
        
        if(!element.function(element.input)){
            console.log(inputName)
            event.preventDefault();
        }
    }
}
