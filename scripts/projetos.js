// =========================================================
// PLAYER DE MÚSICA DOS PROJETOS
// =========================================================

const musicaButton =
    document.querySelector("#musica-button");

const musicaPlayer =
    document.querySelector("#musica-player");

const musicaPlay =
    document.querySelector("#musica-play");

const musicaAnterior =
    document.querySelector("#musica-anterior");

const musicaProxima =
    document.querySelector("#musica-proxima");

const musicaTitulo =
    document.querySelector("#musica-titulo");

const audioMusica =
    document.querySelector("#audio-musica");


// =========================================================
// MÚSICAS
// =========================================================

const musicas = [

    {
        nome: "01. Intro — The xx",
        arquivo: "../assets/music/01. Intro.mp3"
    },

    {
        nome: "02. After Dark — Mr.Kitty",
        arquivo: "../assets/music/02. Mr.Kitty - After Dark (Instrumental).mp3"
    },

    {
        nome: "03. Silver Soul — Beach House",
        arquivo: "../assets/music/03. Silver Soul - Beach House.mp3"
    },

    {
        nome: "04. Oblivion — Grimes",
        arquivo: "../assets/music/04. Grimes - Oblivion.mp3"
    },

    {
        nome: "05. Genesis — Grimes",
        arquivo: "../assets/music/05. Grimes _ Genesis.mp3"
    },

    {
        nome: "06. Space Song — Beach House",
        arquivo: "../assets/music/06. Beach House - Space Song.mp3"
    },

    {
        nome: "07. A Walk — Tycho",
        arquivo: "../assets/music/07. A Walk.mp3"
    },

    {
        nome: "08. Alone Again — The Weeknd",
        arquivo: "../assets/music/08. The Weeknd - Alone Again.mp3"
    },

    {
        nome: "09. Nightcall — Kavinsky",
        arquivo: "../assets/music/09. Kavinsky - Nightcall.mp3"
    },

    {
        nome: "10. We're Finally Landing — HOME",
        arquivo: "../assets/music/10. Home - We're Finally Landing.mp3"
    }

];


let musicaAtual = 0;


// =========================================================
// ELEMENTOS SALVOS
// =========================================================

const musicaSalva =
    sessionStorage.getItem("musicaAtual");

const tempoSalvo =
    sessionStorage.getItem("tempoMusica");

const musicaEstavaTocando =
    sessionStorage.getItem("musicaTocando");


if (musicaSalva !== null) {

    musicaAtual =
        Number(musicaSalva);

}


// =========================================================
// CARREGAR MÚSICA
// =========================================================

function carregarMusica() {

    const musica =
        musicas[musicaAtual];

    musicaTitulo.textContent =
        musica.nome;

    audioMusica.src =
        musica.arquivo;

}


carregarMusica();


// =========================================================
// RECUPERAR POSIÇÃO
// =========================================================

audioMusica.addEventListener(
    "loadedmetadata",
    () => {

        if (tempoSalvo !== null) {

            audioMusica.currentTime =
                Number(tempoSalvo);

        }

        if (
            musicaEstavaTocando ===
            "true"
        ) {

            audioMusica
                .play()
                .catch(() => {});

        }

    }
);


// =========================================================
// ABRIR / FECHAR PLAYER
// =========================================================

musicaButton.addEventListener(
    "click",
    () => {

        musicaPlayer.classList.toggle(
            "ativo"
        );

    }
);


//
// FECHAR O PLAYER AO CLICAR FORA OU ROLAR A PÁGINA
//

document.addEventListener("click", (evento) => {

    if (
        musicaPlayer.classList.contains("ativo") &&
        !musicaButton.contains(evento.target) &&
        !musicaPlayer.contains(evento.target)
    ) {

        musicaPlayer.classList.remove("ativo");

    }

});


window.addEventListener("scroll", () => {

    if (musicaPlayer.classList.contains("ativo")) {

        musicaPlayer.classList.remove("ativo");

    }

});


// =========================================================
// TOCAR / PAUSAR
// =========================================================

musicaPlay.addEventListener(
    "click",
    async () => {

        if (audioMusica.paused) {

            try {

                await audioMusica.play();

            } catch (erro) {

                console.error(erro);

            }

        } else {

            audioMusica.pause();

        }

    }
);


// =========================================================
// VISUAL — TOCANDO
// =========================================================

audioMusica.addEventListener(
    "play",
    () => {

        musicaPlay.textContent =
            "❚❚";

        musicaButton.classList.add(
            "tocando"
        );

        sessionStorage.setItem(
            "musicaTocando",
            "true"
        );

    }
);


// =========================================================
// VISUAL — PAUSADA
// =========================================================

audioMusica.addEventListener(
    "pause",
    () => {

        musicaPlay.textContent =
            "▶";

        musicaButton.classList.remove(
            "tocando"
        );

        sessionStorage.setItem(
            "musicaTocando",
            "false"
        );

    }
);


// =========================================================
// SALVAR TEMPO
// =========================================================

audioMusica.addEventListener(
    "timeupdate",
    () => {

        sessionStorage.setItem(
            "tempoMusica",
            audioMusica.currentTime
        );

    }
);


// =========================================================
// PRÓXIMA MÚSICA
// =========================================================

musicaProxima.addEventListener(
    "click",
    async () => {

        musicaAtual++;

        if (
            musicaAtual >=
            musicas.length
        ) {

            musicaAtual = 0;

        }

        carregarMusica();
        audioMusica.currentTime = 0;

        sessionStorage.setItem(
            "musicaAtual",
            musicaAtual
        );

        sessionStorage.setItem(
            "tempoMusica",
            0
        );

        try {

            await audioMusica.play();

        } catch (erro) {

            console.error(erro);

        }

    }
);


// =========================================================
// MÚSICA ANTERIOR
// =========================================================

musicaAnterior.addEventListener(
    "click",
    async () => {

        musicaAtual--;

        if (musicaAtual < 0) {

            musicaAtual =
                musicas.length - 1;

        }

        carregarMusica();

        sessionStorage.setItem(
            "musicaAtual",
            musicaAtual
        );

        sessionStorage.setItem(
            "tempoMusica",
            0
        );

        try {

            await audioMusica.play();

        } catch (erro) {

            console.error(erro);

        }

    }
);


// =========================================================
// QUANDO A MÚSICA TERMINAR
// =========================================================

audioMusica.addEventListener(
    "ended",
    async () => {

        musicaAtual++;

        if (
            musicaAtual >=
            musicas.length
        ) {

            musicaAtual = 0;

        }

        carregarMusica();

        sessionStorage.setItem(
            "musicaAtual",
            musicaAtual
        );

        sessionStorage.setItem(
            "tempoMusica",
            0
        );

        try {

            await audioMusica.play();

        } catch (erro) {

            console.error(erro);

        }

    }
);