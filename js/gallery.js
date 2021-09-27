var overlay = document.querySelector('.ift-overlay');
var frameImage = document.querySelector('.ift-gallery-frame-image');
var frameContainer = document.querySelector('.ift-gallery-frame-container');
var galleryImages = document.querySelectorAll('.ift-thumb-box');
var closeGallery = document.querySelectorAll('.ift-toggle-gallery');
var btnNext = document.querySelector('.ift-item-next');
var btnPrev = document.querySelector('.ift-item-prev');
var currCounter = document.querySelector('.ift-current-slide');
var totalCounter = document.querySelector('.ift-total-slide');
var skeletonLoading = document.querySelector('.ift-skeleton-loading');

// Ajustando a dimensão do container da página DETALHES (removendo os 270 px que ficaram sobrando no final, após deslocar a imagem 270px para cima).

var postGallery = document.querySelector('.ift-post-gallery');
var postGalleryHeight = postGallery.clientHeight;   // Captura a altura atual do elemento CSS.
postGallery.style.height = (postGalleryHeight - 270) + 'px';

// Counter formatter
var counterFormatter = function (q) {
    if (q < 10) {
        return '0' + q;
    }
    else {
        return q;
    }
}

totalCounter.innerHTML = counterFormatter(galleryImages.length);  // Número total de slides (imagens que aparecerão na tela do celular).

// Skeleton Loading

const skeletonAnim = function (imagem) {
    var myImage = new Image();
    myImage.src = imagem;
    myImage.addEventListener('load', function () {
        skeletonLoading.classList.add('ift-fade-out');  // Não precisa do ponto antes do nome da classe quando usa-se classList.add
        setTimeout(function () {
            skeletonLoading.style.display = 'none';

        }, 2000)
    });
}

// Open Gallery Modal

const getImageSrc = function () {
    for (var i = 0; i < galleryImages.length; i++) {
        galleryImages[i].addEventListener('click', function () {
            // console.log(this); // <img data-src="img/app-1.png" src="img/app-1-low.gif" alt="Tela do app Manage It 1" title="Tela do app Manage It 1" class="ift-img-responsive ift-thumb-img">
            // console.log(this.getAttribute('data-src'));  // img/app-1.png
            var imageSrc = this.querySelector('img').getAttribute('data-src');
            var itemNum = this.querySelector('img').getAttribute('data-item');  // Pega o atributo que informa a posição da imagem dentro da thumb.

            skeletonLoading.style.display = 'flex';

            frameImage.setAttribute('src', imageSrc);
            frameImage.setAttribute('data-index', itemNum);  // Passa o atributo que informa a posição da imagem dentro da thumb. 
            overlay.classList.add('ift-is-open');
            frameContainer.classList.add('ift-is-open');

            currCounter.innerHTML = counterFormatter(itemNum);

            skeletonAnim(imageSrc);

        });
    }
}

// Executando as funções (chamando-as).
getImageSrc();

for (var c = 0; c < closeGallery.length; c++) {
    closeGallery[c].addEventListener('click', function () {
        overlay.classList.remove('ift-is-open');
        frameContainer.classList.remove('ift-is-open');
    });
}

// Criando nosso método handler

const nextItem = function () {

    // Identificamos o item atual no frame = atual

    var currItemNum = frameImage.getAttribute('data-index');

    // Definimos o número do próximo item = atual + 1

    var nextItemNum = parseInt(currItemNum) + 1;  // ParseInt pega qualquer string que contem número e transforma em number. 

    // Fazemos o loop e identificamos qual item faz match com o número do próximo item 

    for (var n = 0; n < galleryImages.length; n++) {
        var item = galleryImages[n].querySelector('img');
        var itemNum = parseInt(item.getAttribute('data-item'));

        if (itemNum === nextItemNum) {

            // Capturamos o data-src
            var nextSrc = item.getAttribute('data-src'); // Capturando a imagem do item que foi identificado como nextItem.
            var nextIndex = item.getAttribute('data-item');

            skeletonLoading.style.display = 'flex';
            // Passamos o data-src para a tag de img no frame

            frameImage.setAttribute('src', nextSrc);
            frameImage.setAttribute('data-index', nextIndex);

            currCounter.innerHTML = counterFormatter(nextIndex);

            skeletonAnim(nextSrc);
        }
    }
}

const prevItem = function () {

    // Identificamos o item atual no frame = atual

    var currItemNum = frameImage.getAttribute('data-index');

    // Definimos o número do próximo item = atual + 1

    var prevItemNum = parseInt(currItemNum) - 1;  // ParseInt pega qualquer string que contem número e transforma em number. 

    // Fazemos o loop e identificamos qual item faz match com o número do próximo item 

    for (var p = 0; p < galleryImages.length; p++) {
        var item = galleryImages[p].querySelector('img');
        var itemNum = parseInt(item.getAttribute('data-item'));

        if (itemNum === prevItemNum) {

            // Capturamos o data-src
            var prevSrc = item.getAttribute('data-src'); // Capturando a imagem do item que foi identificado como nextItem.
            var prevIndex = item.getAttribute('data-item');

            skeletonLoading.style.display = 'flex';

            // Passamos o data-src para a tag de img no frame

            frameImage.setAttribute('src', prevSrc);
            frameImage.setAttribute('data-index', prevIndex);

            currCounter.innerHTML = counterFormatter(prevIndex);

            skeletonAnim(prevSrc);
        }
    }
}

// Quando clicar no botão de 'próximo item', execute a função nextItem.
btnNext.addEventListener('click', function () {
    nextItem();
});

// Quando clicar no botão de 'item anterior', execute a função prevItem.
btnPrev.addEventListener('click', function () {
    prevItem();
});

