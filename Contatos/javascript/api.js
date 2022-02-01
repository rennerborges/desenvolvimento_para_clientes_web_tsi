const baseUrl = 'http://68.232.175.10:8080';

async function GetUsuarios() {
  return Ajax(`${baseUrl}/usuarios`, 'GET');
}

async function PostUsuario(body) {
  return Ajax(`${baseUrl}/usuarios`, 'POST', body);
}

async function UpdateUsuario(body) {
  return Ajax(`${baseUrl}/usuarios`, 'PUT', body);
}

async function DeleteUsuario(id) {
  return Ajax(`${baseUrl}/usuarios/${id}`, 'DELETE');
}
