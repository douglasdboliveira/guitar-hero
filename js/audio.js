const salomao = new Audio("./assets/baseado.mp3");
const hino = new Audio("./assets/hino-sv.mp3");
const pedro = new Audio("./assets/pedro.mp3");
const shake_it_off = new Audio("./assets/shake_it_off.mp3");
const slow_ride = new Audio("./assets/slow_ride.mp3");
const justin = new Audio("./assets/justin.mp3");

export const musicas = [salomao, hino, pedro, shake_it_off, slow_ride, justin];

export function configurarVolume(volumeControl, volumeValue) {
    musicas.forEach(musica => musica.volume = 0.5);

    volumeControl.addEventListener("input", function () {
        const volume = this.value / 100;
        musicas.forEach(musica => musica.volume = volume);
        volumeValue.innerText = this.value + "%";
    });
}
