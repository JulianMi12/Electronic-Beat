
function colorContainer(){
 

  let btn_text_colors = ["black", "rgba(228, 228, 228, 255)"];
  let random = Math.floor(Math.random() * btn_text_colors.length);
  if(random==0){
  document.querySelector(".container").style.background = btn_text_colors[random];
  document.getElementById("body").style.color= "white";
  }else{
    document.querySelector(".container").style.background = btn_text_colors[random];
    document.getElementById("body").style.color= "black";
  }
 }
 function colorTitulos(){
 
  let btn_text_colors = ["red", "orange","green","#474cb1"];
  let random = Math.floor(Math.random() * btn_text_colors.length);
  document.querySelector(".origen").style.color= btn_text_colors[random];
 
 }
function mostrar(){
  document.querySelector(".imgs").style.display = 'block';
  }
function ocultar(){
  document.querySelector(".imgs").style.display = 'none';
}
 function oculMost(){
  var imgs = document.querySelector(".imgs");
  if(imgs.style.display=="none") {
    mostrar();
  }else{
    ocultar();
  }
    }