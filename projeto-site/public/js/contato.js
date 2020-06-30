function validaContato(){
    var erros = []
    if(!nome.value){
        erros.push("Preencha seu Nome")
        nome.value = ''
    }
    if((email.value.search("@") == -1) || (email.value.search(".") == -1) || (email.value.search(" ") >= 1)){
        erros.push("o formato de email é: email@exemplo.com")
        email.value = ''
    }
    if((!celular.value.length == 12) || (celular.value.search("-") == -1) || (celular.value[celular.value.length - 5 != "-"])){
        erros.push("O formato de Telefone é é DDD XXXX-XXXX")
        celular.value = ''
    }
    if(!mensagem.value){
        erros.push("Preencha a mensagem")
    }
    if(mensagem.value.length <= 30){
        erros.push("A mensagem deve ter no mínimo 30 caracteres")
    }
    return erros
}
 function enviaContato() {
     sucesso.innerHTML = ''
     var erros = validaContato();
     mensagemErro.innerHTML = '';
     if (erros.length > 0) {       sucesso.style.display = 'none'
         for (var a = 0; a < erros.length; a++) {
             var erro = erros[a];
             var li = document.createElement("li");
          li.innerHTML = erro;
          mensagemErro.appendChild(li);

       }
     }
   else {
       sucesso.style.display = 'block'
        sucesso.innerHTML = 'Mensagem Enviada!'
  }
}