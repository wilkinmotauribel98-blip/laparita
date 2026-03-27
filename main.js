const track = document.querySelector(".track");
const slider = document.querySelector(".slider");
const main = document.querySelector(".main");
const mainContainer = document.querySelector(".main-container");
const menu = document.querySelector(".menu");
const genreContainer = document.querySelector(".genre-container");
const form = document.querySelector(".form");
const searcher = document.querySelector(".searcher");
const search = document.querySelector(".search");

let trackWidth, mainWidth, sliderWidth, width, limite, bluer, background;
let w = 220;
let onRecalc = () => {};

export const setResetCallback = (fn) => { onRecalc = fn; };

export const menuClose = () => {
  menu.classList.add("close-menu");
  genreContainer.style.width = "0px";
  menu.innerHTML = "arrow_right_alt";
  if (!main) return;                          // ← guard
  main.style.filter = "blur(0px)";
  if(mainWidth >= 768){
  main.style.marginLeft = "0px";
  main.style.width = "100%";
  mainContainer.style.padding ="0px"
  }
  mainContainer.style.backgroundColor = "#111822";
};

export const getSizes = () => ({
  trackWidth: track?.getBoundingClientRect().width ?? 0,   // ← guard null
  mainWidth: (main?.getBoundingClientRect().width ?? 0) + 15,
  sliderWidth: slider?.getBoundingClientRect().width ?? 0  // ← guard null
});

export const menuUpdate = () => {
  if (menu.classList.contains("close-menu")) {
    const containerWidth = mainWidth < 768 ? "100%" : "300px";
    genreContainer.style.width = containerWidth;
    menu.classList.remove("close-menu");
    menu.innerHTML = "menu";

    if (!main) return;
    if(mainWidth >= 768 ){
      main.style.width = `calc(100% - ${w}px)`;
      main.style.marginLeft = `${w}px`;
      mainContainer.style.padding ="15px"
    
    }

    if (mainWidth < 768) {
      main.style.filter = bluer ?? "blur(5px)";              // ← fallback si bluer es undefined
      mainContainer.style.backgroundColor = background ?? "#ffffff26"; // ← fallback
    }
  } else {
    menuClose();
  }
};
export const recalc = () => {
  ({ trackWidth, mainWidth, sliderWidth } = getSizes());

  if (mainWidth < 400) {
    width = (trackWidth - sliderWidth) / 4;
    limite = 4;
    w = 0;
    menu.style.display = "flex";
    bluer = "blur(5px)";
    background = "#ffffff26";
    if (!menu.classList.contains("close-menu")) menuClose();
  } else if (mainWidth < 768) {
    width = (trackWidth - sliderWidth) / 5;
    limite = 5;
    w = 0;
    menu.style.display = "flex";
    bluer = "blur(5px)";
    background = "#ffffff26";
    if (!menu.classList.contains("close-menu")) menuClose();
  } else if (mainWidth < 1024) {
    width = (trackWidth - sliderWidth) / 3;
    limite = 3;
    w = 220;
    bluer = "blur(0px)";
    background = "#111822";
    menu.style.display = "flex";
    menuClose();
  } else {
    width = (trackWidth - sliderWidth) / 2;
    limite = 2;
    w = 220;
    menu.style.display = "none";
    bluer = "blur(0px)";
    background = "#111822";
    menuClose();
  }

  onRecalc();
};

export const setSearch = () => {
  searcher.classList.toggle("close");
  if (searcher.classList.contains("close")) {
    searcher.focus();
    search.innerHTML = "cancel"
  }
  else{
    search.innerHTML = "search"
  }
  form.classList.toggle("container");
};

export const sending = (e) => {
  if (e.key === "Enter" && searcher.classList.contains("close")) {
    document.querySelector(".send-button").click();
  }
};

export const getState = () => ({ width, limite, mainWidth, w });
export { menu, main, track, searcher, search, form,mainContainer };