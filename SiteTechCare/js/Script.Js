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

function login(){

  var tem_arroba = mensagem.value;
  var tem_ponto = mensagem.value; 
  
  tem_arroba = tem_arroba.indexOf('@') > 0;
  tem_ponto = tem_ponto.indexOf('.') > 0;

  if(tem_arroba && tem_ponto){
      alert ('email Valido');
     // window.location.href = "../index.html";
      
  }else {
      alert ('email invalido');
  }

}