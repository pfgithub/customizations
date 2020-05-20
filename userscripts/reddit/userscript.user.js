// ==UserScript==
// @name         Reddit Old Scroll
// @namespace    https://pfg.pw/
// @version      0.1
// @description  try to take over the world!
// @author       pfg
// @match        https://old.reddit.com/*
// @grant        none
// ==/UserScript==

if (!window.__RedditOldScrollCallback) {
  window.__RedditOldScrollCallback = e => {
    let temp0 = e.currentTarget;
    if (temp0.getBoundingClientRect().top < 0) {
      temp0.scrollIntoView();
    }
  };
}
setInterval(() => {
  let expands = document.querySelectorAll(".expand");
  expands.forEach(expand => {
    expand.removeEventListener("click", window.__RedditOldScrollCallback);
    expand.addEventListener("click", window.__RedditOldScrollCallback);
  });
}, 1000);

function isModifiedEvent(event) {
  return !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);
}

let modalZIndex = 100000;

let css = a => a[0];
let styl = css`
  .midcol {
    margin-left: 15px !important;
  }
  .comment {
    position: relative;
  }
  .expand {
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    background-color: #eee;
  }
  .expand:active {
    background-color: #f9f9f9;
  }

  .__pfg_RedditModalExitArea {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.6);
    transition: 0.1s transform, 0.1s opacity;
    opacity: 1;
    display: grid;
    grid-template-columns: 1fr [center] calc(100vw - 50px) 1fr;
  }
  .__pfg_RedditModalClosing {
    transform: scale(0.5, 0.5);
    opacity: 0;
  }
  .__pfg_RedditModaliFrame {
    grid-column: center;
    background-color: #fff;
    background: url(https://cdn.dribbble.com/users/277263/screenshots/4547788/kite-3-loading-spinner.gif)
      no-repeat center;
  }
  .__pfg_RedditOldButton {
    cursor: pointer;
  }
  .__pfg_RedditOldButton:hover {
    text-decoration: underline;
  }
  .__pfg_RedditOldButton:focus {
    text-decoration: underline;
  }
`;
let cssel = document.createElement("style");
cssel.appendChild(document.createTextNode(styl));
document.head.appendChild(cssel);

let currentPos = 0;
let modalHistory = [{}];

function sendPushHistory(url) {
  window.parent.postMessage({ action: "__pfg_RedditOpenPage", url });
}

function sendPopHistory() {
  window.parent.postMessage({ action: "__pfg_RedditClosePage" });
}

window.addEventListener("message", e => {
  console.log("__pfg_LogMessage Recieved Message containing", e.data);
  if (e.data.action === "__pfg_RedditOpenPage") {
    if (
      e.data.url.match(/\/r\/[^\/]+?\/$/) ||
      e.data.url === location.origin ||
      e.data.url === location.origin + "/"
    ) {
      location.href = e.data.url;
      return;
    }
    showModaliFrame(e.data.url, true);
  }
  if (e.data.action === "__pfg_RedditClosePage") {
    if (currentPos > 0) {
      history.back();
    }
  }
});

window.addEventListener("popstate", event => {
  console.log(event);
  let index = event.state ? event.state.index : 0;
  if (!index) {
    index = 0;
  }
  console.log(
    "__pfg_LogMessage Attempting to move from history position " +
      currentPos +
      " to " +
      index
  );
  if (index === currentPos) {
    console.log("__pfg_LogMessage No changes necessary.");
    console.log("__pfg_LogMessage Done with history position", currentPos);
    return;
  }
  if (index < currentPos) {
    let closeCount = currentPos - index;
    console.log(
      "__pfg_LogMessage Modal closing necessary. Closing " +
        closeCount +
        " modals."
    );
    for (let i = 0; i < closeCount; i++) {
      modalHistory[currentPos--].close();
      console.log("__pfg_LogMessage POP! goes the modal.");
    }
    console.log("__pfg_LogMessage Done with history position", currentPos);
    return;
  }
  if (index > currentPos) {
    let openCount = index - currentPos;
    console.log(
      "__pfg_LogMessage Modal opening necessary. Opening " +
        openCount +
        " modals."
    );
    for (let i = 0; i < openCount; i++) {
      showModaliFrame(modalHistory[currentPos + 1].url, false);
      console.log("__pfg_LogMessage Opened! modal.");
    }
    console.log("__pfg_LogMessage Done with history position", currentPos);
    return;
  }
  console.log("__pfg_LogMessage history is in a strange place...");
  console.log("__pfg_LogMessage Done with history position", currentPos);
});

function showModaliFrame(url, needsPush) {
  let index = ++currentPos;
  if (needsPush) {
    console.log("__pfg_LogMessage Pushing state", { url, index });
    history.pushState({ url, index }, "unused", url);
  }
  let modal = document.createElement("div");
  modal.classList.add("__pfg_RedditModalExitArea");
  modal.style.zIndex = modalZIndex;
  let iframe = document.createElement("iframe");
  iframe.classList.add("__pfg_RedditModaliFrame");
  iframe.src = url;
  modal.appendChild(iframe);
  document.documentElement.appendChild(modal);
  // todo add escape key listener
  let closeThis = () => {
    console.log("__pfg_LogMessage Closing modal...");
    modal.classList.add("__pfg_RedditModalClosing");
    setTimeout(() => modal.remove(), 100);
  };
  modalHistory[index] = { close: closeThis, url };
  modal.addEventListener("click", e => {
    e.stopPropagation();
    sendPopHistory();
  });
  iframe.addEventListener("click", e => {
    e.stopPropagation();
  });
}

document.addEventListener("keydown", e => {
  if (e.key === "Escape") {
    sendPopHistory();
  }
});

setInterval(() => {
  document.querySelectorAll("a").forEach(a => {
    if (a.classList.contains("__pfg_RedditModified")) {
      return;
    }
    a.classList.add("__pfg_RedditModified");
    if (a.href.startsWith("javascript:")) {
      a.removeAttribute("href");
      a.classList.add("__pfg_RedditOldButton");
      return;
    }
    let ahref = a.href;
    if (ahref.startsWith("/")) {
      ahref = location.origin + ahref;
    }
    if (!ahref.startsWith(location.origin)) {
      return;
    }
    a.addEventListener("click", e => {
      if (
        !event.defaultPrevented && // onClick prevented default
        event.button === 0 && // ignore everything but left clicks
        (!a.target || a.target === "_self") && // let browser handle "target=_blank" etc.
        !isModifiedEvent(event) // ignore clicks with modifier keys
      ) {
        event.preventDefault();
        sendPushHistory(ahref);
      }
    });
  });
}, 1000);
