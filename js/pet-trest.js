"use strict";

var msnry = new Masonry('.grid', {
    percentPosition: true,
    columnWidth: '.grid-sizer',
    itemSelector: '.grid-item',
    gutter: '.gutter-sizer',
});

var elems = [];
var fragment = document.createDocumentFragment();

$.get("https://dog.ceo/api/breeds/image/random/50").done(function (data) {
    for (var i = 0; i < 50; i++) {
        var elem = getItemElement();
        elem.innerHTML += "<img height='100%' width='100%' src=" + getCatUrl() + ">";
        fragment.appendChild(elem);
        elems.push(elem);
    }
    for (var i = 0; i < 50; i++) {
        var elem = getItemElement();
        elem.innerHTML += "<img height='100%' width='100%' src=" + data.message[i] + ">";
        fragment.appendChild(elem);
        elems.push(elem);
    }
    shuffleArray(elems);
    grid.appendChild(fragment);
    msnry.appended(elems);
});

function getCatUrl() {
    var urlbase = "https://cataas.com/cat?";
    var randnum = Math.floor(Math.random() * 1000);
    var url = urlbase.concat(randnum.toString());
    return url;
}

function getItemElement() {
    var elem = document.createElement('div');
    var wRand = Math.random();
    var hRand = Math.random();
    var widthClass = wRand > 0.99 ? 'grid-item--width3' : wRand > 0.9 ? 'grid-item--width2' : '';
    var heightClass = hRand > 0.85 ? 'grid-item--height4' : hRand > 0.6 ? 'grid-item--height3' : hRand > 0.35 ? 'grid-item--height2' : '';

    elem.className = 'grid-item ' + widthClass + ' ' + heightClass;
    return elem;
}

/**
 * Randomize array element order in-place.
 * Using Durstenfeld shuffle algorithm.
 */
function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}