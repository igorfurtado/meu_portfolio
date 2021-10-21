let game = {

    //LockMode vai fazer o jogo pausar enquanto é conferido se as duas cartas selecionadas fazem um par.
    lockMode: false,
    firstCard: null,
    secondCard: null,
    //Variáveis
    techs: ['bootstrap', 'css', 'electron', 'firebase', 'html', 'javascript', 'jquery', 'mongo', 'node', 'react'],
    cards: null,
    attempt: 0,
    seconds: 0,
    minutes: 0,
    firstMove: true,

    //Método que vai retornar verdadeiro ou falso para saber se a carta foi selecionada ou não.
    setCard: function (id) {
        let card = this.cards.filter(card => card.id === id)[0]; //função que recebe card e retorna todas as cartas que tiverem o id igual ao id da carta clicada. Filter retorna um array, por isso queremos pegar o primeiro index desse array (que só terá um item mesmo).
        console.log(card);
        if (card.flipped || this.lockMode) {
            return false; //quando estiver false, essa carta não pode ser setada.
        };

        //Se a carta não estiver flippada e nem estiver em lockMode, guardamos essa carta para depois compará-la com a segunda carta:
        if (!this.firstCard) {  //if not first card (se a segunda entrada for diferente da primeira carta já selecionada):
            this.firstCard = card;
            this.firstCard.flipped = true;
            return true; //uma carta foi setada.
        }
        else {
            this.secondCard = card; //se a primeira carta não for null (ou seja, está selecionada), vamos tentar colocar a seleção na segunda carta:
            this.secondCard.flipped = true;
            this.lockMode = true;
            return true;
        }

    },

    //Checando se as duas cartas deram match:
    checkMatch: function () {
        this.attempt++; //cada vez que for checado se houve match, foi uma tentativa de jogada.
        setAttempt();
        if (!this.firstCard || !this.secondCard) { //se não tivermos firstcard ou não tivermos secondcard, retornar false, pois não teria como as cartas serem iguais assim
            return false;
        };
        return this.firstCard.icon === this.secondCard.icon; //icon é o atributo que as duas cartas terão em comum (já que todas têm ids diferentes)

    },

    //Método para liberar as cartas para serem selecionadas:
    clearCards: function () {
        this.firstCard = null;
        this.secondCard = null;
        this.lockMode = false;
    },

    unflipCards() {
        this.firstCard.flipped = false;
        this.secondCard.flipped = false;
        this.clearCards();
    },

    checkGameOver() {
        // GameOver ocorre quando todas as cartas estão flipadas.
        //Função para verificar as cartas não flipadas:
        return this.cards.filter(card => !card.flipped).length == 0;
        //retorna verdeiro quando todas as cartas estiverem flippadas.
    },


    //Criando o array cards com os pares de cada tipo de carta.
    createCardsFromTechs: function () {
        //dentro do js cards funciona como uma referência (shallow copy) e não de uma cópia (deep).
        this.cards = []; //cards deste objeto

        for (let tech of this.techs) { //poderia usar o forEach (techs.forEach(tech => {cards.push(createPairFromTech(tech))}); no lugar do for-of
            this.cards.push(this.createPairFromTech(tech));
        }
        //flatMap vai retornar um array (novo array, montado com base no array original), porém desmembrando os arrays que estão dentro do array principal.
        this.cards = this.cards.flatMap(pair => pair); //passando o array pair e retornando pair. Arrow function como callback.
        this.shuffleCards();
        return this.cards;
    },

    //Criando o par da cada carta. Cada par é um array com dois objetos. A diferença entre os pares está apenas no id.
    createPairFromTech: function (tech) {
        return [{
            id: this.createIdWithTech(tech),
            icon: tech,
            flipped: false
        }, {
            id: this.createIdWithTech(tech),
            icon: tech,
            flipped: false
        }]
    },

    //Criando um id aleatório
    createIdWithTech: function (tech) {
        return tech + parseInt(Math.random() * 1000)
    },

    //Embaralhando as cartas
    shuffleCards: function (cards) {
        //Lógica de embaralhamento: pegar a última carta e substituir a sua posição pela de uma carta aleatória. Fazer o mesmo para a penúltima carta, e assim por diante até modificar a posição de todas as cartas.
        let currentIndex = this.cards.length; //última posição = [20]
        let randomIndex = 0;

        while (currentIndex !== 0) {
            randomIndex = Math.floor(Math.random() * currentIndex); //floor arredonda para baixo (retorna o menor número inteiro)
            currentIndex--; //quando uma carta é embaralhada, ele já não fará mais parte do loop while.

            //Invertendo as posições do currentIndex pela de um randomIndex:
            [this.cards[randomIndex], this.cards[currentIndex]] = [this.cards[currentIndex], this.cards[randomIndex]];
        }
    },

    //Função Timer
    timer: function () {
        control = setInterval(() => {
            if (this.seconds < 59) {
                this.seconds++
            }
            else {
                this.minutes++;
                this.seconds = 0;
            }
            setClock();
        }, 1000);
        setClock();
    }
};


