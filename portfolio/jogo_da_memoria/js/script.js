const FRONT = "card-front";
const BACK = "card-back";
const CARD = 'card';
const ICON = 'icon';

startGame(); //cria as cartas e coloca dentro de cartas

function startGame() {
    initializeCards(game.createCardsFromTechs());
}

//Função que pega o tipo da carta e transforma em um modelo visual.
function initializeCards(cards) {
    let gameBoard = document.getElementById("gameBoard");
    gameBoard.innerHTML = ''; //Limpando o gameBoard para quando o jogo for reiniciado.

    game.cards.forEach(card => {
        //Para cada uma das cartas vamos criar um elemento visível
        let cardElement = document.createElement('div');
        //Atribuindo o id de cada card a seu elemento criado:
        cardElement.id = card.id;
        //Adicionando a classe card para cada elemento:
        cardElement.classList.add(CARD);
        //Atribuindo dataset data-icon para cada elemento:
        cardElement.dataset.icon = card.icon;

        createCardContent(card, cardElement);

        //Ao clicar em cada carta, fazer a jogada:
        cardElement.addEventListener('click', flipCard);
        //Colocando a carta criada no tabuleiro (gameBoard):
        gameBoard.appendChild(cardElement);
    })
}

//Criando o front e o back de cada carta
function createCardContent(card, cardElement) {
    createCardFace(FRONT, card, cardElement);
    createCardFace(BACK, card, cardElement);
}

function createCardFace(face, card, element) {
    let cardElementFace = document.createElement('div');
    cardElementFace.classList.add(face); //adicionando a classe FRONT ou BACK

    if (face === FRONT) {
        let iconElement = document.createElement('img');//cria o atributo img em cada tag html que tiver a classe card-front.
        iconElement.classList.add(ICON); //conteúdo do FRONT da carta.
        iconElement.src = "./assets/" + card.icon + ".png"; //endereço de cada imagem (na pasta assets, as imagens foram criadas com os mesmos nomes dos ícones).
        cardElementFace.appendChild(iconElement); //adiciona o atributo img na div criada.
    }
    else {
        cardElementFace.innerHTML = "&lt/&gt"; //conteúdo do BACK da carta.
    }
    element.appendChild(cardElementFace);
}


//Função para girar a carta ao ser clicada:
function flipCard() {
    if (game.firstMove) {
        game.timer(); //se for a primeira jogada do jogo, iniciar o timer
        game.firstMove = false;
    }

    if (game.setCard(this.id)) { //se uma carta for selecionada, aí o flip será feito
        this.classList.add("flip");
        if (game.secondCard) { //se não tiver secondCard, não tem como haver Match (tratando erro);
            if (game.checkMatch()) {
                game.clearCards(); //se teve um match, limpa as cartas
                if (game.checkGameOver()) {
                    //se gameOver, parar o timer:
                    clearInterval(control);
                    //se gameOver, mostrar gameOverLayer:
                    let gameOverLayer = document.getElementById('gameOver');
                    gameOverLayer.style.display = 'flex'; //está setado como 'none' até que acontece um gameOver.
                };
            }
            else { //pega as duas cartas que estarão flippadas:
                setTimeout(() => {
                    let firstCardView = document.getElementById(game.firstCard.id);
                    let secondCardView = document.getElementById(game.secondCard.id);

                    firstCardView.classList.remove('flip');
                    secondCardView.classList.remove('flip');

                    //Depois de desflipar:
                    game.unflipCards();
                }, 1000);

            };
        }

    };
}

function restart() {
    game.clearCards();
    startGame();
    game.seconds = 0;
    game.minutes = 0;
    game.attempt = 0;
    game.firstMove = true;
    setClock();
    setAttempt();
    let gameOverLayer = document.getElementById('gameOver');
    gameOverLayer.style.display = 'none';

    let attempt = document.querySelector('.attempt');
    attempt.innerHTML = 0;
}

//Função para calcular o número de jogadas
function setAttempt() {
    let attempt = document.querySelector('.attempt');
    attempt.innerHTML = game.attempt;
}

//Função para setar um cronômetro
function setClock() {
    let seconds = document.getElementById('seconds');
    let minutes = document.getElementById('minutes');

    if (game.seconds < 10) {
        seconds.innerHTML = '0' + game.seconds; //uma casa decimal
    }
    else {
        seconds.innerHTML = game.seconds;
    }

    if (game.minutes < 10) { //uma casa decimal
        minutes.innerHTML = '0' + game.minutes + ':';
    }
    else {
        minutes.innerHTML = game.minutes + ':';
    }
}
