// ==UserScript==
// @name         Musescore Comment Helper
// @namespace    https://pfg.pw/
// @version      0.1
// @description  MuseScore Comment Helper
// @author       pfg
// @match        *://musescore.org/*
// @grant        none
// ==/UserScript==
{
  let scripted = Array.from(document.querySelectorAll(".__scripted"));
  for (let scripte of scripted) scripte.remove();

  let elc = (el, cn, at) => {
    let elm = document.createElement(el);
    elm.className = cn.split(".").join(" ") + " __scripted";
    at.appendChild(elm);
    return elm;
  };

  let css = a => a[0];
  let styl = css`
    .indented {
      position: relative;
    }
    .__collapse_btn {
      position: absolute;
      top: 0;
      left: 0;
      width: 10px;
      margin: 0;
      padding: 0;
      bottom: -3px;
      background-color: #aaa;
    }
    .indented > .__collapse_btn {
      left: -25px;
      top: -27px;
      border-radius: 0 0 2px 2px;
    }
    .comment > .__collapse_btn {
      top: 50px;
      border-radius: 2px 2px 0 0;
    }
    .__collapse_btn.__full,
    .comment.__collapsed > .__collapse_btn {
      border-radius: 2px 2px 2px 2px;
    }

    .__collapsed > .comment-content > .content {
      display: none;
    }
    .__collapsed > .comment-avatar {
      display: none;
    }
    .comment.__collapsed > .__collapse_btn {
      top: 0;
    }
    .comment.__collapsed {
      padding-left: 20px;
    }
    .indented.__collapsed {
      display: none;
    }
  `;
  elc("style", "", document.head).appendChild(document.createTextNode(styl));

  let comments = Array.from(document.querySelectorAll(".comment"));
  for (let comment of comments) {
    let btn = elc("button", ".__collapse_btn", comment);
    // find indented
    // add button also
    let indt = comment.nextSibling.nextSibling;
    let indented = indt && indt.classList.contains("indented") ? indt : null;

    let toggleCollapse = () => {
      comment.classList.toggle("__collapsed");
      indented && indented.classList.toggle("__collapsed");
      if (comment.getBoundingClientRect().top < 67) {
        comment.scrollIntoView();
        document.documentElement.scrollTop -= 67;
      }
    };

    if (indented) {
      let ibtn = elc("button", ".__collapse_btn", indented);
      ibtn.onclick = () => toggleCollapse();
    } else {
      btn.classList.add("__full");
    }
    btn.onclick = () => toggleCollapse();
  }
}
