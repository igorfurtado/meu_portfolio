// Declarando variáveis
var btnContact = document.querySelector('.ift-btn-contact'); // Poderia criar uma id para fazer o link do botão. Mas estou usando a classe.
var toggleModal = document.querySelectorAll('.ift-toggle-modal'); // Usar o querySelectorAll, pois são três situações onde a classe é aplicada, não apenas uma!
var toggleMenu = document.querySelectorAll('.ift-toggle-menu');
var menuMobile = document.querySelector('.ift-menu-mob');
var btnMenuMobIcon = document.querySelector('.ift-btn-menu-mob ion-icon');

// Criando o evento click no botão de contato
btnContact.addEventListener('click', function () {  // Primeiro argumento: evento; Segundo argumento: ação
    var boxContact = document.querySelector('.ift-contact-info');

    boxContact.classList.toggle('ift-is-open');  // Quando clicar, a box recebe o conteúdo dessa classe (que passa um display: block). Ao clicar novamente, trona 'false' a existência dessa classe.
    // classlist é uma alternativa conveniente para acessar a lista de classes de um elemento.

    this.classList.toggle('ift-change-icon');
    // Usa-se o 'this' para fazer menção ao elemento raiz do escopo onde se está. No caso, dentro deste bloco, o 'this' faz menção ao btnContact.
});

// Abrindo e fechando o menu mobile

for (var m = 0; m < toggleMenu.length; m++) {
    toggleMenu[m].addEventListener('click', function () {  // As variáveis que um evento altera precisam ser declaradas dentro da função. 
        var overlay = document.querySelector('.ift-menu-overlay');
        overlay.classList.toggle('ift-is-open');
        menuMobile.classList.toggle('ift-menu-is-closed');  // Toggle -> se está adicionada, ele remove. Se não existe, ele adiciona. 
        menuMobile.classList.toggle('ift-menu-is-open');

        var icon = btnMenuMobIcon.getAttribute('name');

        if (icon === 'menu-outline') {
            btnMenuMobIcon.setAttribute('name', 'close-outline');
        }
        else {
            btnMenuMobIcon.setAttribute('name', 'menu-outline');
        }
    });
}

// Abrindo e fechando o Modal do botão 'Fale comigo!'
for (var i = 0; i < toggleModal.length; i++) {
    //console.log(toggleModal[i]); //Loop para repetir a função a ser executada para as três tags que recebem a classe ift-toggle-Modal
    toggleModal[i].addEventListener('click', function () {  // As variáveis que um evento altera precisam ser declaradas dentro da função. 
        var overlay = document.querySelector('.ift-overlay');
        var modalFaleComigo = document.querySelector('#ift-modal-fale-comigo');

        overlay.classList.toggle('ift-is-open');
        modalFaleComigo.classList.toggle('ift-is-open'); // Passa um display block. Antes tinha apenas um none declarado.
        // A classe toggle foi passada para o botão 'Fale comigo!', para o botão 'X' que aparece no modal aberto ou quando o usuário
        // clicar em qualquer parte vazia do overlay (fora do modal).
        modalFaleComigo.classList.toggle('ift-slide-top-in');
    });
}

// Animando elementos da Top-bar

var TriggerTopBar = document.querySelector('.ift-trigger-top-bar');
var topBar = document.querySelector('.ift-top-bar');
var logo = document.querySelector('.ift-logo');
var waypoint = new Waypoint({
    element: TriggerTopBar,
    handler: function () {  // método
        topBar.classList.toggle('ift-top-bar-background');
        logo.classList.toggle('ift-logo-shorten');
        logo.classList.toggle('ift-logo-bigger');
    },
    offset: '60px'
});




