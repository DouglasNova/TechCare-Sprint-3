function func_0(){
    let nome1 = nome.value
    let email1 = email.value
    let senha1 = senha.value
    let senha2 = r_senha.value
    let cpf1 = cpf.value
    if(nome1.length > 0 && email1.length > 0 && senha1.length > 8 && senha2.length > 8 && cpf1.length == 11 && senha1 == senha2){
        alert("Cadastro Concluído com Sucesso")
    }
    else{
        alert("verifique seus dados")
    }
}