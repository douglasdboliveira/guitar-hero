import { criarNota, notas } from "./notas.js";
import { musicas } from "./audio.js";
import { desenharNotas, alterarPontuacao } from "./jogo.js";

// Verifica se a nota foi acertada ou se o clique foi errado
function verificarNota(cor, fogoFlags, flag) {
    if (notas.length > 0) {
        // Apertou antes da hora
        if (notas[0].y < 700) {
            alterarPontuacao(-20);
        } 
        // Acertou a nota
        else if (notas[0].cor === cor && notas[0].y >= 700 && notas[0].y <= 750) {
            fogoFlags[flag] = true;
            setTimeout(() => fogoFlags[flag] = false, 150);
            alterarPontuacao(20);
            notas.splice(0, 1);
        } 
        // Apertou tecla errada
        else {
            alterarPontuacao(-20);
        }
    } else {
        // Apertou sem nota
        alterarPontuacao(-20);
    }
}

export function configurarTeclado(ctx, c, image, fogoFlags, xLinha, divisao) {
    let jaTocou = false;

    document.addEventListener("keydown", function(event) {
        // Salomão
        if ((event.code === "Digit1" || event.code === "Numpad1") && !jaTocou) {
            musicas[0].play();
            jaTocou = true;
            desenharNotas(ctx, c, image, fogoFlags, xLinha, divisao);

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

        // Hino SV
        if ((event.code === "Digit2" || event.code === "Numpad2") && !jaTocou) {
            musicas[1].play();
            jaTocou = true;
            desenharNotas(ctx, c, image, fogoFlags, xLinha, divisao);

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

            tocarNotasHinoSV();
            setInterval(tocarNotasHinoSV, 8000);
        }

        // Pedro
        if ((event.code === "Digit3" || event.code === "Numpad3") && !jaTocou) {
            musicas[2].play();
            jaTocou = true;
            desenharNotas(ctx, c, image, fogoFlags, xLinha, divisao);

            function tocarNotasPedro() {             
                // Compasso 1: batida inicial no baixo
                setTimeout(() => criarNota(xLinha, "green"), 0);
                setTimeout(() => criarNota(xLinha + divisao * 2, "yellow"), 500);
                setTimeout(() => criarNota(xLinha + divisao, "red"), 1000);

                // Compasso 2: repetição com variação
                setTimeout(() => criarNota(xLinha, "green"), 1500);
                setTimeout(() => criarNota(xLinha + divisao * 2, "yellow"), 2000);
                setTimeout(() => criarNota(xLinha, "green"), 2500);

                // Compasso 3: acento duplo
                setTimeout(() => criarNota(xLinha + divisao, "red"), 3000);
                setTimeout(() => criarNota(xLinha + divisao, "red"), 3500);

                // Compasso 4: fechamento do ciclo
                setTimeout(() => criarNota(xLinha, "green"), 4000);
                setTimeout(() => criarNota(xLinha + divisao * 2, "yellow"), 4500);
                setTimeout(() => criarNota(xLinha, "green"), 5000);
            }

            // Executa a sequência e repete em loop
            tocarNotasPedro();
            setInterval(tocarNotasPedro, 6000);
        }


        // Shake It Off
        if ((event.code === "Digit4" || event.code === "Numpad4") && !jaTocou) {
            musicas[3].play();
            jaTocou = true;
            desenharNotas(ctx, c, image, fogoFlags, xLinha, divisao);

            function tocarNotasShakeItOff() {

                setTimeout(() => criarNota(xLinha, "green"), 0);
                setTimeout(() => criarNota(xLinha + divisao, "red"), 400);
                setTimeout(() => criarNota(xLinha + divisao * 2, "yellow"), 800);

                setTimeout(() => {
                    criarNota(xLinha + divisao, "red");
                    criarNota(xLinha + divisao * 2, "yellow");
                }, 1200);

                setTimeout(() => criarNota(xLinha, "green"), 1800);
                setTimeout(() => criarNota(xLinha, "green"), 2200);

                setTimeout(() => criarNota(xLinha + divisao, "red"), 2600);
                setTimeout(() => criarNota(xLinha + divisao * 2, "yellow"), 3000);
                setTimeout(() => criarNota(xLinha, "green"), 3400);
            }

            tocarNotasShakeItOff();
            setInterval(tocarNotasShakeItOff, 3600);
        }

        // Slow Ride
        if ((event.code === "Digit5" || event.code === "Numpad5") && !jaTocou) {
            musicas[4].play();
            jaTocou = true;
            desenharNotas(ctx, c, image, fogoFlags, xLinha, divisao);

            function tocarNotasSlowRide() {
                setTimeout(() => criarNota(xLinha, "green"), 0);
                setTimeout(() => criarNota(xLinha + divisao, "red"), 600);

                setTimeout(() => criarNota(xLinha + divisao * 2, "yellow"), 1200);
                setTimeout(() => criarNota(xLinha, "green"), 1800);

                setTimeout(() => criarNota(xLinha + divisao, "red"), 2400);
                setTimeout(() => criarNota(xLinha + divisao, "red"), 2800);

                setTimeout(() => criarNota(xLinha, "green"), 3200);
                setTimeout(() => criarNota(xLinha + divisao * 2, "yellow"), 3600);
                setTimeout(() => criarNota(xLinha, "green"), 4000);
            }

            // Executa a sequência e repete em loop
            tocarNotasSlowRide();
            setInterval(tocarNotasSlowRide, 4200);
        }

        // Justin Bieber
        if ((event.code === "Digit6" || event.code === "Numpad6") && !jaTocou) {
            musicas[5].play();
            jaTocou = true;
            desenharNotas(ctx, c, image, fogoFlags, xLinha, divisao);

            function tocarNotasJustin() {
                // Compasso 1 - sequência acelerada
                setTimeout(() => criarNota(xLinha, "green"), 0);
                setTimeout(() => criarNota(xLinha + divisao, "red"), 400);
                setTimeout(() => criarNota(xLinha + divisao * 2, "yellow"), 800);
                setTimeout(() => criarNota(xLinha + divisao * 3, "blue"), 1200);

                // Compasso 2 - síncope moderada
                setTimeout(() => criarNota(xLinha, "green"), 1700);
                setTimeout(() => criarNota(xLinha + divisao, "red"), 2200);
                setTimeout(() => criarNota(xLinha + divisao * 2, "yellow"), 2600);
                setTimeout(() => criarNota(xLinha + divisao * 3, "blue"), 3000);

                // Compasso 3 - descida rápida
                setTimeout(() => criarNota(xLinha + divisao * 3, "blue"), 3500);
                setTimeout(() => criarNota(xLinha + divisao * 2, "yellow"), 3900);
                setTimeout(() => criarNota(xLinha + divisao, "red"), 4300);
                setTimeout(() => criarNota(xLinha, "green"), 4700);

                // Compasso 4 - fechamento com acento duplo
                setTimeout(() => criarNota(xLinha, "green"), 5200);
                setTimeout(() => criarNota(xLinha + divisao, "red"), 5600);
                setTimeout(() => criarNota(xLinha + divisao * 2, "yellow"), 6000);
                setTimeout(() => criarNota(xLinha + divisao * 3, "blue"), 6400);
                setTimeout(() => criarNota(xLinha, "green"), 6800);
            }

            // Executa a sequência e repete em loop
            tocarNotasJustin();
            setInterval(tocarNotasJustin, 7200);
        }

        // Acertos de notas
        if (event.code === "KeyA") {
            verificarNota("green", fogoFlags, "green");
        }
        if (event.code === "KeyS") {
            verificarNota("red", fogoFlags, "red");
        }
        if (event.code === "KeyJ") {
            verificarNota("yellow", fogoFlags, "yellow");
        }
        if (event.code === "KeyK") {
            verificarNota("blue", fogoFlags, "blue");
        }
    });
}
