"use strict";
import { search, setSearch, sending, menu, menuUpdate, recalc,mainContainer,menuClose } from "../main.js";
const temporadas = document.querySelectorAll(".temporada");
const episodios = document.querySelectorAll(".episodios")
menu.addEventListener("click", () => menuUpdate());
window.addEventListener("load", () => recalc());
window.addEventListener("resize", () => recalc());
search.addEventListener("click", () => setSearch());
addEventListener("keydown", (e) => sending(e));
mainContainer.addEventListener("click",()=>menuClose())

temporadas.forEach(e => {
  e.addEventListener("click",()=>{
    temporadas.forEach(c =>{
      c.style.backgroundColor = "transparent";
      c.style.opacity = "1";
    })
    e.style.backgroundColor = "#7e22ce";
    e.style.opacity = ".8";
    
    let i = e.classList[1]
    episodios.forEach(e => e.style.display = "none");

    document.querySelector(`.t${i}`).style.display = "flex";
  })
});




