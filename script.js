// Configuração exata: 30 de Novembro de 2025 às 20:30:00
// No JavaScript, os meses vão de 0 a 11, por isso Novembro é o número 10
const dataInicio = new Date(2025, 10, 30, 20, 30, 0); 

function atualizarContador() {
    const agora = new Date();
    const diferenca = agora - dataInicio; // Diferença em milissegundos

    // Cálculos matemáticos para converter milissegundos em dias, horas, minutos e segundos
    const dias = Math.floor(diferenca / (1000 * 60 * 60 * 24));
    const horas = Math.floor((diferenca % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutos = Math.floor((diferenca % (1000 * 60 * 60)) / (1000 * 60));
    const segundos = Math.floor((diferenca % (1000 * 60)) / 1000);

    // Injeta o resultado atualizado na tela dentro da div correspondente
    document.getElementById("contador").innerHTML = 
        `${dias} dias, ${horas} horas, ${minutos} minutos e ${segundos} segundos!`;
}

// Executa a função imediatamente para o site não abrir piscando "Carregando..."
atualizarContador();

// Atualiza o contador automaticamente a cada 1 segundo
setInterval(atualizarContador, 1000);

// ==========================================
// CONTROLE DA PLAYLIST VIA YOUTUBE
// ==========================================

// Adicione suas 60 músicas aqui seguindo o padrão. 
// O 'id' é o que vem depois do "v=" no link do YouTube.
// Exemplo: se o link é https://www.youtube.com/watch?v=dQw4w9WgXcQ, o id é "dQw4w9WgXcQ"
const listaMusicas = [
    { id: "2B9dhpWgEzU?si=zsKhSuo7rJc630Uf", titulo: "Billie Jean - Hoodtrap" },
    // Pode ir colando as outras 60 aqui para baixo...
];

let indiceAtual = 0;
let ytPlayer; // Guarda a instância do player do YouTube

// Essa função é chamada automaticamente pelo script do YouTube quando ele carrega
function onYouTubeIframeAPIReady() {
    ytPlayer = new YT.Player('player-youtube', {
        height: '0',
        width: '0',
        videoId: listaMusicas[indiceAtual].id,
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        }
    });
}

function onPlayerReady(event) {
    document.getElementById("nome-da-musica").innerHTML = listaMusicas[indiceAtual].titulo;
}

// Controla o que acontece quando a música muda de estado (ex: quando termina)
function onPlayerStateChange(event) {
    // YT.PlayerState.ENDED significa que a música acabou
    if (event.data === YT.PlayerState.ENDED) {
        proximaMusica();
    }
}

function playPause() {
    if (!ytPlayer) return;
    
    const estado = ytPlayer.getPlayerState();
    const btnPlay = document.getElementById("btn-play");

    // Se estiver pausado ou não iniciado, dá play
    if (estado === YT.PlayerState.PAUSED || estado === YT.PlayerState.CUED || estado == -1) {
        ytPlayer.playVideo();
        btnPlay.innerHTML = "⏸️ Pausar";
    } else {
        ytPlayer.pauseVideo();
        btnPlay.innerHTML = "▶️ Tocar";
    }
}

function carregarMusica(indice) {
    if (!ytPlayer) return;
    indiceAtual = indice;
    
    // Atualiza o texto na tela
    document.getElementById("nome-da-musica").innerHTML = listaMusicas[indiceAtual].titulo;
    
    // Carrega o novo vídeo do YouTube e dá play
    ytPlayer.loadVideoById(listaMusicas[indiceAtual].id);
    document.getElementById("btn-play").innerHTML = "⏸️ Pausar";
}

function proximaMusica() {
    let proximoIndice = indiceAtual + 1;
    if (proximoIndice >= listaMusicas.length) {
        proximoIndice = 0; // Volta para a primeira
    }
    carregarMusica(proximoIndice);
}

function musicaAnterior() {
    let indiceAnterior = indiceAtual - 1;
    if (indiceAnterior < 0) {
        indiceAnterior = listaMusicas.length - 1; // Vai para a última
    }
    carregarMusica(indiceAnterior);
}
