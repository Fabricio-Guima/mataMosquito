
let altura = 0;
let largura = 0;
let vidas = 1;
let tempo = 15;
let criaMosquitoTempo = 1500;
let nivel = window.location.search;
nivel = nivel.replace('?', '');

if(nivel === 'normal') {
    //1500 = 1.5 segundos
    criaMosquitoTempo = 1500;
}else if(nivel === 'dificil'){
    // 1000 = 1 segundo
    criaMosquitoTempo = 1000;
}else if(nivel === 'dantmustdie'){
    //750 = 3/4 de um segundo
    criaMosquitoTempo = 750;
}

//pegar dinamicamente o tamanho do palco é com onresize no body
function ajustaTamanhoPalcoJogo(){
     altura = window.innerHeight;
     largura = window.innerWidth;

     console.log(largura, altura);
}

ajustaTamanhoPalcoJogo();

let cronometro = setInterval( function(){

    tempo -= 1;
    if( tempo < 0 ) {
        clearInterval(cronometro)
        clearInterval(criaMosquito);
        window.location.href = 'vitoria.html';
    }  
    else {
        document.getElementById('cronometro').innerHTML = tempo;
    }
   
    
},1000)

/* essa funcao será chamada após a renderizacao do body, ela ficará la na tag
de fechamento do body */

function posicaoRandomica() {

//remover o mosquito anterior para criar outro e assim nao poluir a tela (caso exista)
if(document.querySelector('#mosquito')) {
    document.querySelector('#mosquito').remove();
    
    //remove as vidas e caso ele perca, redireciona-lo a outra pagina
    if(vidas > 3) {
        window.location.href = 'fim_de_jogo.html';
    }
    else {
    document.getElementById('v' + vidas).src = "img/coracao_vazio.png";
    vidas++;
    }
}



    /*criando posicao randomica para o mosquisto que esteja entre 0 e a largura da tela
e entre 0 e a altura da tela. Multiplico e depois arredondo o numero pra baixo */ 
// 90 é para a imagem nao sair da tela
let posicaoX = Math.floor(Math.random() * largura) - 90;
let posicaoY = Math.floor(Math.random() * altura) -90;
// se minha posicao for {0,0} vai dar ruim
posicaoX = posicaoX < 0 ? 0 : posicaoX;
posicaoy = posicaoY < 0 ? 0 : posicaoY;

console.log(posicaoX, posicaoY);

/*Criar o elemento html, moquisto */

let mosquito = document.createElement('img');
mosquito.src = 'img/mosquito.png';
mosquito.className = tamanhoAleatorio() + ' ' + ladoAleatorio();
mosquito.style.left = (posicaoX + 'px');
mosquito.style.top = (posicaoy + 'px');
mosquito.style.position = 'absolute';
mosquito.id = 'mosquito'
//remove o mosquito quando clicado
mosquito.onclick = function() {
    this.remove()
}

//mostrando mosquito na tela do body
document.body.appendChild(mosquito);


}

function tamanhoAleatorio(){
    let classe = Math.floor((Math.random() * 3));
    
// nao preciso de break quando eu conseguir retornar algo
    switch(classe){
        case 0: 
            return 'mosquito1'

        case 1:
            return 'mosquito2'

        case 2:
            return 'mosquito3'
    }
}

// mostrar se o mosquito irá olhar para o lado esquerdo o direito quando surgir na tela
function ladoAleatorio() {
    let classe = Math.floor((Math.random() * 2));
    
// nao preciso de break quando eu conseguir retornar algo
    switch(classe){
        case 0: 
            return 'ladoA'

        case 1:
            return 'ladoB'

       
    }
}


