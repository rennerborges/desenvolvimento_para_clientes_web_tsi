typerWriter();
unloadScrollBars();
getUsuarios();

const notyf = new Notyf({
  position: {
    x: 'right',
    y: 'top',
  },
});

document.addEventListener('scroll', function () {
  const posicaoy = window.pageYOffset;
  const header = document.querySelector('body > section > header');

  header.style.borderColor = posicaoy > 10 ? 'var(--azul)' : 'transparent';
  header.style.backgroundColor =
    posicaoy > 10 ? 'rgba(255,255,255,0.7)' : 'white';
});

window.addEventListener('load', () => {
  setEventHandleChangeShowModal();
  setEventValidateInputs();
});

function setEventHandleChangeShowModal() {
  const [...elements] = document.querySelectorAll('.closeModal');

  elements.forEach((element) => {
    element.addEventListener('click', closeModal);
  });

  document
    .querySelector('.btn-criarContato')
    .addEventListener('click', openModal);
}

function setEventValidateInputs() {
  const form = document.forms[0];

  form.addEventListener('submit', submit);
  form.nome.addEventListener('blur', validarNome);
  form.email.addEventListener('blur', validarEmail);
  form.telefone.addEventListener('blur', validarTelefone);
  form.telefone.addEventListener('keyup', setMaskTel);

  document.querySelector('.search input').addEventListener('keyup', search);

  document
    .querySelector('.icon-close-search')
    .addEventListener('click', clearSearch);
}

function clearSearch() {
  const element = document.querySelector('.search input');
  element.value = '';

  search(element);
}

function setMaskTel(event) {
  event.target.value = MaskTel(event.target.value);
}

function search(event) {
  let { value } = event.target || event;
  value = value.trim();
  const title = document.querySelector('.navigation > h1');
  const titleNotFound = document.querySelector('#notfound h1');
  const iconSearch = document.querySelector('.icon-search');
  const iconCloseSearch = document.querySelector('.icon-close-search');

  window.searchValue = value;

  if (value) {
    title.innerHTML = 'Sua pesquisa';
    searchFuse(value);

    iconCloseSearch.style.display = 'block';
    iconSearch.style.display = 'none';
  } else {
    title.innerHTML = 'Seus contatos';
    mountHTMLUsuarios(window.usuarios);

    iconSearch.style.display = 'block';
    iconCloseSearch.style.display = 'none';
  }

  titleNotFound.innerHTML = window.searchValue
    ? `Nenhum resultado encontrado para ${window.searchValue}`
    : 'Nenhum usuário encontrado';
}

async function submit(event) {
  event.preventDefault();

  if (!isValidSubmit()) {
    return;
  }

  handleChangePreloader(true);

  const form = document.forms[0];

  const body = {
    nome: form.nome.value,
    telefone: form.telefone.value,
    email: form.email.value,
  };

  try {
    if (window.idEditUser) {
      body.id = window.idEditUser;
      await UpdateUsuario(body);
    } else {
      await PostUsuario(body);
    }

    showSuccessMessage(
      window.idEditUser
        ? 'Contato atualizado com sucesso!'
        : 'Contato criado com sucesso!'
    );
    handleChangePreloader(false);
    closeModal();
    getUsuarios();
  } catch (error) {
    handleChangePreloader(false);
    showErrorMessage(error.message);
  }
}

function isValidSubmit() {
  const form = document.forms[0];

  let isError = false;

  if (!validarNome(form.nome)) {
    isError = true;
  }

  if (!validarTelefone(form.telefone)) {
    isError = true;
  }

  if (!validarEmail(form.email)) {
    isError = true;
  }

  return !isError;
}

function closeModal() {
  const form = document.forms[0];

  const backdrop = document.querySelector('.backdrop');

  document.forms[0].reset();

  backdrop.style.display = 'none';

  removeError(form.nome);
  removeError(form.telefone);
  removeError(form.email);

  document.querySelector('.titleModal').innerHTML = 'Criar contato';

  window.idEditUser = null;

  reloadScrollBars();
}

function openModal() {
  const backdrop = document.querySelector('.backdrop');
  backdrop.style.display = 'flex';
  unloadScrollBars();
}

function validarEmail(event) {
  const regex =
    /^([0-9a-zA-Z]+([_.-]?[0-9a-zA-Z]+)*@[0-9a-zA-Z]+[0-9,a-z,A-Z,.,-]*(.){1}[a-zA-Z]{2,4})+$/;

  const input = event.target || event;
  const { value } = input;

  const condition = regex.test(value);

  if (condition) {
    removeError(input);
  } else {
    setError(input);
  }

  return condition;
}

