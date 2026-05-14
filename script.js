let c = document.getElementById("myCanvas");
let ctx = c.getContext("2d");

const salomao = new Audio('baseado.mp3');
const hino = new Audio('hino-sv.mp3');
const pedro = new Audio('pedro.mp3');
const image = document.getElementById("fogo");

let mostrarFogoBotaoVerde = false;
let mostrarFogoBotaoVermelho = false;
let mostrarFogoBotaoAmarelo = false;
let xLinha = 50;
let yBolinha = -40;
let divisao = 60;
let notas = [];

let desenharLinha = function(larguraInicio, alturaInicio, larguraFim, alturaFim) {
    ctx.moveTo(larguraInicio, alturaInicio);
    ctx.lineTo(larguraFim, alturaFim);
    ctx.stroke();
}

let desenharNota = function(x, y, cor) {
    ctx.beginPath();
    ctx.arc(x, y, 30, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.fillStyle = cor;
    ctx.fill();

    ctx.beginPath();
    ctx.arc(x, y, 20, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.fillStyle = 'black';
    ctx.fill();

    ctx.beginPath();
    ctx.arc(x, y, 18, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.fillStyle = 'white';
    ctx.fill();
}

let desenharBotao = function(x, y, cor) {
    ctx.beginPath();
    ctx.arc(x, y, 30, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.fillStyle = cor;
    ctx.fill();

    ctx.beginPath();
    ctx.arc(x, y, 25, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.fillStyle = 'white';
    ctx.fill();

    ctx.beginPath();
    ctx.arc(x, y, 23, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.fillStyle = 'black';
    ctx.fill();
}

let avisar = function() {
    ctx.font = "20px Arial";
    ctx.fillStyle = "white";
    ctx.textBaseline = 'middle';
    ctx.textAlign = 'center';
    ctx.fillText("Escolha a canção: ", 170, 280);
    ctx.fillText("1: Salomão - Baseado Em Quê?", 170, 320);
    ctx.fillText("2: Hino de São Vicente", 170, 360);
    ctx.fillText("3: Raul Seixas - Meu Amigo Pedro", 170, 400);
}

function criarNota(x, cor) {
  notas.push({ x: x, y: -20, cor: cor, velocidade: 2});
}

let desenharQuadro = function() {
    // linhas
    desenharLinha(xLinha, 0, xLinha, 750);
    desenharLinha(xLinha + divisao, 0, xLinha + divisao, 750);
    desenharLinha(xLinha + divisao * 2, 0, xLinha + divisao * 2, 750);
    desenharLinha(xLinha + divisao * 3, 0, xLinha + divisao * 3, 750);
    desenharLinha(xLinha + divisao * 4, 0, xLinha + divisao * 4, 750);

    // botões
    desenharBotao(xLinha, 720, "green");
    desenharBotao(xLinha + divisao, 720, "red");
    desenharBotao(xLinha + divisao * 2, 720, "yellow");
    desenharBotao(xLinha + divisao * 3, 720, "blue");
    desenharBotao(xLinha + divisao * 4, 720, "orange");
}

let desenharNotas = function() {
    ctx.clearRect(0, 0, c.width, c.height);
    desenharQuadro();
    
    // notas - o for atualiza o estado de cada nota
    for (let i = 0; i < notas.length; i++) {
        let nota = notas[i];
        nota.y += nota.velocidade;
        desenharNota(nota.x, nota.y, nota.cor);

        // remove e toma dano se sair da tela
        if (nota.y > c.height + 20) {
            document.getElementById("pontuacao").innerText = "Pontuação: " + (pontuacao -= 10);
            notas.splice(i, 1);
            i--;
        }
    }

    // Fogo Botão Verde
    if(mostrarFogoBotaoVerde)
        ctx.drawImage(image, 22, 680, 60, 60);

    // Fogo Botão Vermelho
    if(mostrarFogoBotaoVermelho)
        ctx.drawImage(image, 80, 680, 60, 60);

    // Fogo Botão Amarelo
    if(mostrarFogoBotaoAmarelo)
        ctx.drawImage(image, 140, 680, 60, 60);

    requestAnimationFrame(desenharNotas);
}

function tocarNotasHinoSV() {
    for (let i = 0; i < 2000; i += 500) {
        setTimeout(() => criarNota(xLinha, "green"), i);
    }
    for (let i = 2000; i < 4000; i += 500) {
        setTimeout(() => criarNota(xLinha + divisao, "red"), i);
    }
    for (let i = 4000; i < 6000; i += 500) {
        setTimeout(() => criarNota(xLinha + divisao * 2, "yellow"), i);
    }
    for (let i = 6000; i < 8000; i += 500) {
        setTimeout(() => criarNota(xLinha + divisao, "red"), i);
    }
}

function tocarNotasPedro() {
    for(let i = 0; i < 2000; i+=1000) {
        setTimeout(() => criarNota(xLinha, "green"), i);
    }
    for(let i = 1500; i < 3500; i+=1000) {
        setTimeout(() => criarNota(xLinha + divisao * 2, "yellow"), i);
    }
    for(let i = 3000; i < 5000; i+=1000) {
        setTimeout(() => criarNota(xLinha + divisao, "red"), i);
    }
    for(let i = 4500; i < 6500; i+=1000) {
        setTimeout(() => criarNota(xLinha + divisao * 2, "yellow"), i);
    }
}

let jaTocou = false;
let pontuacao = 0;

avisar();

document.addEventListener("keydown", function(event) {
  if (event.code === "Numpad1" || event.code === "Digit1" && !jaTocou) { // Baseado Em Quê
    salomao.play().catch(error => {
      console.log("O navegador bloqueou a reprodução automática:", error);
    });

    jaTocou = true;
    desenharNotas();
    
    for(let i = 0; i < 1000000; i+=8000) {
        setTimeout(() => criarNota(xLinha, "green"), i);
    }
    for(let i = 2000; i < 1000000; i+=8000) {
        setTimeout(() => criarNota(xLinha + divisao, "red"), i);
    }
    for(let i = 4000; i < 1000000; i+=8000) {
        setTimeout(() => criarNota(xLinha + divisao * 2, "yellow"), i);
    }
  }

  if (event.code === "Numpad2" || event.code === "Digit2" && !jaTocou) { // Hino de São Vicente
    hino.play().catch(error => {
      console.log("O navegador bloqueou a reprodução automática:", error);
    });

    jaTocou = true;
    desenharNotas();

    // Executa imediatamente
    tocarNotasHinoSV();
        
    setInterval(tocarNotasHinoSV, 8000);
  }

  if (event.code === "Numpad3" || event.code === "Digit3" && !jaTocou) { // Meu Amigo Pedro
    pedro.play().catch(error => {
      console.log("O navegador bloqueou a reprodução automática:", error);
    });

    jaTocou = true;
    desenharNotas();
    
    // Executa imediatamente
    tocarNotasPedro();
    
    setInterval(tocarNotasPedro, 6500);
  }

  if (event.code === "KeyA") {
    console.log("Tecla A foi pressionada")
    if(notas[0].y < 700) {
        document.getElementById("pontuacao").innerText = "Pontuação: " + (pontuacao -= 20);
    }
    else if(notas[0].cor == 'green' && notas[0].y >= 700 && notas[0].y <= 740) {
        mostrarFogoBotaoVerde = true;
        setTimeout(() => {
            mostrarFogoBotaoVerde = false;
        }, 150);
        document.getElementById("pontuacao").innerText = "Pontuação: " + (pontuacao += 20);
        notas.splice(0, 1);
    }
  }
  if (event.code === "KeyS") {
    console.log("Tecla S foi pressionada")
    if(notas[0].y < 700) {
        document.getElementById("pontuacao").innerText = "Pontuação: " + (pontuacao -= 20);
    }
    else if(notas[0].cor == 'red' && notas[0].y >= 700 && notas[0].y <= 740) {
        mostrarFogoBotaoVermelho = true;
        setTimeout(() => {
            mostrarFogoBotaoVermelho = false;
        }, 150);
        document.getElementById("pontuacao").innerText = "Pontuação: " + (pontuacao += 20);
        notas.splice(0, 1);
    }
  }
  if (event.code === "KeyJ") {
    console.log("Tecla J foi pressionada")
    if(notas[0].y < 700) {
        document.getElementById("pontuacao").innerText = "Pontuação: " + (pontuacao -= 20);
    }
    else if(notas[0].cor == 'yellow' && notas[0].y >= 700 && notas[0].y <= 740) {
        mostrarFogoBotaoAmarelo = true;
        setTimeout(() => {
            mostrarFogoBotaoAmarelo = false;
        }, 150);
        document.getElementById("pontuacao").innerText = "Pontuação: " + (pontuacao += 20);
        notas.splice(0, 1);
    }
  }
});