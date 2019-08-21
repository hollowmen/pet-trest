"use strict";

//New masonry object and options
var msnry = new Masonry('.grid', {
    percentPosition: true,
    columnWidth: '.grid-sizer',
    itemSelector: '.grid-item',
    gutter: '.gutter-sizer',
});

var pets = [];
var elems = [];
var fragment = document.createDocumentFragment();

//Generate div elements and assign them the correct picture
//Then add them to the masonry object so they can be displayed
function generateElements() {
    for (var i = 0; i < pets.length; i++) {
        //Create a new element
        var elem = getItemElement();

        //Add picture to element
        elem.innerHTML += "<img height='100%' width='100%' src=" + pets[i].picture + ">";

        //add element to fragment and element collection
        fragment.appendChild(elem);
        elems.push(elem);

        //Add listener to each element
        elems[i].addEventListener('click', function () {
            var num = 0;
            //Find the object that was clicked on
            for (var j = 0; j < pets.length; j++) {
                if (this.innerHTML.indexOf(pets[j].picture) !== -1) {
                    num = j;
                }
            }
            //set modal picture to picture of object
            document.getElementById('modal-picture').innerHTML = "<img height='100%' width='100%' src=" + pets[num].picture + ">";
            //set modal text to text of object
            document.getElementById('modal-text').innerHTML = "";
            document.getElementById('modal-text').innerHTML
                += "<p>Name: " + pets[num].name.first + " " + pets[num].name.last + "</p>"
                + "<p>Gender: " + pets[num].gender + "</p>"
                + "<p>Email: " + pets[num].email + "</p>"
                + "<p>Address: " + pets[num].location.street + ", " + pets[num].location.city + ", " + pets[num].location.state + " " + pets[num].location.postcode
                + "</p>";

            openModal();
        });
    }
    //adds elements to grid and masonry object
    grid.appendChild(fragment);
    msnry.appended(elems);
}

//Get random user data
$.ajax({
    url: 'https://randomuser.me/api/?results=20&exc=login,cell,timezone,picture,registered,id',
    dataType: 'json',
    success: function (data) {
        //Assign random JSON to pets array
        var length = data.results.length;
        for (var i = 0; i < length; i++) {
            pets.push(data.results[i]);
        }
        //Get dog pictures
        $.get("https://dog.ceo/api/breeds/image/random/10").done(function (data) {
            //Assign dog pictures to pets
            for (var i = 0; i < data.message.length; i++) {
                pets[i].picture = data.message[i];
            }
            //Assign cat pictures to pets
            for (var i = data.message.length; i < length; i++) {
                pets[i].picture = getCatUrl();
            }
            //Shuffle Array
            shuffleArray(pets);
            //Assign array to elements on page
            generateElements();
        });
    }
});

//Return a random url of a cat picture
function getCatUrl() {
    var urlbase = "https://cataas.com/cat?";
    var randnum = Math.floor(Math.random() * 1000);
    var url = urlbase.concat(randnum.toString());
    return url;
}

//Creates a div element with random height and width
function getItemElement() {
    var elem = document.createElement('div');
    var wRand = Math.random();
    var hRand = Math.random();
    var widthClass = wRand > 0.99 ? 'grid-item--width3' : wRand > 0.9 ? 'grid-item--width2' : '';
    var heightClass = hRand > 0.85 ? 'grid-item--height4' : hRand > 0.6 ? 'grid-item--height3' : hRand > 0.35 ? 'grid-item--height2' : '';

    elem.className = 'grid-item ' + widthClass + ' ' + heightClass;
    return elem;
}

//Array shuffling algo
function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

//Code for modal to open and close
var modal = document.getElementById("myModal");
var span = document.getElementsByClassName("close")[0];

function openModal() {
    modal.style.display = "block";
}

span.onclick = function () {
    modal.style.display = "none";
};

window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
};