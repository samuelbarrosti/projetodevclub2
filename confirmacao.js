const canvas = document.getElementById("matrix");

const ctx = canvas.getContext("2d");


canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


const letras =
"アイウエオカキクケコ0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";


const fonte = 18;


const colunas = Math.floor(canvas.width / fonte);


const chuva = [];


for(let i = 0; i < colunas; i++){

    chuva[i] = Math.random() * -100;

}


function desenhar(){


ctx.fillStyle = "rgba(2,6,23,0.08)";

ctx.fillRect(
0,
0,
canvas.width,
canvas.height
);



ctx.fillStyle="#00ff88";

ctx.font=fonte+"px monospace";



for(let i=0;i<chuva.length;i++){


const texto =
letras.charAt(
Math.floor(Math.random()*letras.length)
);



ctx.fillText(
texto,
i*fonte,
chuva[i]*fonte
);



if(
chuva[i]*fonte > canvas.height &&
Math.random()>0.98
){

chuva[i]=0;

}


chuva[i]++;


}


}


setInterval(desenhar,35);



window.addEventListener("resize",()=>{


canvas.width=window.innerWidth;

canvas.height=window.innerHeight;


});