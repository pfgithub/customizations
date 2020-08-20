// ==UserScript==
// @name         animate movement
// @namespace    https://pfg.pw/
// @version      1.0
// @description  animate movement in the travelers
// @author       pfg
// @match        https://thetravelers.online/
// @grant        none
// ==/UserScript==

{

window.el = (nme) => document.createElement(nme);
window.txt = (txt) => document.createTextNode(txt);
Node.prototype.attr = function(atrs) {Object.entries(atrs).forEach(([k, v]) => this.setAttribute(k, v)); return this;};
Node.prototype.adto = function(prnt) {prnt.appendChild(this); return this;};
Node.prototype.adch = function(chld) {this.appendChild(chld); return this;};
Node.prototype.atxt = function(txta) {this.appendChild(txt(txta)); return this;};
Node.prototype.onev = function(evnm, cb) {this.addEventListener(evnm, cb); return this;};
Node.prototype.clss = function(clss) {clss.split(".").filter(q => q).map(itm => this.classList.add(itm)); return this;};
function raw(string) {
	return { __raw: "" + string };
}
function templateGenerator(helper) {
    return (strings, ...values) => {
        if (!strings.raw && !Array.isArray(strings)) {
            return helper(strings);
        }
        const result = [];
        strings.forEach((str, i) => {
            result.push(raw(str), i in values ? values[i] : "");
        });
        return result
            .map(el =>
            typeof el.__raw === "string"
                ? el.__raw
                : helper(el),
            )
            .join("");
    };
}
const css = templateGenerator(a => ""+a);
const html = templateGenerator(a => ""+a);

const ccnaamr = v => v === -1 ? "a" : v === 1 ? "b" : v === 2 ? "e" : v === -2 ? "f" : v === 0 ? "c" : "u";
const ccnme = (dx, dy) => "goX"+ccnaamr(dx)+"Y"+ccnaamr(dy);

if(window.styleElem) window.styleElem.remove();
window.styleElem = el("style").atxt(css`
/*#world-box {
    transform: rotate3d(10, 0, 0, 25deg);
}
.mid-screencontainer.scrollbar {
    perspective: 800px;
}*/

#world-box{
    overflow: hidden !important;
}
.worldtile.is-you {
    animation: none !important;
    transform: none !important;
}
` + [[-1, -1], [-1, 0], [-1, 1], [0, 1], [0, -1], [1, -1], [1, 0], [1, 1],
     [-2, -2], [-2, 0], [-2, 2], [0, 2], [0, -2], [2, -2], [2, 0], [2, 2]].map(([dx, dy]) => css`
    .run-animation.${ccnme(dx, dy)} .worldtile{
        transform: translate(${dx * 100}%, ${dy * 100}%);
        animation: ${ccnme(dx, dy)} 0.5s forwards;
    }
    @keyframes ${ccnme(dx, dy)} {
        0% {
            transform: translate(${dx * 100}%, ${(-dy) * 100}%);
        }
        100% {
            transform: translate(0, 0);
        }
    }
`).join("\n")).adto(document.head);


if(window.existingbuild) WORLD.build = window.existingbuild;
window.existingbuild = WORLD.build;
var oldPos = {x: YOU.x || 0, y: YOU.y || 0};
WORLD.build = () => {
    const newPos = {x: YOU.x, y: YOU.y};
    const diff = {x: newPos.x - oldPos.x, y: newPos.y - oldPos.y};
    oldPos = newPos;

	window.existingbuild.call(WORLD);
	let count = 0;
	for (let i = -1 * WORLD.gridRadius; i <= WORLD.gridRadius; i++) {
		for (let j = -1 * WORLD.gridRadius; j <= WORLD.gridRadius; j++) {
			const thisTile = WORLD.tilemap[count];
			thisTile.classList.remove("is-you");

			if (i === 0 && j === 0) {
				thisTile.classList.add("is-you");
			}

			count++;
		}
	}

    window.existingbuild.call(WORLD);

    WORLD.boxElem.className = "";
    void WORLD.boxElem.offsetWidth;
    WORLD.boxElem.classList.add("run-animation");
    WORLD.boxElem.classList.add(ccnme(diff.x, diff.y));
};


}
