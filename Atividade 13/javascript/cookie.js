function setCookie(name, value, dateExpiracao, path = '/'){
    const cookie = `${name}=${value}; expires=${dateExpiracao}; path=${path}`;
    document.cookie = cookie;
}

function getCookie(name){
    const {cookie} = document;
    const cookies = cookie.split(';');
    let response = null;

    cookies.forEach((cookie)=>{
        const [chave, value] = cookie.split('=');
        if(chave === name){
            response = {[chave]: value}
        }
    })

    return response;
}