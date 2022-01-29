const baseUrl = 'http://68.232.175.10:8080';

function Ajax(url, method, body){
  let fetchData = {
    method: method,
    headers: new Headers()
  }

  if(body){
    fetchData.body = body;
  }


  return fetch(url, fetchData);
}