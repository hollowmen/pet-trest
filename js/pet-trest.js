"use strict";

var msnry = new Masonry('.grid', {
    percentPosition: true,
    columnWidth: '.grid-sizer',
    itemSelector: '.grid-item',
    gutter: '.gutter-sizer',
});

var gridItems = document.getElementsByClassName("grid-item");

setTimeout(function () {
    for (var i = 0; i < gridItems.length; i++) {
        getDog();
        gridItems[i].innerHTML += "<img height='100%' width='100%' src=" + str + ">";
    }
}, 2000);

window.onload = () => {
    // document.getElementById('getUserData').addEventListener('click', fetchUserData);
};

// fetch('https://jsonplaceholder.typicode.com/todos/1')
//   .then(response => response.json())
//   .then(json => console.log(json))

let payload;

var fetchUserData = () => {
    console.log("fetching data");
    fetch('https://jsonplaceholder.typicode.com/todos/1')
        .then(response => response.json())
        .then(json => {
            payload = json,
                console.log(payload)
        })
}

var log = () => {
    console.log("logging to console");
}

var catImageURL;
var catPayload;

// Get cat picture
function getCat() {
    function ajax_get(url, callback) {

        // Create ajax request to get image
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                // console.log('responseText:' + xmlhttp.responseText);
                try {
                    var data = JSON.parse(xmlhttp.responseText);
                } catch (err) {
                    console.log(err.message + " in " + xmlhttp.responseText);
                    return;
                }
                callback(data);
            }
        };

        xmlhttp.open("GET", url, true);
        xmlhttp.send();
    }

    // recieve data
    ajax_get('https://api.thecatapi.com/v1/images/search?size=full', function (data) {
        // document.getElementById("cat-id").innerHTML = data[0]["id"];
        // document.getElementById("cat-url").innerHTML = data[0]["url"];
        //
        // // Parse data to be printed to page
        // var html = '<img src="' + data[0]["url"] + '">';
        //
        // // print image tag to page.
        // document.getElementById("cat-image").innerHTML = html;
    });
};


// Get dog image
var str;

function getDog() {
    function ajax_get(url, callback) {
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                // console.log('responseText:' + xmlhttp.responseText);
                try {
                    var data = JSON.parse(xmlhttp.responseText);
                } catch (err) {
                    console.log(err.message + " in " + xmlhttp.responseText);
                    return;
                }
                callback(data);
            }
        };

        xmlhttp.open("GET", url, true);
        xmlhttp.send();
    }

    ajax_get('https://api.thedogapi.com/v1/images/search?size=full', function (data) {
        str = data[0]["url"];
        // document.getElementById("dog-id").innerHTML = data[0]["id"];
        // document.getElementById("dog-url").innerHTML = data[0]["url"];
        //
        // var html = '<img src="' + data[0]["url"] + '">';
        // document.getElementById("dog-image").innerHTML = html;
    });
}

$.get("https://api.thedogapi.com/v1/images/search?size=full").done(function(data) {
    console.log(data); // si is the equivalent to metric units
});

// Call cat and dog functions
getCat();
getDog();