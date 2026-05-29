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