function validarTelefone(event) {
  const regex = /^((\([0-9]{2}\))? ?9?[0-9]{4}\-?[0-9]{4})$/;

  const input = event.target || event;
  const { value } = input;

  const condition = regex.test(value);

  if (condition) {
    removeError(input);
  } else {
    setError(input);
  }

  return condition;
}

function validarNome(event) {
  const regex = /^(^[A-Za-z ]+)$/;

  const input = event.target || event;
  const { value } = input;

  const condition = regex.test(value) && value.length > 3;

  if (condition) {
    removeError(input);
  } else {
    setError(input);
  }

  return condition;
}

function setError(element) {
  element.classList.add('error__input');
}

function removeError(element) {
  element.classList.remove('error__input');
}

function unloadScrollBars() {
  document.documentElement.style.overflow = 'hidden';
  document.body.scroll = 'no'; // IE
}

function reloadScrollBars() {
  document.documentElement.style.overflow = 'auto';
  document.body.scroll = 'yes'; // IE
}

async function getUsuarios() {
  try {
    if (window.isPassedGetUsuarios) {
      handleChangePreloader(true);
    }

    window.usuarios = await GetUsuarios();

    if (!window.isPassedGetUsuarios) {
      window.isPassedGetUsuarios = true;
      const flash = document.querySelector('#flash');

      flash.style.animationName = 'fadeout';

      setTimeout(() => {
        flash.style.display = 'none';
        reloadScrollBars();
      }, 1000);
    } else {
      handleChangePreloader(false);
    }

    mountHTMLUsuarios(window.usuarios);
  } catch (error) {
    showErrorMessage(error.message);
  }
}

function mountHTMLUsuarios(listUsers = []) {
  handleChangeNotFound(!listUsers.length);

  let usuarios = listUsers.map(
    (user) => `
      <tr>
        <td>
          <div class="container__nome">
            <img class="avatar" src="https://ui-avatars.com/api/?background=random&name=${user.nome.replace(
              /[ ]/g,
              '+'
            )}" alt="Avatar do ${user.nome}">
            ${user.nome}
          </div>
        </td>
        <td>${user.email}</td>
        <td>${MaskTel(user.telefone)}</td>
        <td>
          <i onclick="editUser(${user.id})" class="icon fas fa-user-edit"></i>

          <i onclick="deleteUser(${user.id})" class="icon fas fa-trash"></i>
        </td>
    </tr>
  `
  );

  usuarios = usuarios.join(' ');

  const table = document.querySelector('#tableUsuarios tbody');

  table.innerHTML = usuarios;
}

function editUser(id) {
  const user = window.usuarios.find((user) => user.id === id);

  window.idEditUser = id;

  if (!user) {
    return showErrorMessage('Nenhum usuário encontrado');
  }

  const form = document.forms[0];

  form.nome.value = user.nome;
  form.telefone.value = MaskTel(user.telefone);
  form.email.value = user.email;

  document.querySelector('.titleModal').innerHTML = 'Editar contato';

  openModal();
}

async function deleteUser(id) {
  try {
    handleChangePreloader(true);

    await DeleteUsuario(id);

    handleChangePreloader(false);

    showSuccessMessage('Usuário apagado com sucesso!');

    getUsuarios();
  } catch (error) {
    handleChangePreloader(false);
    showErrorMessage(error);
  }
}

function searchFuse(value) {
  const options = {
    threshold: 0.4,
    keys: ['nome', 'email', 'telefone'],
  };

  const fuse = new Fuse(window.usuarios, options);

  let search = fuse.search(value);

  search = search.map((searchItem) => searchItem.item);

  mountHTMLUsuarios(search);
}

function handleChangeNotFound(showNotFound) {
  const table = document.getElementById('tableUsuarios');
  const notfound = document.getElementById('notfound');

  if (!showNotFound) {
    table.style.display = 'table';
    notfound.style.display = 'none';
  } else {
    table.style.display = 'none';
    notfound.style.display = 'flex';
  }
}

function showErrorMessage(message) {
  notyf.error({
    message: message,
    duration: 3000,
  });
}

function showSuccessMessage(message) {
  notyf.success({
    message: message,
    duration: 3000,
  });
}

function handleChangePreloader(showPreloader) {
  const preloader = document.querySelector('#preloader');

  if (showPreloader) {
    unloadScrollBars();
  } else {
    reloadScrollBars();
  }

  preloader.style.display = showPreloader ? 'flex' : 'none';
}
