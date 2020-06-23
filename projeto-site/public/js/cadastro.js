function enviaCadastro() {
    sucesso.innerHTML = ''
    var erros = validaCadastro();
    mensagemErro.innerHTML = '';
    if (erros.length > 0) {
        for (var a = 0; a < erros.length; a++) {
            var erro = erros[a];
            var li = document.createElement("li");
            li.innerHTML = erro;
            mensagemErro.appendChild(li);

        }
    }
    else {
        sucesso.style.display = 'block'
        sucesso.innerHTML = 'Cadastro Criado com sucesso!'
    }
}
function validaCadastro(){
    var erros = []
    if(!nome.value){
        erros.push("Preencha o Nome")
    }
    if((email.value.search("@") == -1) || (email.value.search(".") == -1) || (email.value.search(" ") >= 1)){
        erros.push("o formato de email é: email@exemplo.com")
    }
    if(senha.value.length < 8){
        erros.push("A senha deve possuir no mínimo 8 caracteres")

    }
    if(senha.value !== c_senha.value){
        erros.push("A senha e a confirmação de senha devem ser iguais.")
    }
    if((!cpf.value.length == 12) || (cpf.value.search("-") == -1) || (cpf.value[cpf.value.length - 3 != "-"])){
        erros.push("O formato de CPF é 000000000-00")
    }
    return erros
}