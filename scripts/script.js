const html = document.querySelector("html");
const btFoco = document.querySelector(".app__card-button--foco");
const btCurto = document.querySelector(".app__card-button--curto");
const btLongo = document.querySelector(".app__card-button--longo");
const banner = document.querySelector(".app__image");
const titulo = document.querySelector(".app__title");
const botoes = document.querySelectorAll(".app__card-button");
const btStartPause = document.querySelector("#start-pause");
const btIniciarOuPausar = document.querySelector("#start-pause span");
const tempoNaTela = document.querySelector("#timer");
const btIconeiniciarOuPausar = document.querySelector(".app__card-primary-butto-icon");

const musicaFocoInput = document.querySelector("#alternar-musica");
const musica = new Audio("./sons/luna-rise-part-one.mp3");
const audioPlay = new Audio("./sons/play.wav");
const audioPause = new Audio(". /sons/pause.mp3");
const audioBeep = new Audio("./sons/beep.mp3");

let tempoDecorridoEmSegundos = 0;
let intervaloId = null;

musica.loop = true;

musicaFocoInput.addEventListener("change", () => {
    if (musica.paused) {
        musica.play();
    } else {
        musica.pause();
    }
});

btFoco.addEventListener("click", () => {
    tempoDecorridoEmSegundos = 30;
    alterarContexto("foco");
    btFoco.classList.add("active");
});

btCurto.addEventListener("click", () => {
    tempoDecorridoEmSegundos = 15;
    alterarContexto("descanso-curto"); 
    btCurto.classList.add("active");
});

btLongo.addEventListener("click", () => {
    tempoDecorridoEmSegundos = 50;
    alterarContexto("descanso-longo");
    btLongo.classList.add("active");
});

function alterarContexto(contexto) {
    mostrarTempo();
    botoes.forEach(function (contexto) {
        contexto.classList.remove("active");
    })
    html.setAttribute("data-contexto", contexto);
    banner.setAttribute("src", `./imagens/${contexto}.png`);
    switch (contexto) {
        case "foco":
            titulo.innerHTML = `
            Otimize sua produtividade,<br>
                <strong class="app__title-strong">mergulhe no que importa.</strong>
            `
            break;
        case "descanso-curto":
            titulo.innerHTML = `
            Que tal dar uma respirada?,<br>
                <strong class="app__title-strong">Faça uma pausa curta</strong>`
            break;
        case "descanso-longo": 
            titulo.innerHTML = `Hora de volta a superfície,<br>
                <strong class="app__title-strong">Faça uma pausa longa.</strong>`
            break;   
        default: 
            break; 
    }
};

const contagemRegressiva = () => {
    if(tempoDecorridoEmSegundos <= 0) {
        audioBeep.play();
        alert("Tempo Finalizado!");
        const focoAtivo = html.getAttribute('data-contexto') == "foco";        
        if (focoAtivo) {
            const evento = new CustomEvent('FocoFinalizado');
            document.dispatchEvent(evento);
        }
        zerar();
        return;
    }
    tempoDecorridoEmSegundos -= 1
    mostrarTempo();
}

btStartPause.addEventListener("click", iniciarOuPausar); 

function iniciarOuPausar() {
    if (intervaloId) {
        audioPause.play();
        zerar();
        return;
    }
    audioPlay.play();
    intervaloId = setInterval(contagemRegressiva, 1000);
    btIniciarOuPausar.textContent = "Pausar";
    btIconeiniciarOuPausar.setAttribute("src", "./imagens/pause.png");
}

function zerar() {
    clearInterval(intervaloId);
    btIniciarOuPausar.textContent = "Começar";
    btIconeiniciarOuPausar.setAttribute("src", "./imagens/play_arrow.png");
    intervaloId = null;
}

function mostrarTempo() {
    const tempo = new Date(tempoDecorridoEmSegundos * 1000);
    const tempoFormatado = tempo.toLocaleTimeString("pt-BR",{minute: "2-digit", second: "2-digit"});
    tempoNaTela.innerHTML = `${tempoFormatado}`;
}

mostrarTempo();