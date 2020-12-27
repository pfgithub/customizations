// ==UserScript==
// @name         Reddit Old Scroll
// @namespace    https://pfg.pw/
// @version      0.1
// @description  try to take over the world!
// @author       pfg
// @match        https://*.reddit.com/*
// @grant        none
// ==/UserScript==

/////////////////////////////////////////////////////////////////

// disabled because reddit doesn't work properly within an iframe
(() => {
const ENABLE_PWA = false;

if(!window.__RedditOldScrollCallback){
    window.__RedditOldScrollCallback = (e) => {
        let temp0 = e.currentTarget;
        const topv = temp0.getBoundingClientRect().top;
        const heightv = document.getElementById("header").clientHeight + 10;
        if(topv < heightv) { temp0.scrollIntoView(); document.documentElement.scrollTop -= heightv; }
    };
}
setInterval(() => {
    let expands = document.querySelectorAll(".expand");
    expands.forEach(expand => {expand.removeEventListener("click", window.__RedditOldScrollCallback); expand.addEventListener("click", window.__RedditOldScrollCallback);});
}, 1000);

function isModifiedEvent(event) {
  return !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);
}



async function fetchDuplicates() {
    // note that this will fail for the subreddit r/comments oops
    const dpurl = location.href.replace("/comments/", "/duplicates/") + ".json";
    return await (await fetch(dpurl)).json();
}

function mka(text, href) {
    const link = document.createElement("a");
    link.setAttribute("href", href);
    link.appendChild(document.createTextNode(text));
    return link;
}

if(window.____is____details) window.____is____details.remove();
const linkinfo_area = document.querySelector(".side > .spacer > .linkinfo");
if(linkinfo_area) {(async () => {
    const details = document.createElement("details");
    window.____is____details = details;

    const summary = document.createElement("summary");
    summary.appendChild(document.createTextNode("… Duplicates"));
    details.appendChild(summary);
    linkinfo_area.appendChild(details);

    details.appendChild(mka("View All", location.href.replace("/comments/", "/duplicates/")));

    const duplicates = await fetchDuplicates();
    const children = duplicates[1].data.children;
    summary.innerText = children.length + " Duplicate"+(children.length == 1 ? "" : "s");

    const ul = document.createElement("ul");
    details.appendChild(ul);
    for(const {data} of children) {
        console.log(data);

        const li = document.createElement("li");
        ul.appendChild(li);

        if(data.score_hidden) li.appendChild(document.createTextNode("[---] "))
        else li.appendChild(document.createTextNode("["+(data.score>0?"+":"")+data.score+"] "));

        li.appendChild(mka(data.title, data.permalink));

        li.appendChild(document.createTextNode(" — "));

        li.appendChild(mka(data.subreddit_name_prefixed, "/"+data.subreddit_name_prefixed));
    }
})()}



let modalZIndex = 1000000;

let css = document.createElement("style");
css.appendChild(document.createTextNode(`
.comment {
  position: relative;
}
.comment .expand {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 10px;
  font-size: 0;
  color: transparent !important;

  width: 15px;
  padding: 0;

  background: linear-gradient(to right, transparent 40%, #eee 40%, #eee 60%, transparent 60%);

  top: 40px;
}
.commentarea > div > .comment > .entry > .tagline > .expand {
  top: 50px;
}
.commentarea > div > .comment.collapsed > .entry > .tagline > .expand {
  top: 10px;
}
.comment.collapsed > .entry > .tagline > .expand {
  top: 0;
}
.comment .expand:hover{
  background: linear-gradient(to right, transparent 40%, #aaa 40%, #aaa 60%, transparent 60%);
}
.comment.collapsed > .entry > .tagline > .expand {
  background: rgba(0, 0, 0, 0) url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAANBAMAA`
+`ACAxflPAAAAJFBMVEUaGhtPvP8hMz5AkcI+i7srUGcfLDRJrOk0aosvW3coSFwxY4GN0McTAAAARUlEQVQI12NgYFANYg`
+`CBZEFBMyDFVigoKJ7AwMAsKOEoaMDAoCgo6SgoxMAQKOLV4igKpKUnrWwUhYnD1MH0wc2BmIsAAGr+CwVdeNphAAAAAEl`
+`FTkSuQmCC') no-repeat scroll center center;
}

.__pfg_RedditModalExitArea{
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: rgba(0,0,0,0.6);
    transition: 0.1s transform, 0.1s opacity;
    opacity: 1;
}
.__pfg_RedditModalClosing{
    transform: scale(0.5, 0.5);
    opacity: 0;
}
.__pfg_RedditModaliFrame{
    width: 100%;
    height: 100%;
    border: none;
}
.__pfg_RedditModaliFrame.__pfg_Loading{
    background: url(https://i.gifer.com/SjyG.gif) no-repeat center !important;
}
.__pfg_RedditOldButton{
    cursor: pointer;
}
.__pfg_RedditOldButton:hover{
    text-decoration: underline;
}
.__pfg_RedditOldButton:focus{
    text-decoration: underline;
}
body.__pfg_InnerFrame{
    background-color: transparent;
}
body.__pfg_InnerFrame > * {
    background-color: rgb(24, 26, 27);
}
html.__pfg_HideVerticalOverflow {
    overflow-y: hidden;
}
`));
document.head.appendChild(css);

if(window.parent) {
    document.body.classList.add("__pfg_InnerFrame");
    document.body.addEventListener("click", e => {
        if(e.target === document.body) {
            sendPopHistory();
        }
    });
    document.body.addEventListener("keydown", (e) => {
        if(e.key === "Escape") {
            e.preventDefault();
            e.stopPropagation();
            sendPopHistory();
        }
    });
}

let currentPos = 0;
let modalHistory = [{}];

function sendPushHistory(url){
    window.parent.postMessage({action:"__pfg_RedditOpenPage",url});
}

function sendUpdateHistory(url){
    window.parent.postMessage({action:"__pfg_RedditUpdateURL",url});
}

function sendPopHistory(){
    window.parent.postMessage({action:"__pfg_RedditClosePage"});
}

window.addEventListener("message", e => {
    console.log("__pfg_LogMessage Recieved Message containing",e.data);
    if(e.data.action === "__pfg_RedditOpenPage"){
        if(e.data.url.match(/\/r\/[^\/]+?\/$/) || e.data.url === location.origin || e.data.url === location.origin + "/"){
             location.href = e.data.url;
             return;
        };
        showModaliFrame(e.data.url, true);
    }
    if(e.data.action === "__pfg_RedditUpdateURL"){
        let url = e.data.url;
        let index = currentPos;
        history.replaceState({url, index}, "unused", url);
    }
    if(e.data.action === "__pfg_RedditClosePage"){
        if(currentPos > 0){
            history.back();
        }
    }
});

window.addEventListener('popstate', (event) => {
    console.log(event);
    let index = event.state ? event.state.index : 0;
    if(!index){
        index = 0;
    }
    console.log("__pfg_LogMessage Attempting to move from history position "+(currentPos)+" to "+index);
    if(index === currentPos){
        console.log("__pfg_LogMessage No changes necessary.");
        console.log("__pfg_LogMessage Done with history position",currentPos);
        return;
    }
    if(index < currentPos){
        let closeCount = currentPos - index;
        console.log("__pfg_LogMessage Modal closing necessary. Closing "+closeCount+" modals.");
        for(let i = 0; i < closeCount; i++){
            modalHistory[currentPos--].close();
            console.log("__pfg_LogMessage POP! goes the modal.");
        }
        console.log("__pfg_LogMessage Done with history position",currentPos);
        return;
    }
    if(index > currentPos){
        let openCount = index - currentPos;
        console.log("__pfg_LogMessage Modal opening necessary. Opening "+openCount+" modals.");
        for(let i = 0; i < openCount; i++){
            showModaliFrame(modalHistory[currentPos+1].url, false);
                console.log("__pfg_LogMessage Opened! modal.");
        }
        console.log("__pfg_LogMessage Done with history position",currentPos);
        return;
    }
    console.log("__pfg_LogMessage history is in a strange place...");
    console.log("__pfg_LogMessage Done with history position",currentPos);
});

function showModaliFrame(url, needsPush){
    let index = ++currentPos;
    if(needsPush){
        console.log("__pfg_LogMessage Pushing state",{url,index});
        history.pushState({url, index}, "unused", url);
    }
    let modal = document.createElement("div");
    modal.classList.add("__pfg_RedditModalExitArea");
    modal.style.zIndex = modalZIndex;
    let iframe = document.createElement("iframe");
    iframe.classList.add("__pfg_RedditModaliFrame");
    iframe.classList.add("__pfg_Loading");
    iframe.src = url;
    iframe.onload = () => iframe.classList.remove("__pfg_Loading");
    modal.appendChild(iframe);
    document.documentElement.appendChild(modal);
    document.documentElement.classList.add("__pfg_HideVerticalOverflow");

    let closeThis = () => {
        console.log("__pfg_LogMessage Closing modal...");
        modal.classList.add("__pfg_RedditModalClosing");
        setTimeout(() => modal.remove(), 100);
        document.documentElement.classList.remove("__pfg_HideVerticalOverflow");
    };
    modalHistory[index] = ({close: closeThis, url});
    modal.addEventListener("click", (e) => {e.stopPropagation();sendPopHistory()});
    iframe.addEventListener("click", e => {e.stopPropagation();})
}

setInterval(() => {
    document.querySelectorAll("a").forEach(a => {
        if(a.classList.contains("__pfg_RedditModified")){return;}
        a.classList.add("__pfg_RedditModified");
        if(a.href.startsWith("javascript:")){
        	a.removeAttribute("href");
            a.classList.add("__pfg_RedditOldButton");
        	return;
        }
        let ahref = a.href;
        if(ahref.startsWith("/")) {
            ahref = location.origin + ahref;
        }
        if(ahref.startsWith("https://giphy.com/gifs/")) {
            const children = Array.from(a.childNodes);
            if(children.length === 1 && children[0].tagName.toLowerCase() === "img") {
                a.replaceChild(document.createTextNode("[embedded gif]"), children[0]);
            }
        }
        if(!ahref.startsWith(location.origin)){return;}
        a.addEventListener("click", e => {
            if(!ENABLE_PWA) return;
            if (
                !event.defaultPrevented && // onClick prevented default
                event.button === 0 && // ignore everything but left clicks
                (!a.target || a.target === "_self") && // let browser handle "target=_blank" etc.
                !isModifiedEvent(event) // ignore clicks with modifier keys
            ) {
                if(new URL(ahref).pathname === location.pathname){
                    sendUpdateHistory(ahref);
                    return;
                } // eg. changing query string
                event.preventDefault();
                sendPushHistory(ahref);
            }
        });
    });
}, 1000);
})()
