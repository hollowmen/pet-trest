"use strict";

var msnry = new Masonry('.grid', {
    percentPosition: true,
    columnWidth: '.grid-sizer',
    itemSelector: '.grid-item',
    gutter: '.gutter-sizer',
});

var elems = [];
var fragment = document.createDocumentFragment();


var dogPictures = [];

$.get("https://dog.ceo/api/breeds/image/random/50").done(function (data) {
    dogPictures = data;
    for (var i = 0; i < 50; i++) {
        var elem = getItemElement();
        elem.innerHTML += "<img height='100%' width='100%' src=" + dogPictures.message[i] + ">";
        fragment.appendChild(elem);
        elems.push(elem);
    }
    // append elements to container
    grid.appendChild(fragment);
    msnry.appended(elems);
});

function getItemElement() {
    var elem = document.createElement('div');
    var wRand = Math.random();
    var hRand = Math.random();
    var widthClass = wRand > 0.8 ? 'grid-item--width3' : wRand > 0.6 ? 'grid-item--width2' : '';
    var heightClass = hRand > 0.85 ? 'grid-item--height4' : hRand > 0.6 ? 'grid-item--height3' : hRand > 0.35 ? 'grid-item--height2' : '';

    elem.className = 'grid-item ' + widthClass + ' ' + heightClass;
    return elem;
}