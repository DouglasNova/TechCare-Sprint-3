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
