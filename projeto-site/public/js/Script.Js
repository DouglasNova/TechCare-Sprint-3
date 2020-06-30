function myFunction() {
  var x = document.getElementById("myTopnav");
  if (x.className === "nav") {
    x.className += " responsive";
  } else {
    x.className = "nav";
  }
}
const cards = document.querySelectorAll(".card");


//Script do Login

function entrar() {
  var formulario = new URLSearchParams(new FormData(login));
  fetch("/usuarios/autenticar", {
      method: "POST",
      body: formulario
  }).then(resposta => {
      
      if (resposta.ok) {

          resposta.json().then(json => {

              sessionStorage.login_usuario_meuapp = json.Email_func;
              sessionStorage.nome_usuario_meuapp = json.Nome_Func;
              sessionStorage.foto_user_meuapp = json.foto_perfil;
              
              window.location.href = '../pages/Dashboard/DashBoard.html';
          });

      } else {

          alert('Erro de login')
      }
  });

  return false;
}

// Script do contato

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

// Script do cadastro 

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

// Script do simulador 

function simular() {
  let qtLeitos = Number(leitos.value);
  let qtEnfermeiroLeito = qtLeitos / 4; // Média de 1 enfermeiro para cada 4 leitos 
  let remuneracaoEnfermeiro = qtEnfermeiroLeito * 3150; // média salárial de um enfermeiro, multiplicada pela quantidade de profissionais no hospital
  let gasto_mensal_monitoramento = qtEnfermeiroLeito * 286.24; // salário hora do enfermeiro multiplicado pelo tempo gasto mês monitorando alas 
  let gasto_porcetagem_monitoramento = gasto_mensal_monitoramento * 6;

  // Divisão do valor pago para enfermeiros monitorar a ala, pelo valor total gasto com salário dos enfermeiros. Multiplicando esse valor por 100 obtemos a porcentagem paga para enfermeiros monitorar alas
  $(".num").counterUp({delay: 8, time: 1000});
  porcentagem_mensal.innerHTML = gasto_porcetagem_monitoramento.toFixed(2);
  resultado.innerHTML = remuneracaoEnfermeiro.toFixed(2);
  gasto_para_monitorar.innerHTML = gasto_mensal_monitoramento.toFixed(2);

  leitos.value = '';

  resultado_calculo.style.display = 'block';

};
