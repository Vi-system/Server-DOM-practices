import { data as slidersData, responsive as breakPoints } from './slider-data.js';

const $sliderItemsContainer = document.querySelector('.slider-items-container'),
    $controlsDiv = document.querySelector('.controls'),
    $sliderItemsTemplate = document.querySelector('#slider-item-template').content,
    $next = document.querySelector('.btn-next'),
    $prev = document.querySelector('.btn-prev'),
    $fragment = document.createDocumentFragment(),
    $controls = document.createElement('ul');

$controls.classList.add('controls-ul');

slidersData.forEach((s, i) => {
    $sliderItemsTemplate.querySelector('.slider-image').setAttribute('src', s.src);
    $sliderItemsTemplate.querySelector('.slider-name').textContent = s.title;

    let $dot = document.createElement('li');
    let $slide = document.importNode($sliderItemsTemplate, true);

    i == 0 ? $dot.classList.add('dot', 'active') : $dot.classList.add('dot');

    $controls.appendChild($dot);
    $fragment.appendChild($slide);
});

$controlsDiv.appendChild($controls);
$sliderItemsContainer.appendChild($fragment);

//slider funtionality

const $sliders = document.querySelectorAll('.slider-item'),
    $dots = document.querySelectorAll('.dot');

$sliders[0].classList.add('active');

$next.addEventListener('click', slider_funtionality);

$prev.addEventListener('click', slider_funtionality);

function slider_funtionality() {
    let id = this.id;
    let active;

    $sliders.forEach((s, i) => {
        if (s.classList.contains('active')) active = i;
    });

    let _next;
    let inCenter;
    let outCenter;

    if (id == 'btn-prev') {
        inCenter = 'to-left-center';
        outCenter = 'to-center-right';
        if (active == 0) {
            _next = $sliders.length - 1;
        } else {
            _next = active - 1;
        }
    } else {
        inCenter = 'to-right-center';
        outCenter = 'to-center-left';
        if (active == $sliders.length - 1) {
            _next = 0;
        } else {
            _next = active + 1;
        }
    }

    //dots style active setting
    $dots[active].classList.remove('active');
    $dots[_next].classList.add('active');

    //sliders carrousel setting
    $sliders[active].classList.remove('active');
    $sliders[active].classList.add(outCenter);

    setTimeout(function () {
        $sliders[active].classList.remove(outCenter);
    }, 1000);

    $sliders[_next].classList.add('active', inCenter);

    setTimeout(function () {
        $sliders[_next].classList.remove(inCenter);
    }, 1000);
}
