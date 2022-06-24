


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

//validacion del form
const clientNameInput = document.querySelector('#clientname');
const clientEmailInput= document.querySelector('#clientemail');
const checkbox= document.querySelector('#conditions');
const textCheckbox = document.querySelector('.textcheck');
const clientForm = document.querySelector('#form')

clientForm.addEventListener('submit', e =>{
    e.preventDefault()
    const regexEmail= /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
    
    if (clientNameInput.value.length < 2 || clientNameInput.value.length > 100){
        clientNameInput.style.borderBottomColor = "#ff0000" ;
        alert('el nombre tiene que tener entre 2 y 100 caracteres')
    }else{
        clientNameInput.style.borderBottomColor = "#95989A" ;
    }
    if(!regexEmail.test(clientEmailInput.value)){
        clientEmailInput.style.borderBottomColor = "#ff0000" ;
        alert('Email incorrecto');
    }else{
        clientEmailInput.style.borderBottomColor = "#95989A" ;
    }
    if(!checkbox.checked){
        textCheckbox.style.color = "#ff0000";
        alert('acepte las condiciones para enviar el formulario');
    } else{
        textCheckbox.style.color = "#000000";
    };
});
