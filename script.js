

//scrol
const butomGoUp = document.querySelector('#go_up');
const barraIndicador = document.querySelector('.indicador_scroll');
const obtenerPxInicio = () => document.documentElement.scrollTop || document.body.scrollTop
const goUp = () => {
    if (obtenerPxInicio() > 0){
        requestAnimationFrame(goUp);
        scrollTo(0, obtenerPxInicio() - (obtenerPxInicio()/25));
    }
}
const indicarScroll = () => {
    const pxInicio = obtenerPxInicio();
    if (pxInicio > 50){
        butomGoUp.className = 'mostrar';
    } else {
        butomGoUp.className = 'ocultar';
    }
    let alto = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    let avanceScroll = (Math.round((pxInicio / alto) * 10000)/100);
    
    barraIndicador.style.width = `${avanceScroll}%`;
}
butomGoUp.addEventListener('click', function(){
    setTimeout(function(){
        goUp();
    }, 200)});
    
window.addEventListener('scroll', indicarScroll);

//Servidor JSON
const enviarAJson = data => {
    fetch('https://jsonplaceholder.typicode.com/posts/1', {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: {
        'Content-type': 'application/json; charset=UTF-8',
        },
    })
    .then((response) => response.json())
    .then((json) =>{
        console.log(json)
    });
};

//validacion del form
const clientNameInput = document.querySelector('#clientname');
const clientEmailInput= document.querySelector('#clientemail');
const checkbox= document.querySelector('#conditions');
const textCheckbox = document.querySelector('.textcheck');
const clientForm = document.querySelector('#form')
const submit = document.querySelector('#submit')

clientForm.addEventListener('submit', e =>{
    e.preventDefault()
    const regexEmail= /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
    
    if (clientNameInput.value.length < 2 || clientNameInput.value.length > 100){
        clientNameInput.classList.add('input--invalid');
        alert('el nombre tiene que tener entre 2 y 100 caracteres')
    }else{
        clientNameInput.classList.remove('input--invalid');
    }
    if(!regexEmail.test(clientEmailInput.value)){
        clientEmailInput.classList.add('input--invalid');
        alert('Email incorrecto');
    }else{
        clientEmailInput.classList.remove('input--invalid');
    }
    if(!checkbox.checked){
        checkbox.classList.add('checkbox--invalid');
        alert('acepte las condiciones para enviar el formulario');
    } else{
        checkbox.classList.remove('checkbox--invalid');
    };
    //envio de los datos al servidor
    if (clientNameInput.value && clientEmailInput.value && checkbox.checked){
        const data = {
        name: clientNameInput.value,
        email: clientEmailInput.value
    };
    enviarAJson(data);
    clientNameInput.value = '';
    clientEmailInput.value = '';
    checkbox.checked = false;
    submit.classList.add('submit');
    function dddd () {
        submit.classList.remove('submit');
    }
    setTimeout(dddd, 700);
    }
});