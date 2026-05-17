let c = document.getElementById("myCanvas");
let ctx = c.getContext("2d");

const salomao = new Audio("baseado.mp3");
const hino = new Audio("hino-sv.mp3");
const pedro = new Audio("pedro.mp3");
const shake_it_off = new Audio("shake_it_off.mp3");
const slow_ride = new Audio("slow_ride.mp3");

const image = document.getElementById("fogo");

const volumeControl = document.getElementById("volumeControl");
const volumeValue = document.getElementById("volumeValue");

const musicas = [salomao, hino, pedro, shake_it_off, slow_ride];

musicas.forEach(musica => musica.volume = 0.5);

volumeControl.addEventListener("input", function () {
    const volume = this.value / 100;

    musicas.forEach(musica => {
        musica.volume = volume;
    });

    volumeValue.innerText = this.value + "%";
});

let mostrarFogoBotaoVerde = false;
let mostrarFogoBotaoVermelho = false;
let mostrarFogoBotaoAmarelo = false;

let xLinha = 50;
let divisao = 60;

let notas = [];
let jaTocou = false;
let pontuacao = 0;

function desenharLinha(x1, y1, x2, y2) {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
}

function desenharNota(x, y, cor) {
    ctx.beginPath();
    ctx.arc(x, y, 30, 0, 2 * Math.PI);
    ctx.fillStyle = cor;
    ctx.fill();
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(x, y, 20, 0, 2 * Math.PI);
    ctx.fillStyle = "black";
    ctx.fill();
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(x, y, 18, 0, 2 * Math.PI);
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.stroke();
}

function desenharBotao(x, y, cor) {
    ctx.beginPath();
    ctx.arc(x, y, 30, 0, 2 * Math.PI);
    ctx.fillStyle = cor;
    ctx.fill();
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(x, y, 25, 0, 2 * Math.PI);
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(x, y, 23, 0, 2 * Math.PI);
    ctx.fillStyle = "black";
    ctx.fill();
    ctx.stroke();
}

function avisar() {
    ctx.font = "bold 16px Arial";
    ctx.fillStyle = "#00ff41";
    ctx.textAlign = "center";

    ctx.shadowColor = "rgba(0,255,65,0.5)";
    ctx.shadowBlur = 10;

    ctx.fillText("SELECT A SONG", 170, 280);
    ctx.fillText("1: Salomão - Baseado Em Quê?", 170, 320);
    ctx.fillText("2: Hino de São Vicente", 170, 360);
    ctx.fillText("3: Raul Seixas - Meu Amigo Pedro", 170, 400);
    ctx.fillText("4: Shake It Off - Taylor Swift", 170, 440);
    ctx.fillText("5: Slow Ride - Foghat", 170, 480);

    ctx.shadowBlur = 0;
}

function desenharQuadro() {
    desenharLinha(xLinha, 0, xLinha, 750);
    desenharLinha(xLinha + divisao, 0, xLinha + divisao, 750);
    desenharLinha(xLinha + divisao * 2, 0, xLinha + divisao * 2, 750);
    desenharLinha(xLinha + divisao * 3, 0, xLinha + divisao * 3, 750);
    desenharLinha(xLinha + divisao * 4, 0, xLinha + divisao * 4, 750);

    desenharBotao(xLinha, 720, "green");
    desenharBotao(xLinha + divisao, 720, "red");
    desenharBotao(xLinha + divisao * 2, 720, "yellow");
    desenharBotao(xLinha + divisao * 3, 720, "blue");
    desenharBotao(xLinha + divisao * 4, 720, "orange");
}

function criarNota(x, cor) {
    notas.push({
        x: x,
        y: -20,
        cor: cor,
        velocidade: 2
    });
}

function desenharNotas() {
    ctx.clearRect(0, 0, c.width, c.height);

    desenharQuadro();

    for (let i = 0; i < notas.length; i++) {
        let nota = notas[i];

        nota.y += nota.velocidade;

        desenharNota(nota.x, nota.y, nota.cor);

        if (nota.y > c.height + 20) {
            pontuacao -= 10;

            document.getElementById("pontuacao").innerText =
                "Pontuação: " + pontuacao;

            notas.splice(i, 1);
            i--;
        }
    }

    if (mostrarFogoBotaoVerde) {
        ctx.drawImage(image, 22, 680, 60, 60);
    }

    if (mostrarFogoBotaoVermelho) {
        ctx.drawImage(image, 80, 680, 60, 60);
    }

    if (mostrarFogoBotaoAmarelo) {
        ctx.drawImage(image, 140, 680, 60, 60);
    }

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
}

function tocarNotasPedro() {
    for (let i = 0; i < 2000; i += 1000) {
        setTimeout(() => criarNota(xLinha, "green"), i);
    }

    for (let i = 1500; i < 3500; i += 1000) {
        setTimeout(() => criarNota(xLinha + divisao * 2, "yellow"), i);
    }

    for (let i = 3000; i < 5000; i += 1000) {
        setTimeout(() => criarNota(xLinha + divisao, "red"), i);
    }
}

