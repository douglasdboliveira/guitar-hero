const salomao = new Audio("baseado.mp3");
const hino = new Audio("hino-sv.mp3");
const pedro = new Audio("pedro.mp3");
const shake_it_off = new Audio("shake_it_off.mp3");
const slow_ride = new Audio("slow_ride.mp3");

export const musicas = [salomao, hino, pedro, shake_it_off, slow_ride];

export function configurarVolume(volumeControl, volumeValue) {
    musicas.forEach(musica => musica.volume = 0.5);

    volumeControl.addEventListener("input", function () {
        const volume = this.value / 100;
        musicas.forEach(musica => musica.volume = volume);
        volumeValue.innerText = this.value + "%";
    });
}
