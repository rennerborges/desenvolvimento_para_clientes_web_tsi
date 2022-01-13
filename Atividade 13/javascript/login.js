(()=>{
    if(getCookie('token')){
        window.location.pathname = '/';
    }
})()

window.addEventListener('load', ()=>{
    const form = document.forms[0];

    form.addEventListener('submit', submit);
});

function submit(event){
    event.preventDefault();

    const defaultValues = {
        usuario: 'admin',
        password: 'admin'
    };

    const [usuario, password] = document.forms[0];
    
    if(usuario.value === defaultValues.usuario && password.value === defaultValues.password){
        
        let dataAtual = new Date();

        const value = JSON.stringify({
            usuario: usuario.value,
            date: dataAtual.toISOString(),
            tipo: 'admin', 
        });

        const name = 'token';
        let dateExpiracao = dataAtual.setDate(dataAtual.getDate() + 10);
        dateExpiracao = new Date(dateExpiracao).toUTCString();

        const btoaValue = btoa(value);

        setCookie(name, btoaValue, dateExpiracao);

        Toastify({
            text: "Logado com sucesso!",
            duration: 3000,
            close: false,
            gravity: "top", // `top` or `bottom`
            position: "right", // `left`, `center` or `right`
            stopOnFocus: false, // Prevents dismissing of toast on hover
            style: {
              background: "linear-gradient(to right, #00b09b, #96c93d)",
            },
        }).showToast();

        setTimeout(()=> {
            window.location.pathname = '/';
        }, 1500)

    }else{
        Toastify({
            text: "Usuário e/ou senha incorretos!",
            duration: 1500,
            close: false,
            gravity: "top", // `top` or `bottom`
            position: "right", // `left`, `center` or `right`
            stopOnFocus: false, // Prevents dismissing of toast on hover
            style: {
              background: "linear-gradient(to right, #f21c0d, #830f07)",
            },
        }).showToast();
    }
    
}