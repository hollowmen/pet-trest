// test script
console.log("test js file");


// Get cat picture
function getCat() {
  function ajax_get(url, callback) {
    
    // Create ajax request to get image
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
      if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        console.log('responseText:' + xmlhttp.responseText);
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
  ajax_get('https://api.thecatapi.com/v1/images/search?size=full', function(data) {
    document.getElementById("cat-id").innerHTML = data[0]["id"];
    document.getElementById("cat-url").innerHTML = data[0]["url"];

    // Parse data to be printed to page
    var html = '<img src="' + data[0]["url"] + '">';

    // print image tag to page.
    document.getElementById("cat-image").innerHTML = html;
  });
};



// Get dog image
function getDog() {
  function ajax_get(url, callback) {

    // create ajax request to get image
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
      if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        console.log('responseText:' + xmlhttp.responseText);
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
  ajax_get('https://api.thedogapi.com/v1/images/search?size=full', function(data) {
    document.getElementById("dog-id").innerHTML = data[0]["id"];
    document.getElementById("dog-url").innerHTML = data[0]["url"];

    // parse data to be printed to page
    var html = '<img src="' + data[0]["url"] + '">';

    // print image to page
    document.getElementById("dog-image").innerHTML = html;
  });
}

// Call cat and dog functions
getCat();
getDog();
