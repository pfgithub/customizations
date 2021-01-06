// ==UserScript==
// @name         FileFormat.info copy character
// @namespace    https://pfg.pw/
// @version      0.2
// @description  add a quick textfield to copy characters
// @author       pfg
// @match        *://*.fileformat.info/*
// @grant        none
// ==/UserScript==

(() => {
  let v = String.fromCodePoint(
    +document
      .evaluate(
        "/html/body/div[4]/div/div/table[4]/tbody/tr[9]/td[2]",
        document,
        null,
        XPathResult.FIRST_ORDERED_NODE_TYPE,
        null
      )
      .singleNodeValue.textContent.trim()
      .split(",")
      .join("")
  );
  let q = document.evaluate(
    "/html/body/div[4]/div/div/ul/li[1]/a/img",
    document,
    null,
    XPathResult.FIRST_ORDERED_NODE_TYPE,
    null
  ).singleNodeValue;
  let input = document.createElement("textarea");
  input.value = v;
  input.style.fontSize = "28px";
  q.parentNode.parentNode.appendChild(input);
})();
