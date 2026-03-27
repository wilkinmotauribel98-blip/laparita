"use strict";
import { search, setSearch, sending, menuUpdate, menuClose, recalc, getState, setResetCallback, menu, main, track } from "./main.js";

const nextBtn = document.getElementById("next");
const prevBtn = document.getElementById("prev");

let index = 0;

const resetIndex = () => {
  index = 0;
  track.style.transform = "translateX(0px)";
  nextBtn.style.opacity = "1";
  nextBtn.style.transform = "translateX(0px)";
  prevBtn.style.opacity = "0";
  prevBtn.style.transform = "translateX(-200px)";
};

setResetCallback(resetIndex);

window.addEventListener("load", () => recalc());
window.addEventListener("resize", () => recalc());

menu.addEventListener("click", () => menuUpdate());

// ← único listener para cerrar menú en mobile, sin duplicar en menuUpdate
main.addEventListener("click", () => {
  const { mainWidth } = getState();
  if (!menu.classList.contains("close-menu") && mainWidth < 768) menuClose();
});

search.addEventListener("click", () => setSearch());
addEventListener("keydown", (e) => sending(e));

const trackMove = (num) => {
  const { width, limite } = getState();
  index += num;
  index = Math.max(0, Math.min(index, limite));

  if (index === limite) {
    prevBtn.style.opacity = "1";
    prevBtn.style.transform = "translateX(0px)";
    nextBtn.style.opacity = "0";
    nextBtn.style.transform = "translateX(200px)";
  } else if (index > 0) {
    nextBtn.style.opacity = "1";
    nextBtn.style.transform = "translateX(0px)";
    prevBtn.style.opacity = "1";
    prevBtn.style.transform = "translateX(0px)";
  } else {
    nextBtn.style.opacity = "1";
    nextBtn.style.transform = "translateX(0px)";
    prevBtn.style.opacity = "0";
    prevBtn.style.transform = "translateX(-200px)";
  }

  track.style.transform = `translateX(${-width * index}px)`;
};

nextBtn.addEventListener("click", () => trackMove(1));
prevBtn.addEventListener("click", () => trackMove(-1));