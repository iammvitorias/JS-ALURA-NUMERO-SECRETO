let numeroSorteados = [];
let numeroMaximo = 10;


function exibir() {
      exibirTextoNaTela('h1', ' Jogo do número secreto');
      exibirTextoNaTela('p', 'Escolha um número entre 1 a 10');
}
exibir()

let tentatitvas = 1;

function gerarNumeroAleatorio() {
      let numeroEscolhido = parseInt(Math.random() * 10 + 1);
      let quantidadeDeElementosNaLista = numeroSorteados.length;

      if (quantidadeDeElementosNaLista == numeroMaximo) {
            numeroSorteados = [];
      }
      if (numeroSorteados.includes(numeroEscolhido)) {
            return gerarNumeroAleatorio();
      } else {
            numeroSorteados.push(numeroEscolhido);
            console.log(numeroSorteados);
            return numeroEscolhido;
      }


}

let numeroSecreto = gerarNumeroAleatorio();

function exibirTextoNaTela(tag, texto) {
      let campo = document.querySelector(tag);
      campo.innerHTML = texto;
      if ('speechSynthesis' in window) {
            let utterance = new SpeechSynthesisUtterance(texto);
            utterance.lang = 'pt-BR';
            utterance.rate = 1.2;
            window.speechSynthesis.speak(utterance);
      } else {
            console.log("Web Speech API não suportada neste navegador.");
      }
}

function limparCampo() {
      let campo = document.querySelector('input');
      campo.value = '';
      campo.focus();

}

function verificarChute() {
      let chute = document.querySelector('input').value;


      if (chute == numeroSecreto) {
            exibirTextoNaTela('h1', 'Acertou!');
            let palavrasTentativas = tentatitvas > 1 ? 'tentativas' : 'tentativa';
            let mensagemTentativas = `Você descobriu o número secreto com ${tentatitvas} ${palavrasTentativas}!`;
            exibirTextoNaTela('p', mensagemTentativas);

            document.getElementById('reiniciar').removeAttribute('disabled');

      } else {
            if (chute > numeroSecreto) {
                  exibirTextoNaTela('p', `É menor que ${chute}`);
            } else {
                  exibirTextoNaTela('p', `É maior que ${chute}`)
            }
            tentatitvas++;
            limparCampo();
      }
}

function reiniciarJogo() {
      numeroSecreto = gerarNumeroAleatorio();
      limparCampo();
      tentatitvas = 1;
      exibir();
      document.getElementById('reiniciar').setAttribute('disabled', true);
}
