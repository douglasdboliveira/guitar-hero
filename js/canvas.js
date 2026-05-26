export function desenharLinha(ctx, x1, y1, x2, y2) {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
}

export function desenharNota(ctx, x, y, cor) {
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

export function desenharBotao(ctx, x, y, cor) {
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

export function desenharQuadro(ctx, xLinha, divisao) {
    for (let i = 0; i < 5; i++) {
        desenharLinha(ctx, xLinha + divisao * i, 0, xLinha + divisao * i, 750);
    }

    desenharBotao(ctx, xLinha, 720, "green");
    desenharBotao(ctx, xLinha + divisao, 720, "red");
    desenharBotao(ctx, xLinha + divisao * 2, 720, "yellow");
    desenharBotao(ctx, xLinha + divisao * 3, 720, "blue");
    desenharBotao(ctx, xLinha + divisao * 4, 720, "orange");
}

export function avisar(ctx) {
    ctx.font = "bold 16px Arial";
    ctx.fillStyle = "#00ff41";
    ctx.textAlign = "center";
    ctx.shadowColor = "rgba(0,255,65,0.5)";
    ctx.shadowBlur = 10;

    ctx.fillText("SELECIONE A MÚSICA", 170, 200);

    ctx.fillStyle = "#00d9ff";
    ctx.fillText("FÁCIL", 170, 250);  
    ctx.fillText("1: Salomão - Baseado Em Quê?", 170, 280);
    ctx.fillText("2: Hino de São Vicente", 170, 310);

    ctx.fillStyle = "#ffe600";
    ctx.fillText("MÉDIO", 170, 370);
    ctx.fillText("3: Raul Seixas - Meu Amigo Pedro", 170, 400);

    ctx.fillStyle = "#ff3131";
    ctx.fillText("DIFÍCIL", 170, 460);
    ctx.fillText("4: Shake It Off - Taylor Swift", 170, 490);
    ctx.fillText("5: Slow Ride - Foghat", 170, 520);

    ctx.fillStyle = "#00ff41";
    ctx.fillText("BADASS", 170, 580);
    ctx.fillText("6: All That I Can Take - Justin Bieber", 170, 610);
    ctx.shadowBlur = 5;
}
