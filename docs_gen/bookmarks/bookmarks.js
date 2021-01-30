//! 2x :: Set speed of videos on the page. 1 click = 2x, 2 click = 1.5x, 3+ click = prompt
const defaults="____defaults*(__2.0_1.5__)____".split("_").filter(w=>+w);
if(window.__2x_click_time + 200 < Date.now() || !window.__2x_state) window.__2x_state = 0;
window.__2x_click_time = Date.now();
if(window.__is_prompting) return;
window.__is_prompting = true;
const speed = defaults[window.__2x_state] ||+ prompt("speed", "2.0");
window.__is_prompting = false;
window.__2x_state += 1;
if(!speed) return;
Array.from(document.querySelectorAll("video, audio, media"))
.forEach(elem=>elem.playbackRate=speed);
const notif = document.createElement("div");
notif.setAttribute("style", "position: fixed; z-index: 10000000000000000; top: 0; left: 0;"
+"background-color: black; color: white; padding: 10px;");
notif.innerText = "" + speed + "x";
document.body.appendChild(notif);
setTimeout(() => notif.remove(), 200);

//! Invert Colors :: Toggle invert page colors.
if(window.__invert_colors) {
    window.__invert_colors.remove();
    window.__invert_colors = null;
}else{
  	window.__invert_colors = document.createElement("style");
  	window.__invert_colors.appendChild(document.createTextNode(`html{filter: invert(100%) hue-rotate(180deg) contrast(90%);
  background: #0d0d0d;} img{filter: invert(100%) hue-rotate(180deg);}`));
  	document.head.appendChild(window.__invert_colors);
}

//! Youtube Transform :: Apply css transformations to youtube videos.
document.querySelector(".html5-main-video").style.transform = "" + prompt("transform", document.querySelector(".html5-main-video").style.transform)

//! Quora Signupwall :: Remove the quora signup wall
{
const signupwall = Array.from(document.querySelectorAll("div")).filter(q => q.id.endsWith("_signup_wall_wrapper"))[0];
signupwall.remove();
document.querySelector(".signup_wall_prevent_scroll").classList.remove("signup_wall_prevent_scroll");
}
