console.log("search field");

let searchIcon = document.getElementById("search-icon");
let searchInputDiv = document.getElementById("input-field");

// click on search icon, expands search field
searchIcon.addEventListener("mouseover", () => {
  searchInputDiv.style.transition = "width .2s ease-in-out";
  searchInputDiv.style.width = "100px";
})

// focus out of search field, div collapses
searchInputDiv.addEventListener("focusout", () => {
  setTimeout(() => {
    searchInputDiv.style.width = "0px";
  }, 1500);
});

