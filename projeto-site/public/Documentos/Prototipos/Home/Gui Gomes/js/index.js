var contador = 0
function func_0(){
    contador++
    options.style.display = 'block'
    if(contador == 2){
        contador = 0
        options.style.display = 'none'
    }
}
