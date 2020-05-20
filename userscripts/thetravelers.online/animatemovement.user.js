// ==UserScript==
// @name         animate movement
// @namespace    https://pfg.pw/
// @version      0.1
// @description  animate movement in the travelers
// @author       pfg
// @match        https://thetravelers.online/
// @grant        none
// ==/UserScript==

(async () => {
  window.styleElem && window.styleElem.remove();
  window.interval && clearInterval(window.interval);

  window.styleElem = document.createElement("style");
  let transPercentMap = { "-": "-100%", "=": "0", "+": "100%" };
  window.styleElem.appendChild(
    document.createTextNode(
      `
#world-box{
overflow: hidden !important;
}
.worldtile[style="font-weight:bold;"] {
animation: none !important;
transform: none !important;
}
.nogo .worldtile{
animation-duration: 0s !important;
}
` +
        [
          ["upleft", "-", "-"],
          ["up", "=", "-"],
          ["upright", "+", "-"],
          ["left", "-", "="],
          ["right", "+", "="],
          ["downleft", "-", "+"],
          ["down", "=", "+"],
          ["downright", "+", "+"]
        ]
          .map(
            ([name, x, y]) => `

.go_${name} .worldtile{
transform: translate(${transPercentMap[x]}, ${transPercentMap[y]});
animation: go_${name} 1.0s forwards;
}
@keyframes go_${name}{
0%{
transform: translate(${transPercentMap[x]}, ${transPercentMap[y]});
}
100%{
transform: translate(0, 0);}
}

`
          )
          .join("\n")
    )
  );
  document.head.appendChild(window.styleElem);

  let ms = ms => new Promise(r => setTimeout(r, ms));

  let worldBox = document.getElementById("world-box");
  worldBox.setAttribute("class", "");

  let prevDir = "upleft";

  let setDir = newDir => {
    console.log("going", newDir);
    worldBox.classList.remove("go_" + prevDir);
    prevDir = newDir;
    worldBox.classList.add("nogo");
    worldBox.classList.add("go_" + prevDir);
    setTimeout(() => worldBox.classList.remove("nogo"), 1000);
  };

  window.interval = setInterval(() => {
    ["nw", "n", "ne", "w", "e", "sw", "s", "se"]
      .map(q => [
        q,
        q
          .split("")
          .map(c => ({ w: "left", n: "up", e: "right", s: "down" }[c]))
          .join("")
      ])
      .forEach(([arrow, dir]) => {
        let arrowElem = document.getElementById("arrow-" + arrow);
        if (arrowElem.classList.contains("active")) {
          if (dir !== prevDir) {
            setDir(dir);
          }
        }
      });
  }, 100);

  setDir("upleft");

  await ms(1000);
  // worldBox.classList.remove("go_upleft");
})();
