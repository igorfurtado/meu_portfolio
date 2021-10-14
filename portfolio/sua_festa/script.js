// Qual a quantidade de comida e bebida que deve ser comprada?

//Variáveis

//Número de adultos;
let inputAdultos = document.getElementById('adultos');
//Número de crianças;   -> crianças valem por 0.8
let inputCriancas = document.getElementById('criancas');
//Duração da festa.
let inputDuracao = document.getElementById('duracao');
//Botão
var botao = document.getElementById('botao');
//Resultado
let resultado = document.getElementById('resultado');


//Quantidades (referência)
//Salgados - 12 unidades/pessoa     + 5 horas -> 15 unidades/pessoa
//Refrigerante - 500ml/pessoa    + 5 horas -> 700ml/pessoa
//Docinhos - 5 unidades/pessoa    + 5 horas -> 7 unidades/pessoa

//Adicionando evento de clique ao botão.
botao.addEventListener('click', calcular);

function calcular() {
    console.log('calculando');

    let adultos = inputAdultos.value;
    let criancas = inputCriancas.value;
    let duracao = inputDuracao.value;

    let quantidadeTotalSalgados = parseInt((adultos * salgadoPorPessoa(duracao)) + (criancas * salgadoPorPessoa(duracao) * 0.8));
    let quantidadeTotalRefrigerante = ((adultos * refrigerantePorPessoa(duracao)) + (criancas * refrigerantePorPessoa(duracao) * 0.8)) / 1000;
    let quantidadeTotalDocinhos = parseInt((adultos * docinhosPorPessoa(duracao)) + (criancas * docinhosPorPessoa(duracao) * 0.8));
    let quantidadeTotalFatiasDeBolo = (adultos * fatiasBoloPorPessoa(duracao)) + (criancas * fatiasBoloPorPessoa(duracao) * 0.8);

    var boloTamanho = tamanhoBolo(quantidadeTotalFatiasDeBolo);

    resultado.innerHTML = `<p>${quantidadeTotalSalgados} salgados;</p>`
    resultado.innerHTML += `<p>${quantidadeTotalDocinhos} docinhos;</p>`
    resultado.innerHTML += `<p>${Math.ceil(quantidadeTotalRefrigerante)} litros de refrigerante;</p>`
    resultado.innerHTML += `<p>Você precisará de um bolo para ${boloTamanho} pessoas.</p>`
}

function salgadoPorPessoa(duracao) {
    if (duracao >= 5) {
        return 15;
    }
    else {
        return 12;
    }
}

function refrigerantePorPessoa(duracao) {
    if (duracao >= 5) {
        return 700;
    }
    else {
        return 500;
    }
}

function docinhosPorPessoa(duracao) {
    if (duracao >= 5) {
        return 7;
    }
    else {
        return 5;
    }
}

function fatiasBoloPorPessoa(duracao) {
    if (duracao >= 5) {
        return 1.5;
    }
    else {
        return 1;
    }
}

function tamanhoBolo(quantidadeTotalFatiasDeBolo) {
    if (quantidadeTotalFatiasDeBolo <= 5) {
        return 5;
    }
    else if (quantidadeTotalFatiasDeBolo <= 10 && quantidadeTotalFatiasDeBolo > 5) {
        return 10
    }
    else if (quantidadeTotalFatiasDeBolo <= 15 && quantidadeTotalFatiasDeBolo > 10) {
        return 15
    }
    else if (quantidadeTotalFatiasDeBolo <= 20 && quantidadeTotalFatiasDeBolo > 15) {
        return 20
    }
    else if (quantidadeTotalFatiasDeBolo <= 30 && quantidadeTotalFatiasDeBolo > 20) {
        return 30
    }
    else if (quantidadeTotalFatiasDeBolo <= 40 && quantidadeTotalFatiasDeBolo > 30) {
        return 40
    }
    else if (quantidadeTotalFatiasDeBolo <= 50 && quantidadeTotalFatiasDeBolo > 40) {
        return 50
    }
    else if (quantidadeTotalFatiasDeBolo <= 70 && quantidadeTotalFatiasDeBolo > 50) {
        return 70
    }
    else if (quantidadeTotalFatiasDeBolo <= 100 && quantidadeTotalFatiasDeBolo > 70) {
        return 100
    }
    else if (quantidadeTotalFatiasDeBolo <= 150 && quantidadeTotalFatiasDeBolo > 100) {
        return 150
    }
    else if (quantidadeTotalFatiasDeBolo <= 200 && quantidadeTotalFatiasDeBolo > 150) {
        return 200
    }
    else {
        return 300
    }
}


