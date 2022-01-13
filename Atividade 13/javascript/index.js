(()=>{
    if(!getCookie('token')){
        window.location.pathname = '/pages/login.html';
    }
})()