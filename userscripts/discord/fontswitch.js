{const vconfig = () => {

// mkbtn("Name", "Font");
mkbtn("English", "Whitney");
mkbtn("toki-pona", "Linja Pona");
mkbtn("toki pona", "sitelen-pona");

};
window.buttonarea && window.buttonarea.remove();
const buttonarea = document.createElement("div");
window.buttonarea = buttonarea;
const ttl = document.querySelector("#app-mount > div.app-1q1i1E > div > div.layers-3iHuyZ.layers-3q14ss > div > div > nav > div.scroller-2TZvBN.none-2Eo-qx.scrollerBase-289Jih > div:nth-child(2)");
ttl.appendChild(buttonarea);
const mkbtn = (txt, ffmly, onev) => {
const btn = document.createElement("button");
btn.textContent = txt;
btn.style.fontFamily = ffmly;
buttonarea.appendChild(btn);
btn.addEventListener("click", () => {
    document.body.style.fontFamily = ffmly;
});
};
vconfig();
}
