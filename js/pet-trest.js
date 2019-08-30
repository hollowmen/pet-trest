"use strict";

//New masonry object and options
var msnry = new Masonry('.grid', {
    // percentPosition: true,
    columnWidth: '.grid-sizer',
    itemSelector: '.grid-item',
    gutter: '.gutter-sizer',
});

var pets = [];
var elems = [];
var fragment = document.createDocumentFragment();

//Generate div elements and assign them the correct picture
//Then add them to the masonry object so they can be displayed
function generateElements(pets) {
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
            $('#modal-picture').html("<img height='100%' width='100%' src=" + pets[num].picture + ">");
            //set modal text to text of object
            $('#modal-text').html(getElementInfo(pets[num]));

            openModal();
        });
    }
    //adds elements to grid and masonry object
    grid.appendChild(fragment);
    msnry.appended(elems);
}

// Returns html string of all the elements properties
function getElementInfo(element) {
    return "<p>Name: " + capitalize(element.name.first) + " " + capitalize(element.name.last) + "</p>"
        + "<p>Gender: " + capitalize(element.gender) + "</p>"
        + "<p>Email: " + element.email + "</p>"
        + "<p>Address: " + capitalize(element.location.street) + ", " + capitalize(element.location.city) + ", " + capitalize(element.location.state) + " " + element.location.postcode + "</p>";
}

function getPetData() {
    //Get random user data
    $.get('https://randomuser.me/api/?results=20&nat=us&exc=login,cell,timezone,picture,registered,id').done(function (data) {
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
                pets[i].animal = "dog";
            }
            //Assign cat pictures to pets
            for (var i = data.message.length; i < length; i++) {
                pets[i].picture = getCatUrl();
                pets[i].animal = "cat";
            }
            //Shuffle Array
            shuffleArray(pets);
            //Assign array to elements on page
            generateElements(pets);
        });
    });
};

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
    modal.style.display = "flex";
}

span.onclick = function () {
    modal.style.display = "none";
};

window.onclick = function (event) {
    if (event.target === modal) {
        modal.style.display = "none";
    }
};

//function that capitalizes the first letter of every word in a string
function capitalize(str) {
    var arr = str.split(" ");
    var newArr = [];

    arr.forEach(function (element) {
        var word = element.split("");
        word[0] = word[0].toUpperCase();

        newArr.push(word.join(""));
    });

    return newArr.join(" ");
}

// Returns array of cats
function showOnlyCats(pets) {
    var temp = [];
    pets.forEach(function(e,i) {
        if (e.animal === "cat") {
            // console.log(e);
            temp.push(e);
        }
    })
    return temp;
}

// Returns array of dogs
function showOnlyDogs(pets) {
    var temp = [];
    pets.forEach(function(e,i) {
        if (e.animal === "dog") {
            // console.log(e);
            temp.push(e);
        }
    })
    return temp;
}


// Call functions
getPetData();    // loads pet data

// define cats and dogs array (for sorting)
var cats = [];
var dogs = [];

setTimeout(function() {
    var cats = showOnlyCats(pets); // saves animals that are cats into array
    var dogs = showOnlyDogs(pets); // saves animals that are dogs into array
    console.log("added cats and dogs to arrays");
}, 3000);