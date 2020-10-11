// ==UserScript==
// @name         Shapecatcher Fix
// @namespace    https://pfg.pw/
// @version      0.1
// @description  Make shapecatcher usable
// @author       You
// @match        https://shapecatcher.com/
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
setInterval(() => {

Array.from(document.querySelectorAll(".detail_character_unicode")).forEach(itm => {

const text = itm.textContent;
const input = document.createElement("input");
input.value = text;
itm.parentNode.replaceChild(input, itm);

});

}, 1_000)

    // Your code here...
})();
