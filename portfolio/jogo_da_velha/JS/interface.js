//Importante: fazer upload do script game antes do script interface para que o interface.js tenha acesso ao conteúdo de game.

// Garantindo que o html foi carregado por meio do evento DOMContentLoaded.
document.addEventListener('DOMContentLoaded', () => {
    // Importando cada elemento square (quadrado do jogo).
    let squares = document.querySelectorAll(".square");
    let btn = document.getElementById("btn");
    //forEach aceita uma função callback. Semelhante ao for-of, tendo a vantagem de não precisar declarar o index de cada elemento para acessá-los.
    squares.forEach((square) => {
        square.addEventListener('click', handleClick);
    });
    btn.addEventListener('click', resetGame);
})

// Função a ser executada no click.
function handleClick(event) {  //O target do evento é o elemento que sofreu o evento (no caso o square). Colocamos o console.log para identificar se os squares estão sendo acessados após a ação de click.
    let square = event.target; // Representa qual elemento foi clicado.
    let position = square.id; // Cada square tem uma id que indica qual a sua posição.

    if (handleMove(position)) { // handleMove pega a posição que foi clicada

        setTimeout(() => {
            alert("O jogo acabou! - O vencedor foi o jogador " + whatsTheSymbol(playerTurn)); //O setTimeOut foi adicionado porquê o alert era acionado antes que o último elemento symbol fosse apresentado no board. Um pequeno delay de 10ms foi suficiente para resolver.
        }, 10); //Se o handleMove for true, então houve um game-over.
    };
    updateSquares();
}

// Adiciona um innerHTML com a classe de shield ou sword, de acordo com a vez de cada jogador.
function updateSquares() {
    let squares = document.querySelectorAll(".square");

    squares.forEach((square) => {
        let position = square.id;
        let symbol = board[position];

        if (symbol != '') {
            square.innerHTML = `<div class='${symbol}'></div>`
        }
    })
}

//Atribui um emoji para o jogador vencedor.
function whatsTheSymbol(playerTurn) {
    if (playerTurn == 0) {
        return String.fromCodePoint(0x1F6E1);
    }
    else {
        return String.fromCodePoint(0x1F5E1);
    }
}

//Restart game: coloca as variáveis para o estado inicial.
function resetGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    playerTurn = 0;

    gameOver = false;

    let squares = document.querySelectorAll(".square");

    squares.forEach((square) => {
        let position = square.id;
        let symbol = board[position];
        square.innerHTML = `<div class=''></div>`
    })
}
