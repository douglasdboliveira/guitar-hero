import { configurarVolume } from "./audio.js";
import { avisar } from "./canvas.js";
import { configurarTeclado } from "./controles.js";

const c = document.getElementById("myCanvas");
const ctx = c.getContext("2d");
const image = document.getElementById("fogo");

const volumeControl = document.getElementById("volumeControl");
const volumeValue = document.getElementById("volumeValue");

const fogoFlags = { verde: false, vermelho: false, amarelo: false };
const xLinha = 50;
const divisao = 60;

configurarVolume(volumeControl, volumeValue);
avisar(ctx);
configurarTeclado(ctx, c, image, fogoFlags, xLinha, divisao);

console.log("Main carregado com sucesso");
