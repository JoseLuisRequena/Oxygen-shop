


const butom_go_up = document.querySelector('#go_up');
const barra_indicador = document.querySelector('.indicador_scroll');
const obtener_px_inicio = () => document.documentElement.scrollTop || document.body.scrollTop
const goUp = () => {
    if (obtener_px_inicio() > 0){
        requestAnimationFrame(goUp);
        scrollTo(0, obtener_px_inicio() - (obtener_px_inicio()/20));
    }
}
const indicarScroll = () => {
    const px_inicio = obtener_px_inicio();
    if (px_inicio > 50){
        butom_go_up.className = 'mostrar';
    } else {
        butom_go_up.className = 'ocultar';
    }
    let alto = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    let avance_scroll = (Math.round((px_inicio / alto) * 10000)/100);
    
    barra_indicador.style.width = `${avance_scroll}%`;
}
butom_go_up.addEventListener('click', goUp);
window.addEventListener('scroll', indicarScroll);
