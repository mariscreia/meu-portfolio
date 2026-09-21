/* =========================================================
   PLAYER DE MÚSICA
   ========================================================= */

const playlist = [

    {
        nome: "01. Intro — The xx",
        arquivo: "./assets/music/01. Intro.mp3"
    },

    {
        nome: "02. After Dark — Mr.Kitty",
        arquivo: "./assets/music/02. Mr.Kitty - After Dark (Instrumental).mp3"
    },

    {
        nome: "03. Silver Soul — Beach House",
        arquivo: "./assets/music/03. Silver Soul - Beach House.mp3"
    },

    {
        nome: "04. Oblivion — Grimes",
        arquivo: "./assets/music/04. Grimes - Oblivion.mp3"
    },

    {
        nome: "05. Genesis — Grimes",
        arquivo: "./assets/music/05. Grimes _ Genesis.mp3"
    },

    {
        nome: "06. Space Song — Beach House",
        arquivo: "./assets/music/06. Beach House - Space Song.mp3"
    },

    {
        nome: "07. A Walk — Tycho",
        arquivo: "./assets/music/07. A Walk.mp3"
    },

    {
        nome: "08. Alone Again — The Weeknd",
        arquivo: "./assets/music/08. The Weeknd - Alone Again.mp3"
    },

    {
        nome: "09. Nightcall — Kavinsky",
        arquivo: "./assets/music/09. Kavinsky - Nightcall.mp3"
    },

    {
        nome: "10. We're Finally Landing — HOME",
        arquivo: "./assets/music/10. Home - We're Finally Landing.mp3"
    }

];


let musicaAtual = 0;


const musicaButton =
    document.getElementById("musica-button");

const musicaPlayer =
    document.getElementById("musica-player");

const musicaIcone =
    document.getElementById("musica-icone");

const musicaTitulo =
    document.getElementById("musica-titulo");

const musicaPlay =
    document.getElementById("musica-play");

const musicaAnterior =
    document.getElementById("musica-anterior");

const musicaProxima =
    document.getElementById("musica-proxima");

const audioMusica =
    document.getElementById("audio-musica");


/* =========================================================
   SALVAR ESTADO DA MÚSICA
   ========================================================= */

function salvarEstadoMusica() {

    sessionStorage.setItem(
        "musicaAtual",
        musicaAtual
    );

    sessionStorage.setItem(
        "tempoMusica",
        audioMusica.currentTime
    );

    sessionStorage.setItem(
        "musicaTocando",
        !audioMusica.paused
    );

}


/* =========================================================
   CARREGAR MÚSICA
   ========================================================= */

function carregarMusica() {

    const musica =
        playlist[musicaAtual];

    audioMusica.src =
        musica.arquivo;

    musicaTitulo.textContent =
        musica.nome;

}


/* =========================================================
   RECUPERAR ESTADO ANTERIOR
   ========================================================= */

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


carregarMusica();


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


/* =========================================================
   ABRIR PLAYER
   ========================================================= */

musicaButton.addEventListener(
    "click",
    () => {

        musicaPlayer.classList.toggle(
            "aberto"
        );

    }
);


/* =========================================================
   FECHAR O PLAYER AO CLICAR FORA OU ROLAR A PÁGINA
   ========================================================= */

document.addEventListener(
    "click",
    (evento) => {

        if (
            musicaPlayer.classList.contains("aberto") &&
            !musicaButton.contains(evento.target) &&
            !musicaPlayer.contains(evento.target)
        ) {

            musicaPlayer.classList.remove(
                "aberto"
            );

        }

    }
);


window.addEventListener(
    "scroll",
    () => {

        if (
            musicaPlayer.classList.contains("aberto")
        ) {

            musicaPlayer.classList.remove(
                "aberto"
            );

        }

    }
);


/* =========================================================
   TOCAR / PAUSAR
   ========================================================= */

musicaPlay.addEventListener(
    "click",
    async () => {

        if (audioMusica.paused) {

            try {

                await audioMusica.play();

            } catch (erro) {

                console.error(
                    "Não foi possível reproduzir a música:",
                    erro
                );

            }

        } else {

            audioMusica.pause();

        }

        salvarEstadoMusica();

    }
);


/* =========================================================
   ATUALIZAR VISUAL QUANDO COMEÇAR
   ========================================================= */

audioMusica.addEventListener(
    "play",
    () => {

        musicaPlay.textContent =
            "❚❚";

        musicaButton.classList.add(
            "tocando"
        );

        salvarEstadoMusica();

    }
);


/* =========================================================
   ATUALIZAR VISUAL QUANDO PAUSAR
   ========================================================= */

