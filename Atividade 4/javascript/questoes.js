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
    document.forms['cadastro'].estado.addEventListener('change', selectEstado);

}

function selectEstado(event){
    const {selectedIndex, options} = event.target;

    const optionSelecionada = data.estados[selectedIndex-1];

    prepareValuesSelectCidade(optionSelecionada.sigla);
}
