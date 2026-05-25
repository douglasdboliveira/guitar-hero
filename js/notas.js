export let notas = [];

export function criarNota(x, cor) {
    notas.push({ x, y: -20, cor, velocidade: 2 });
}
