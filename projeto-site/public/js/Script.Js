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

// function login(){

//   var tem_arroba = mensagem.value;
//   var tem_ponto = mensagem.value; 
  
//   tem_arroba = tem_arroba.indexOf('@') > 0;
//   tem_ponto = tem_ponto.indexOf('.') > 0;

//   if(tem_arroba && tem_ponto){
//       alert ('email Valido');
//       window.location.href = "../pages/DashBoard.html";
      
//   }else {
//       alert ('email invalido');
//   }

// }

// teste

function entrar() {
  var formulario = new URLSearchParams(new FormData(login));
  fetch("/usuarios/autenticar", {
      method: "POST",
      body: formulario
  }).then(resposta => {
      
      if (resposta.ok) {

          resposta.json().then(json => {

              sessionStorage.login_usuario_meuapp = json.Email_func;
              sessionStorage.nome_usuario_meuapp = json.Nome_Funcionario;
              
              window.location.href = '../pages/Dashboard/DashBoard.html';
          });

      } else {

          console.log('Erro de login!');

          response.text().then(texto => {
              console.error(texto);
              finalizar_aguardar(texto);
          });
      }
  });

  return false;
}