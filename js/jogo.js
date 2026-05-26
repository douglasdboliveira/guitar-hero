import { notas } from "./notas.js";
import { desenharQuadro, desenharNota } from "./canvas.js";

let pontuacao = 0;

export function alterarPontuacao(valor) {
    pontuacao += valor;
    document.getElementById("pontuacao").innerText = "Pontuação: " + pontuacao;
}

export function getPontuacao() {
    return pontuacao;
}

export function desenharNotas(ctx, c, image, fogoFlags, xLinha, divisao) {
    ctx.clearRect(0, 0, c.width, c.height);
    desenharQuadro(ctx, xLinha, divisao);

    for (let i = 0; i < notas.length; i++) {
        let nota = notas[i];
        nota.y += nota.velocidade;
        desenharNota(ctx, nota.x, nota.y, nota.cor);

        if (nota.y > c.height + 20) {
            alterarPontuacao(-10);
            notas.splice(i, 1);
            i--;
        }
    }

    if (fogoFlags.green) ctx.drawImage(image, 22, 680, 60, 60);
    if (fogoFlags.red) ctx.drawImage(image, 80, 680, 60, 60);
    if (fogoFlags.yellow) ctx.drawImage(image, 140, 680, 60, 60);
    if (fogoFlags.blue) ctx.drawImage(image, 200, 680, 60, 60);

    requestAnimationFrame(() => desenharNotas(ctx, c, image, fogoFlags, xLinha, divisao));
}
