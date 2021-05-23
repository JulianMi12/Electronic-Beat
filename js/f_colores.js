
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
  document.querySelector(".origen3").style.color= btn_text_colors[random];
  document.querySelector(".origen4").style.color= btn_text_colors[random];
  document.querySelector(".origen5").style.color= btn_text_colors[random];
  document.querySelector(".origen6").style.color= btn_text_colors[random];
  document.querySelector(".origen7").style.color= btn_text_colors[random];
  document.querySelector(".gen").style.color= btn_text_colors[random];


 
 }
function mostrar(){
  document.querySelector(".imgs").style.display = 'block';
  document.querySelector(".text").style.display = 'block';  
  document.querySelector(".text2").style.display = 'block';
  document.querySelector(".text3").style.display = 'block';
  document.querySelector(".text4").style.display = 'block';
  document.querySelector(".text5").style.display = 'block';

  }
function ocultar(){
  document.querySelector(".imgs").style.display = 'none';
  document.querySelector(".text").style.display = 'none';  
  document.querySelector(".text2").style.display = 'none';
  document.querySelector(".text3").style.display = 'none';
  document.querySelector(".text4").style.display = 'none';
  document.querySelector(".text5").style.display = 'none';
}
 function oculMost(){
  var imgs = document.querySelector(".imgs");
  if(imgs.style.display=="none") {
    mostrar();
  }else{
    ocultar();
  }
    var text = document.querySelector(".text");
  if(text.style.display=="none") {
    mostrar();
  }else{
    ocultar();
  }
  
  var text2 = document.querySelector(".text2");
  if(text2.style.display=="none") {
    mostrar();
  }else{
    ocultar();

  }
  var text3 = document.querySelector(".text3");
  if(text3.style.display=="none") {
    mostrar();
  }else{
    ocultar();
  }

  var text4 = document.querySelector(".text4");
  if(text4.style.display=="none") {
    mostrar();
  }else{
    ocultar();
  }
  }
    