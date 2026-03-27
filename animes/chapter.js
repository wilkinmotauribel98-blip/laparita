"use strict";
import { search, setSearch, sending, menu, menuUpdate, recalc,menuClose,mainContainer } from "../main.js";

menu.addEventListener("click", () => menuUpdate());
window.addEventListener("load", () => recalc());
window.addEventListener("resize", () => recalc());
search.addEventListener("click", () => setSearch());
addEventListener("keydown", (e) => sending(e));
mainContainer.addEventListener("click",()=>menuClose())