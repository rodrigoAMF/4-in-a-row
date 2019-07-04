adicionaClick();
var jogadorAtual = 1;  // 1 jogador | 2 IA
var qntPecasColuna = [5,5,5,5,5,5,5];
var continua;
let fimAnimacao = false;
let colunasJogadas = "";
let dificuldade = localStorage.getItem("dificuldade");

document.getElementsByClassName("fundoComputador")[0].style["visibility"] = "hidden";


//Adiciona efeito de click em todas as div e seleciona a coluna
function adicionaClick() {
  let divName = "";
  for(let i=0; i < 7; i++) {
      for (let j=0; j < 6; j++) {
          divName = "posicao" + j + "-" + i;
          if (i === 0) {
              document.getElementById(divName).addEventListener("click", clickColuna0);
          } else if (i === 1) {
              document.getElementById(divName).addEventListener("click", clickColuna1);
          } else if (i === 2) {
              document.getElementById(divName).addEventListener("click", clickColuna2);
          } else if (i === 3) {
              document.getElementById(divName).addEventListener("click", clickColuna3);
          } else if (i === 4) {
              document.getElementById(divName).addEventListener("click", clickColuna4);
          } else if (i === 5) {
              document.getElementById(divName).addEventListener("click", clickColuna5);
          } else if (i === 6) {
              document.getElementById(divName).addEventListener("click", clickColuna6);
          } else if (i === 7) {
              document.getElementById(divName).addEventListener("click", clickColuna7);
          }

      }
  }
}


function clickColuna0(){
    if(qntPecasColuna[0] >= 0){efetuarJogada(0);}
}

function clickColuna1(){
    if(qntPecasColuna[1] >= 0){efetuarJogada(1);}
}

function clickColuna2(){
    if(qntPecasColuna[2] >= 0){efetuarJogada(2);}
}

function clickColuna3(){
    if(qntPecasColuna[3] >= 0){efetuarJogada(3);}
}

function clickColuna4(){
    if(qntPecasColuna[4] >= 0){efetuarJogada(4);}
}

function clickColuna5(){
    if(qntPecasColuna[5] >= 0){efetuarJogada(5);}
}

function clickColuna6(){
    if(qntPecasColuna[6] >= 0){efetuarJogada(6);}
}


function efetuarJogada(coluna){
    if(jogadorAtual !== 1) return;
    // Efetua jogada jogador
    fimAnimacao = false;
    animarJogada(coluna, jogadorAtual, qntPecasColuna[coluna]);
    while(!fimAnimacao);

    colunasJogadas += coluna;
    qntPecasColuna[coluna]--;
    jogadorAtual = (jogadorAtual === 1) ? 2 : 1;

    // # Efetua jogada IA
    const url = "http://localhost:5000?jogadas=" + colunasJogadas.toString()
            + "&dificuldade=3";

    $.getJSON(url, function(data){
        console.log(data);
        coluna = data.melhor_coluna_para_jogar;
        fimAnimacao = false;
        animarJogada(coluna, jogadorAtual, qntPecasColuna[coluna]);
        while(!fimAnimacao);

        colunasJogadas += coluna;
        qntPecasColuna[coluna]--;
        jogadorAtual = (jogadorAtual === 1) ? 2 : 1;
    });


}

function animarJogada(coluna, jogadorAtual, qtdPecasColuna){
    document.getElementsByClassName("bolinhaDesce"+coluna)[0].style["display"] = "block";

    if(jogadorAtual === 1){ // vez do jogador
        document.getElementsByClassName("bolinhaDesce"+coluna)[0].style["background"] = "#008b8b";
    }else{
        document.getElementsByClassName("bolinhaDesce"+coluna)[0].style["background"] = "#8b0000";
    }

    var div = $(".bolinhaDesce"+coluna);
    desloca = (14*(6*(5-qtdPecasColuna)));

    div.animate({bottom: desloca +'px'}, 800, "linear", function() {
        if(jogadorAtual === 1){ // vez do jogador
            document.getElementById("posicao"+qtdPecasColuna+"-"+coluna).style.backgroundColor  = "#008b8b";
            document.getElementsByClassName("fundoComputador")[0].style["visibility"] = "visible";
            document.getElementsByClassName("fundoPessoa")[0].style["visibility"] = "hidden";
        } else {
            document.getElementById("posicao"+qtdPecasColuna+"-"+coluna).style.backgroundColor  = "#8b0000";
            document.getElementsByClassName("fundoComputador")[0].style["visibility"] = "hidden";
            document.getElementsByClassName("fundoPessoa")[0].style["visibility"] = "visible";
        }
        document.getElementsByClassName("bolinhaDesce"+coluna)[0].style["display"] = "none";
        div.removeAttr('style');
    });
    fimAnimacao = true;
}