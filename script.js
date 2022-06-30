

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

//JSON server
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
        console.log('form enviado')
        console.log(json)
    });
};

//Form validation
const clientNameInput = document.querySelector('#clientname');
const clientEmailInput= document.querySelector('#clientemail');
const checkbox= document.querySelector('#conditions');
const clientForm = document.querySelector('#form')
const submit = document.querySelector('.submit_modal')
const regexEmail= /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/

clientForm.addEventListener('submit', e =>{
    e.preventDefault()
    let valueName = ''
    if (clientNameInput.value.length < 2 || clientNameInput.value.length > 100){
        clientNameInput.classList.add('input--invalid');
        alert('el nombre tiene que tener entre 2 y 100 caracteres')
    }else{
        valueName = clientNameInput
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
    
    //Send data to server
    if (valueName.value && regexEmail.test(clientEmailInput.value) && checkbox.checked){
        const data = {
            name: valueName.value,
            email: clientEmailInput.value
        }
        enviarAJson(data);
        clientNameInput.value = '';
        clientEmailInput.value = '';
        checkbox.checked = false;
        submit.classList.add('submit_send');
        function colorButtonSend () {
            submit.classList.remove('submit_send');
        }
        setTimeout(colorButtonSend, 700);
    }
});

//Modal
const modal = document.querySelector('#modal');
const closeModal = document.querySelector('#close_modal');
const openModal = document.querySelector('#send_modal');
const emailModal = document.querySelector('.email_modal');
const nameModal = document.querySelector('.name_modal');

function open(){
    modal.showModal()
}
setTimeout(open, 1000);

closeModal.addEventListener('click', ()=>{
    modal.close();
    console.log('se cerro modal')
})

openModal.addEventListener('click', ()=>{
    if(!regexEmail.test(emailModal.value)){
        emailModal.classList.add('input--invalid');
        alert('Email incorrecto');
        setTimeout(open, 5000);
    }else{
        emailModal.classList.remove('input--invalid');
    }
    if(regexEmail.test(emailModal.value)){
        const data = {
            name: nameModal.value,
            email: emailModal.value
        }
        enviarAJson(data);
    }
    
})

//Pricing and currency exchange
const precing = [0, 25, 60];

document.querySelector('#pricing-basic-p').innerHTML = '$' + precing[0];
document.querySelector('#pricing-professional-p').innerHTML = '$' + precing[1];
document.querySelector('#pricing-premium-p').innerHTML = '$' + precing[2];

const currency = document.querySelector('.pricing-currency');

currency.addEventListener('change', ()=>{
    
    let dataCoin = () => { fetch('https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/eur.json')
  .then((response) => response.json())
  .then((data) => {
    const usd = data.eur.usd;
    const gbp = data.eur.gbp;

    let conversionBasic;
    let conversionProf;
    let conversionPremiun;
    let currenchart='';
    let curren = 1;

    if (currency.value === 'eur'){
        //console.log('selecciono euros');
        curren = usd
        currenchart= '€';
    } else if (currency.value === 'gbp'){
        //console.log('selecciono libras');
        curren = gbp
        currenchart= '₤';
    } else if (currency.value === 'usd'){
        //console.log('selecciono dolares');
        curren = 1
        currenchart= '$'
    }
        
    conversionBasic = currenchart + (precing[0]*curren);
    conversionProf = currenchart + (Math.round((precing[1]/curren)*100))/100;
    conversionPremiun = currenchart + (Math.round((precing[2]/curren)*100))/100;
   
    document.querySelector('#pricing-basic-p').innerHTML = conversionBasic;
    document.querySelector('#pricing-professional-p').innerHTML = conversionProf;
    document.querySelector('#pricing-premium-p').innerHTML = conversionPremiun;
    
    });
   
    };

    dataCoin();
    
    
}) 
