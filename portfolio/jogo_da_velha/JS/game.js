// Declaração de Variáveis
let board = ['', '', '', '', '', '', '', '', '']; // cada espaço do tabuleiro pode ser preenchido com shield, sword ou empty.
let playerTurn = 0; // 0 para o jogador 01 ou 1 para o jogador 02 (são os index do array symbols).
let symbols = ['shield', 'sword'];// jogador 01 = shield / jogador 02 = sword.
let gameOver = false;
let winStates = [
    //Horizontal:
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    //Vertical:
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    //Diagonais:
    [0, 4, 8],
    [2, 4, 6]
]

function handleMove(position) {
    if (gameOver) {
        return; //Return interrompe a função HandleMove. Caso gameOver for true, o jogo é finalizado.
    }

    if (board[position] == '') { // Só permitir jogadas em squares vazios.
        board[position] = symbols[playerTurn];

        gameOver = isWin();

        if (gameOver == false) { //Se não houver um vencedor, a vez é passada para outro jogador.

            //Se for a vez do jogador 01 (simbolizado por 0), a próxima vez será do jogador 02 (simbolizado por 1).
            if (playerTurn == 0) {
                playerTurn = 1;
            }
            else { //se ele for igual a 1, ele passará a ser igual a 0.
                playerTurn = 0;
            }
            //Poderia usar operador ternário no lugar para representar esse código: playerTurn = (playerTurn == 0) ? 1 : 0;
        }
    }
    return gameOver; //se for true, handleMove é encerrado no interface.js
}

// Verificando se houve um vencedor:
// Temos 8 situações onde um dos jogadores pode sair vencedor:
// três marcações nas três linhas horizontais, três marcações nas três linhas verticais e três marcações nas duas diagonais.
function isWin() {

    for (let i = 0; i < winStates.length; i++) {
        let seq = winStates[i]; //Cada vez que passar no for, uma das sequências será analisada.
        let position1 = seq[0]; //Acesso o primeiro elemento de cada index do array winStates.
        let position2 = seq[1];
        let position3 = seq[2];

        if (board[position1] == board[position2] &&
            board[position1] == board[position3] &&
            board[position1] != '') { //Se uma das posições for vazia, não tem como haver um vencedor (eliminando a situação onde três elementos iguais e vazios daria uma vitória).

            return true;
        }
    }
    return false;
}
