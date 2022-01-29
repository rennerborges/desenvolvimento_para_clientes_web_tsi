
typerWriter();
unloadScrollBars();

setTimeout(()=>{
  const flash = document.querySelector('#flash');
  flash.style.display = 'none';
  reloadScrollBars();

}, 3000)

document.addEventListener("scroll", function() {
  const posicaoy = window.pageYOffset;
  const header = document.querySelector('body > header');

  header.style.borderColor = posicaoy > 10 ? 'var(--azul)' : 'transparent';
  header.style.backgroundColor = posicaoy > 10 ? 'rgba(255,255,255,0.7)' : 'white';

});


window.addEventListener('load', ()=> {
  setEventHandleChangeShowModal();
  setEventValidateInputs();
});

function setEventHandleChangeShowModal(){
  const [...elements] = document.querySelectorAll('.closeModal');

  elements.forEach(element => {
    element.addEventListener('click', closeModal);
  });

  document.querySelector('.btn-criarContato').addEventListener('click', openModal)
}

function setEventValidateInputs(){
  const form = document.forms[0];

  form.addEventListener('submit', submit);
  form.nome.addEventListener('blur', validarNome);
  form.email.addEventListener('blur', validarEmail);
  form.telefone.addEventListener('blur', validarTelefone);
}

function submit(event){
  event.preventDefault();

  if(!isValidSubmit()){
    return;
  }

}

function isValidSubmit(){
  const form = document.forms[0];
  
  let isError = false;

  if(!validarNome(form.nome)){
    isError = true;
  }

  if(!validarTelefone(form.telefone)){
    isError = true;
  }

  if(!validarEmail(form.email)){
    isError = true;
  }

  return !isError;
}

function closeModal(){
  const form = document.forms[0];

  const backdrop = document.querySelector('.backdrop');
  
  document.forms[0].reset();

  backdrop.style.display = 'none';

  removeError(form.nome);
  removeError(form.telefone);
  removeError(form.email);

  reloadScrollBars();
}

function openModal(){
  const backdrop = document.querySelector('.backdrop');
  backdrop.style.display = 'flex';
  unloadScrollBars();
  
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

function validarNome(event){
  const regex = /^(^[A-Za-z ]+)$/;

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

function setError(element){
  element.classList.add('error__input');
}

function removeError(element){
  element.classList.remove('error__input');
}

function unloadScrollBars() {
  document.documentElement.style.overflow = 'hidden';
  document.body.scroll = "no"; // IE
}

function reloadScrollBars() {
  document.documentElement.style.overflow = 'auto';
  document.body.scroll = "yes"; // IE
}