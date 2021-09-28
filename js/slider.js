// ------PORTFÓLIO SLIDER-------

// Declarando variáveis do slider

var sliderContainer = document.querySelector('.ift-slider-container');
var sliderList = document.querySelector('.ift-slider-list');
var sliderItem = document.querySelectorAll('.ift-portfolio-item');  // Múltiplos itens
const sliderTotalItems = sliderItem.length;
var sliderListWidth = null;
var prevItem = document.querySelector('.ift-item-prev');
var nextItem = document.querySelector('.ift-item-next');
var sliderPos = 0;
var currentSlide = document.querySelector('.ift-current-slide');
var totalSlide = document.querySelector('.ift-total-slide');
var currentCounter = 1;  // Sempre inicia no slide 1.
var navItems = document.querySelectorAll('.ift-item-navigator a');
var navCounter = document.querySelector('.ift-navigator-counter span');

// Capturando larguras individuais

if (window.innerWidth < 992) {
    var containerWidth = sliderContainer.parentElement.offsetWidth - 30;
}  // Vai no elemento pai e pega a sua largura. 
// The offsetWidth property returns the viewable width of an element in pixels, including padding, border and scrollbar, but not the margin.


// Passando larguras dinâmicas 

sliderContainer.style.width = containerWidth + 'px';

for (var n = 0; n < sliderItem.length; n++) {
    sliderItem[n].style.width = containerWidth + 'px';  // Insere css in-line com a largura do container aplicada em cada item.

    var sliderItemWidth = sliderItem[n].offsetWidth;

    sliderListWidth += sliderItemWidth;
}

sliderList.style.width = sliderListWidth + 'px';


// HANDLERS - métodos

// Next slide - animação

var nextSlideAnim = function () {

    var lastItem = sliderListWidth - containerWidth;

    if ((-sliderPos) === lastItem) {  // Se estiver no último item do slider, faça o que estiver a seguir: não faça nada, pois nada foi declarado.
        return;
    }

    sliderPos -= containerWidth;

    anime({  // biblioteca anima.js
        targets: sliderList,
        translateX: sliderPos,
        easing: 'cubicBezier(0,1.01,0.32,1)'
    });
}

// Prev slide - animação

var prevSlideAnim = function () {

    if (sliderPos === 0) {  // Se estiver no primeiro item do slider, faça o que estiver a seguir: não faça nada, pois nada foi declarado.
        return;
    }

    sliderPos += containerWidth;

    anime({  // biblioteca anima.js
        targets: sliderList,
        translateX: sliderPos,
        easing: 'cubicBezier(0,1.01,0.32,1)'
    });
}

// Counter formatter
var counterFormatter = function (q) {
    if (q < 10) {
        return '0' + q;
    }
    else {
        return q;
    }
}

// Counter Add

var counterAdd = function () {
    if (currentCounter >= 0 && currentCounter < sliderTotalItems) {
        currentCounter++;
        currentSlide.innerHTML = counterFormatter(currentCounter);
        navCounter.innerHTML = counterFormatter(currentCounter);
    }
}

// Counter Remove

var counterRemove = function () {
    if (currentCounter > 1 && currentCounter <= sliderTotalItems) {
        currentCounter--;
        currentSlide.innerHTML = counterFormatter(currentCounter);
        navCounter.innerHTML = counterFormatter(currentCounter);
    }
}

// SET Active Nav

var setActiveNav = function () {
    for (var nv = 0; nv < navItems.length; nv++) {
        let myNavNum = parseInt(navItems[nv].getAttribute('data-nav')); // Transforma para número inteiro (data-nav vem em formato string)

        if (myNavNum === currentCounter) {
            navItems[nv].classList.add('ift-item-active');

            anime({  // biblioteca anima.js
                targets: '.ift-item-active',
                width: 90
            });
        }
    }
}

// SET Active Slide

var setActiveSlide = function () {
    for (var sld = 0; sld < sliderItem.length; sld++) {
        let mySlideNum = parseInt(sliderItem[sld].getAttribute('data-slide')); // Transforma para número inteiro (data-nav vem em formato string)

        if (mySlideNum === currentCounter) {
            sliderItem[sld].classList.add('ift-slide-active');
            sliderItem[sld].querySelector('.ift-portfolio-item-box').classList.add('ift-scale-right');
            sliderItem[sld].querySelector('.ift-portfolio-item-thumb img').classList.add('ift-scale-up');
            sliderItem[sld].querySelector('.ift-portfolio-item-info').classList.add('ift-fade-from-left');
        }
    }
}

var changeActive = function () {
    for (var rm = 0; rm < navItems.length; rm++) {
        navItems[rm].classList.remove('ift-item-active');

        anime({  // biblioteca anima.js
            targets: navItems[rm],
            width: 20 // Anima de volta a barra inferior abaixo do número de cada navigator (remove a barra com animação)
        });
    }

    for (var rms = 0; rms < sliderItem.length; rms++) {
        sliderItem[rms].classList.remove('ift-slide-active');
        sliderItem[rms].querySelector('.ift-portfolio-item-box').classList.remove('ift-scale-right');
        sliderItem[rms].querySelector('.ift-portfolio-item-thumb img').classList.remove('ift-scale-up');
        sliderItem[rms].querySelector('.ift-portfolio-item-info').classList.remove('ift-fade-from-left');
    }

    setActiveNav();
    // Primeiro remove o ift-item-active de todos e depois adiciona a função de acrescentar a classe. 
    setActiveSlide();
}

// ACTIONS

totalSlide.innerHTML = counterFormatter(sliderTotalItems);

anime({  // biblioteca anima.js
    targets: '.ift-item-active',
    width: 90  // Já inicia a animação no primeiro item do navigator.
});

// Botão próximo slide

nextItem.addEventListener('click', function () {
    nextSlideAnim();
    counterAdd();
    changeActive();
});

// Botão slide anterior

prevItem.addEventListener('click', function () {
    prevSlideAnim();
    counterRemove();
    changeActive();
});