// ==UserScript==
// @name         YouTube Restore Dislike Counters
// @version      1.0.0
// @description  A userscript to restore the dislike counts on YouTube. Not 100% accurate all the time, but stil pretty accurate.
// @author       syndiate
// @match        *://www.youtube.com/*
// @run_at       document_start
// ==/UserScript==

// this script was made by u/SyndiateRedditPoster on reddit and it's pretty neat - it gets dislike count without doing any api requests because
// the data is already stored in-memory and is easy to access.
// https://thread.pfg.pw/reddit/r/youtube/comments/qtyn45/i_coded_a_userscript_to_restore_the_dislike/
//
// also using an updated version by u/Lussu97 that uses more modern js stuff & is nicer
//
// they seem to think this script will continue working indefinitely but i'm guessing that when youtube removes dislikes from the api they'll break this too

// note api ver: `https://www.googleapis.com/youtube/v3/videos?part=contentDetails,statistics&id=«video id»&key=«api key»`. I have a browser one I could put here I think
// https://console.cloud.google.com/apis/api/youtube.googleapis.com/credentials
// gives like/dislike count

//1st method
window.addEventListener('DOMNodeInserted', checkButton);
function checkButton(e) {
    if (e.target.id == "button") {
        init();
        window.removeEventListener('DOMNodeInserted', checkButton);
    }
}

//2nd method
window.addEventListener('yt-page-data-updated', init, false);

function init() {
    console.log("init()ing");
    let data = document.querySelector("ytd-app").data;
    if(data.response.contents.twoColumnWatchNextResults == undefined) return;
    let contents = data.response.contents.twoColumnWatchNextResults.results.results.contents;
    let vidroot;
    for (let p = 0; p < contents.length && typeof (vidroot = contents[p]).videoPrimaryInfoRenderer == 'undefined'; p++);
    let ratio = data.playerResponse.videoDetails.averageRating;
    let percent = (ratio - 1) * 25;
    let likes = Number(vidroot.videoPrimaryInfoRenderer.videoActions.menuRenderer.topLevelButtons[0].toggleButtonRenderer.toggledText.accessibility.accessibilityData.label.replace(/[^0-9]/g, '')) - 1;
    let dislikes = Math.round(4 * likes / (ratio - 1)) - likes;
    let bts = document.querySelectorAll("yt-formatted-string#text.ytd-toggle-button-renderer");
    bts[1].innerHTML = FormatNumber(dislikes);
    document.querySelector("ytd-sentiment-bar-renderer").removeAttribute("hidden");
    document.getElementById("like-bar").setAttribute("style", "width: " + Math.round(percent) + "%;");
    //document.getElementById("sentiment").setAttribute("style", "width: " +
    //    bts[0].parentElement.getBoundingClientRect().width +
    //    bts[1].parentElement.getBoundingClientRect().width + 12) + "px;";
}

function FormatNumber(value) {
    return Intl.NumberFormat('en-US', { notation: 'compact' }).format(value);
}
