//! 2x :: Set speed of videos on the page.
const speed =+ prompt("speed", "2.0");
if(!speed) return;
Array.from(document.querySelectorAll("video, audio, media"))
.forEach(elem=>elem.playbackRate=speed);

//! Invert Colors :: Toggle invert page colors.
if(window.__invert_colors) {
    window.__invert_colors.remove();
    window.__invert_colors = null;
}else{
  	window.__invert_colors = document.createElement("style");
  	window.__invert_colors.appendChild(document.createTextNode(`html{filter: invert(100%);
  background: black;}`));
  	document.head.appendChild(window.__invert_colors);
}

//! Youtube Transform :: Apply css transformations to youtube videos.
document.querySelector(".html5-main-video").style.transform = "" + prompt("transform", document.querySelector(".html5-main-video").style.transform)
