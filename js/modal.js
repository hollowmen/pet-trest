console.log("modal");

let modalBg = document.getElementById("modal-bg");
let modal = document.getElementById("modal");
let clickedImg;
let animalPicture = document.getElementsByClassName("animalPics");


let displayModal = () => {
  grid.addEventListener("click", (e) => {
    // console.log(e.target.getAttribute("src"));
    clickedImg = e.target.getAttribute("src");
    modalBg.style.visibility = "visible";
    modalBg.style.opacity = ".4"
    modalBg.style.transition = "opacity 0.5s, visible .5s linear";
    // console.log("img was clicked");

    modalBg.addEventListener("click", () => {
      modalBg.style.visibility = "hidden";
      modalBg.style.opacity = "0";
      modalBg.style.transition = "opacity .5s, visible .5s linear";
      displayModal();
    })

  });
}

displayModal();