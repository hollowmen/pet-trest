'use strict';

var dogKey = "63834f22-d38c-48be-92d2-02bd8181c4a0"
var catKey = "c219c3fd-be91-4e60-af65-6f44a7337437"

// isotope
var elem = document.querySelector('.grid');
var iso = new Isotope( elem, {
  // options
  itemSelector: '.grid-item',
  layoutMode: 'fitRows'
});




// arrays to hold animal information
let animals = [];
let dogs = [];
let cats = [];




// Add to dog arrays
let addToDogs = (img) => {
  dogs.push({ "img": img });
  animals.push({"img": img, "animal": "dog" });
};

// Add to cats arrays
let addToCats = (img) => {
  cats.push({ "img": img });
  animals.push({"img": img, "animal": "cat" });
};




// element argument can be a selector string
//   for an individual element
var iso = new Isotope( '.grid', {});

let grid = document.getElementById("grid");
let spinner = document.getElementById("spinner");

let dog;
let cat;

// get dog picture
let getDogs = (num) => {
  let count = 0;

  while (count < num) {
    $.get('https://dog.ceo/api/breeds/image/random/10').done((data) => {
      dog = data;
      addToDogs(dog.message[0]);
    });
    count++
  }
};

getDogs(10);

// get cat picture
let getCats = (num) => {
  let count = 0;
  
  while (count < num) {
    $.get('https://api.thecatapi.com/v1/images/search').done((data) => {
      cat = data;
      addToCats(data[0].url);
    });
    count++;
  }
};

getCats(10);



// Shuffle array
let shuffleArray = (array) => {
  for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
  }
}








// push to page
let showOnPage = (arr) => {
  grid.innerHTML = "";
  for (let aniPic of arr) {
    grid.innerHTML += `<img class="animalPics" src="${aniPic.img}" style="width: 20%">`
    console.log(aniPic.img);
  }
  grid.style.height = "auto";
  grid.style.marginBottom = "3em";
  grid.style.borderRadius = "15px";
  spinner.style.display = "none";
}

setTimeout(() => {
  showOnPage(animals);
  console.log("showing all animals on page");
}, 3000);