avisar();

document.addEventListener("keydown", function(event) {

  if ((event.code === "Numpad1" || event.code === "Digit1") && !jaTocou) {
    salomao.play().catch(error => console.log("Erro autoplay:", error));

    jaTocou = true;
    desenharNotas();

    for(let i = 0; i < 1000000; i += 8000) {
      setTimeout(() => criarNota(xLinha, "green"), i);
    }

    for(let i = 2000; i < 1000000; i += 8000) {
      setTimeout(() => criarNota(xLinha + divisao, "red"), i);
    }

    for(let i = 4000; i < 1000000; i += 8000) {
      setTimeout(() => criarNota(xLinha + divisao * 2, "yellow"), i);
    }
  }

  if ((event.code === "Numpad2" || event.code === "Digit2") && !jaTocou) {
    hino.play().catch(error => console.log("Erro autoplay:", error));

    jaTocou = true;
    desenharNotas();

    tocarNotasHinoSV();
    setInterval(tocarNotasHinoSV, 8000);
  }

  if ((event.code === "Numpad3" || event.code === "Digit3") && !jaTocou) {
    pedro.play().catch(error => console.log("Erro autoplay:", error));

    jaTocou = true;
    desenharNotas();

    tocarNotasPedro();
    setInterval(tocarNotasPedro, 6500);
  }

  if ((event.code === "Numpad4" || event.code === "Digit4") && !jaTocou) {
    shake_it_off.play().catch(error => console.log("Erro autoplay:", error));

    jaTocou = true;
    desenharNotas();

    for (let i = 0; i < 1000000; i += 5000) {
      setTimeout(() => criarNota(xLinha, "green"), i + 0);
      setTimeout(() => criarNota(xLinha + divisao, "red"), i + 400);
      setTimeout(() => criarNota(xLinha + divisao * 2, "yellow"), i + 800);

      setTimeout(() => {
        criarNota(xLinha + divisao, "red");
        criarNota(xLinha + divisao * 2, "yellow");
      }, i + 1200);

      setTimeout(() => criarNota(xLinha, "green"), i + 1800);
    }
  }

  if ((event.code === "Numpad5" || event.code === "Digit5") && !jaTocou) {
    slow_ride.play().catch(error => console.log("Erro autoplay:", error));

    jaTocou = true;
    desenharNotas();

    for (let i = 0; i < 1000000; i += 4000) {

      setTimeout(() => {
        criarNota(xLinha, "green");
        criarNota(xLinha + divisao, "red");
      }, i + 0);

      setTimeout(() => criarNota(xLinha + divisao, "red"), i + 600);
      setTimeout(() => criarNota(xLinha + divisao * 2, "yellow"), i + 1200);

      setTimeout(() => {
        criarNota(xLinha + divisao, "red");
        criarNota(xLinha + divisao * 2, "yellow");
      }, i + 1800);

      setTimeout(() => criarNota(xLinha + divisao * 2, "yellow"), i + 2400);
      setTimeout(() => criarNota(xLinha + divisao, "red"), i + 2800);
      setTimeout(() => criarNota(xLinha, "green"), i + 3200);
    }
  }

  if (event.code === "KeyA") {

    if (notas.length > 0) {

      if (notas[0].y < 700) {
        document.getElementById("pontuacao").innerText =
          "Pontuação: " + (pontuacao -= 20);

      } else if (
        notas[0].cor == "green" &&
        notas[0].y >= 700 &&
        notas[0].y <= 750
      ) {

        mostrarFogoBotaoVerde = true;

        setTimeout(() => {
          mostrarFogoBotaoVerde = false;
        }, 150);

        document.getElementById("pontuacao").innerText =
          "Pontuação: " + (pontuacao += 20);

        notas.splice(0, 1);
      }
    }
  }

  if (event.code === "KeyS") {

    if (notas.length > 0) {

      if (notas[0].y < 700) {
        document.getElementById("pontuacao").innerText =
          "Pontuação: " + (pontuacao -= 20);

      } else if (
        notas[0].cor == "red" &&
        notas[0].y >= 700 &&
        notas[0].y <= 750
      ) {

        mostrarFogoBotaoVermelho = true;

        setTimeout(() => {
          mostrarFogoBotaoVermelho = false;
        }, 150);

        document.getElementById("pontuacao").innerText =
          "Pontuação: " + (pontuacao += 20);

        notas.splice(0, 1);
      }
    }
  }

  if (event.code === "KeyJ") {

    if (notas.length > 0) {

      if (notas[0].y < 700) {
        document.getElementById("pontuacao").innerText =
          "Pontuação: " + (pontuacao -= 20);

      } else if (
        notas[0].cor == "yellow" &&
        notas[0].y >= 700 &&
        notas[0].y <= 750
      ) {

        mostrarFogoBotaoAmarelo = true;

        setTimeout(() => {
          mostrarFogoBotaoAmarelo = false;
        }, 150);

        document.getElementById("pontuacao").innerText =
          "Pontuação: " + (pontuacao += 20);

        notas.splice(0, 1);
      }
    }
  }

});