audioMusica.addEventListener(
    "pause",
    () => {

        musicaPlay.textContent =
            "▶";

        musicaButton.classList.remove(
            "tocando"
        );

        salvarEstadoMusica();

    }
);


/* =========================================================
   SALVAR TEMPO ENQUANTO A MÚSICA TOCA
   ========================================================= */

audioMusica.addEventListener(
    "timeupdate",
    () => {

        sessionStorage.setItem(
            "tempoMusica",
            audioMusica.currentTime
        );

    }
);


/* =========================================================
   MÚSICA ANTERIOR
   ========================================================= */

musicaAnterior.addEventListener(
    "click",
    async () => {

        musicaAtual--;

        if (musicaAtual < 0) {

            musicaAtual =
                playlist.length - 1;

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


/* =========================================================
   PRÓXIMA MÚSICA
   ========================================================= */

musicaProxima.addEventListener(
    "click",
    async () => {

        musicaAtual++;

        if (
            musicaAtual >=
            playlist.length
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


/* =========================================================
   QUANDO TERMINAR
   ========================================================= */

audioMusica.addEventListener(
    "ended",
    async () => {

        musicaAtual++;

        if (
            musicaAtual >=
            playlist.length
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


/* =========================================================
   SOFT SKILLS — PAINEL
   ========================================================= */

const softskillsToggle =
    document.getElementById(
        "softskills-toggle"
    );

const softskillsFechar =
    document.getElementById(
        "softskills-fechar"
    );

const softskillsContainer =
    document.querySelector(
        ".habilidades_softskills"
    );


/* ABRIR */

if (
    softskillsToggle &&
    softskillsContainer
) {

    softskillsToggle.addEventListener(
        "click",
        () => {

            softskillsContainer
                .classList
                .add("aberto");

        }
    );

}


/* FECHAR */

if (
    softskillsFechar &&
    softskillsContainer
) {

    softskillsFechar.addEventListener(
        "click",
        () => {

            softskillsContainer
                .classList
                .remove("aberto");

        }
    );

}


/* =========================================================
   SOFT SKILLS INDIVIDUAIS
   ========================================================= */

const softskills =
    document.querySelectorAll(
        ".softskill"
    );


softskills.forEach(
    (softskill) => {

        const botao =
            softskill.querySelector(
                ".softskill_botao"
            );

        const descricao =
            softskill.querySelector(
                ".softskill_descricao"
            );


        botao.addEventListener(
            "click",
            () => {

                const estaAberto =
                    descricao.classList.contains(
                        "ativo"
                    );


                softskills.forEach(
                    (outraSoftskill) => {

                        outraSoftskill
                            .querySelector(
                                ".softskill_descricao"
                            )
                            .classList
                            .remove("ativo");

                    }
                );


                if (!estaAberto) {

                    descricao
                        .classList
                        .add("ativo");

                }

            }
        );

    }
);


/* =========================================================
   CURIOSIDADES — CARROSSEL INFINITO
   ========================================================= */

const curiosidadesCarrossel =
    document.querySelector(
        ".curiosidades_carrossel"
    );

const curiosidadesContainer =
    document.querySelector(
        ".curiosidades_container"
    );


if (
    curiosidadesCarrossel &&
    curiosidadesContainer
) {

    /* =====================================================
       EXPANDIR / FECHAR CARDS
       ===================================================== */

    curiosidadesCarrossel.addEventListener(
        "click",
        (evento) => {

            const botaoSaibaMais =
                evento.target.closest(
                    ".curiosidade_botao"
                );

            const botaoFechar =
                evento.target.closest(
                    ".curiosidade_fechar"
                );


            /* ABRIR */

            if (botaoSaibaMais) {

                const card =
                    botaoSaibaMais.closest(
                        ".curiosidade_card"
                    );

                const expandido =
                    card.querySelector(
                        ".curiosidades_container_card_expandido"
                    );


                if (expandido) {

                    expandido.classList.add(
                        "ativo"
                    );

                }

                return;

            }


            /* FECHAR */

            if (botaoFechar) {

                const expandido =
                    botaoFechar.closest(
                        ".curiosidades_container_card_expandido"
                    );


                if (expandido) {

                    expandido.classList.remove(
                        "ativo"
                    );

                }

                return;

            }

        }
    );


    /* =====================================================
       DUPLICAR OS CARDS
       ===================================================== */

    const cardsOriginais = [
        ...curiosidadesContainer.querySelectorAll(
            ".curiosidade_card"
        )
    ];


    cardsOriginais.forEach(
        (card) => {

            const clone =
                card.cloneNode(true);

            clone.setAttribute(
                "aria-hidden",
                "true"
            );

            curiosidadesContainer.appendChild(
                clone
            );

        }
    );


    /* =====================================================
       CONFIGURAÇÃO DO MOVIMENTO
       ===================================================== */

    let posicao = 0;

    let velocidade = 0.35;

    let pausado = false;

    let arrastando = false;

    let inicioX = 0;

    let posicaoNoInicioDoArraste = 0;

    let larguraDoLoop = 0;


    function calcularLarguraDoLoop() {

        larguraDoLoop =
            curiosidadesContainer.scrollWidth / 2;

    }


    calcularLarguraDoLoop();


    window.addEventListener(
        "resize",
        calcularLarguraDoLoop
    );


    /* =====================================================
       POSIÇÃO
       ===================================================== */

    function aplicarPosicao() {

        curiosidadesContainer.style.transform =
            `translate3d(${posicao}px, 0, 0)`;

    }


    /* =====================================================
       LOOP INFINITO
       ===================================================== */

    function ajustarLoop() {

        if (larguraDoLoop <= 0) {

            return;

        }


        if (
            posicao <=
            -larguraDoLoop
        ) {

            posicao +=
                larguraDoLoop;

        }


        if (posicao >= 0) {

            posicao -=
                larguraDoLoop;

        }

    }


    /* =====================================================
       ANIMAÇÃO AUTOMÁTICA
       ===================================================== */

    function animar() {

        if (
            !pausado &&
            !arrastando
        ) {

            posicao -=
                velocidade;

            ajustarLoop();

            aplicarPosicao();

        }

        requestAnimationFrame(
            animar
        );

    }


    animar();


    /* =====================================================
       PAUSAR COM O MOUSE
       ===================================================== */

    curiosidadesCarrossel.addEventListener(
        "pointerenter",
        () => {

            pausado = true;

        }
    );


    curiosidadesCarrossel.addEventListener(
        "pointerleave",
        () => {

            if (!arrastando) {

                pausado = false;

            }

        }
    );


    /* =====================================================
       COMEÇAR A ARRASTAR
       ===================================================== */

    curiosidadesCarrossel.addEventListener(
        "pointerdown",
        (evento) => {

            if (
                evento.target.closest(
                    ".curiosidade_botao"
                ) ||
                evento.target.closest(
                    ".curiosidade_fechar"
                )
            ) {

                return;

            }


            arrastando = true;

            pausado = true;

            inicioX =
                evento.clientX;

            posicaoNoInicioDoArraste =
                posicao;


            curiosidadesCarrossel.setPointerCapture(
                evento.pointerId
            );

        }
    );


    /* =====================================================
       ARRASTAR
       ===================================================== */

    curiosidadesCarrossel.addEventListener(
        "pointermove",
        (evento) => {

            if (!arrastando) {

                return;

            }


            const distancia =
                evento.clientX -
                inicioX;


            posicao =
                posicaoNoInicioDoArraste +
                distancia;


            ajustarLoop();

            aplicarPosicao();

        }
    );


    /* =====================================================
       TERMINAR ARRASTE
       ===================================================== */

    function finalizarArraste(evento) {

        if (!arrastando) {

            return;

        }


        arrastando = false;


        const rect =
            curiosidadesCarrossel.getBoundingClientRect();


        const mouseAindaDentro =
            evento.clientX >= rect.left &&
            evento.clientX <= rect.right;


        pausado =
            mouseAindaDentro;


        if (
            curiosidadesCarrossel.hasPointerCapture(
                evento.pointerId
            )
        ) {

            curiosidadesCarrossel.releasePointerCapture(
                evento.pointerId
            );

        }

    }


    curiosidadesCarrossel.addEventListener(
        "pointerup",
        finalizarArraste
    );


    curiosidadesCarrossel.addEventListener(
        "pointercancel",
        finalizarArraste
    );

}


/* =========================================================
   FILTRO DOS PROJETOS
   ========================================================= */

const filtros =
    document.querySelectorAll(
        ".projeto_filtro button"
    );

const projetos =
    document.querySelectorAll(
        ".projeto_card"
    );

const projetosVazio =
    document.getElementById(
        "projetos-vazio"
    );


filtros.forEach(
    (filtro) => {

        filtro.addEventListener(
            "click",
            () => {

                const categoriaSelecionada =
                    filtro.dataset.filtro;


                let quantidadeVisivel = 0;


                filtros.forEach(
                    (outroFiltro) => {

                        outroFiltro
                            .classList
                            .remove("ativo");

                    }
                );


                filtro
                    .classList
                    .add("ativo");


                projetos.forEach(
                    (projeto) => {

                        const categoria =
                            projeto.dataset.categoria;


                        if (
                            categoriaSelecionada === "todos" ||
                            categoria === categoriaSelecionada
                        ) {

                            projeto.style.display =
                                "flex";

                            quantidadeVisivel++;

                        } else {

                            projeto.style.display =
                                "none";

                        }

                    }
                );


                if (
                    quantidadeVisivel === 0
                ) {

                    projetosVazio
                        .classList
                        .add("ativo");

                } else {

                    projetosVazio
                        .classList
                        .remove("ativo");

                }

            }
        );

    }
);


/* TODOS ATIVO NO COMEÇO */

if (filtros.length > 0) {

    filtros[0]
        .classList
        .add("ativo");

}


/* =========================================================
   SETAS DOS PROJETOS
   ========================================================= */

const projetosAnterior =
    document.getElementById(
        "projetos_anterior"
    );

const projetosProximo =
    document.getElementById(
        "projetos_proximo"
    );

const cardsProjetos =
    document.querySelector(
        ".cards_container"
    );


if (
    projetosAnterior &&
    projetosProximo &&
    cardsProjetos
) {

    projetosProximo.addEventListener(
        "click",
        () => {

            cardsProjetos.scrollBy({
                left: 350,
                behavior: "smooth"
            });

        }
    );


    projetosAnterior.addEventListener(
        "click",
        () => {

            cardsProjetos.scrollBy({
                left: -350,
                behavior: "smooth"
            });

        }
    );

}


/* =========================================================
   NAV ATIVA
   ========================================================= */

const linksNav =
    document.querySelectorAll(
        "header nav a"
    );

const secoesNav =
    document.querySelectorAll(
        "#inicio, #sobre, #habilidades, #projetos, #curiosidades, #contato"
    );


function atualizarNav() {

    let secaoAtual =
        "inicio";


    secoesNav.forEach(
        (secao) => {

            const topo =
                secao.offsetTop - 250;


            if (
                window.scrollY >= topo
            ) {

                secaoAtual =
                    secao.id;

            }

        }
    );


    linksNav.forEach(
        (link) => {

            link.classList
                .remove("ativo");


            if (
                link.getAttribute("href") ===
                `#${secaoAtual}`
            ) {

                link.classList
                    .add("ativo");

            }

        }
    );

}


window.addEventListener(
    "scroll",
    atualizarNav
);


atualizarNav();


/* =========================================================
   HEADER ESCONDENDO AO ROLAR
   ========================================================= */

const header =
    document.querySelector(
        "header"
    );

let ultimaPosicao =
    window.scrollY;


window.addEventListener(
    "scroll",
    () => {

        const posicaoAtual =
            window.scrollY;


        if (
            posicaoAtual >
                ultimaPosicao &&
            posicaoAtual > 100
        ) {

            header.classList
                .add("header-escondido");

        }

        else if (
            posicaoAtual <
            ultimaPosicao
        ) {

            header.classList
                .remove("header-escondido");

        }


        ultimaPosicao =
            posicaoAtual;

    }
);


/* =========================================================
   REVELAÇÃO DAS SEÇÕES
   ========================================================= */

const elementosParaRevelar =
    document.querySelectorAll(
        "#sobre, #habilidades, #projetos, #curiosidades, #contato"
    );


const observador =
    new IntersectionObserver(
        (elementos) => {

            elementos.forEach(
                (elemento) => {

                    if (
                        elemento.isIntersecting
                    ) {

                        elemento.target
                            .classList
                            .add("mostrar");

                    }

                }
            );

        },
        {
            threshold: 0.15
        }
    );


elementosParaRevelar.forEach(
    (elemento) => {

        observador.observe(elemento);

    }
);


/* =========================================================
   MENU HAMBÚRGUER — MOBILE
   ========================================================= */

const menuHamburguer =
    document.querySelector(
        ".menu-hamburguer"
    );

const nav =
    document.querySelector(
        "header nav"
    );


if (
    menuHamburguer &&
    nav
) {

    menuHamburguer.addEventListener(
        "click",
        () => {

            const menuAberto =
                nav.classList.toggle(
                    "menu-aberto"
                );


            menuHamburguer.classList.toggle(
                "aberto",
                menuAberto
            );


            menuHamburguer.setAttribute(
                "aria-expanded",
                menuAberto
            );

        }
    );


    /* FECHA AO CLICAR EM UMA OPÇÃO */

    nav.querySelectorAll("a").forEach(
        (link) => {

            link.addEventListener(
                "click",
                () => {

                    nav.classList.remove(
                        "menu-aberto"
                    );


                    menuHamburguer.classList.remove(
                        "aberto"
                    );


                    menuHamburguer.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                }
            );

        }
    );

}