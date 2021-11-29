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
// I've made some changes - var→let and fixing the like/dislike ratio bar to work properly
//
// they seem to think this script will continue working indefinitely but i'm guessing that when youtube removes dislikes from the api they'll break this too


// note api ver: `https://www.googleapis.com/youtube/v3/videos?part=contentDetails,statistics&id=«video id»&key=«api key»`. I have a browser one I could put here I think
// https://console.cloud.google.com/apis/api/youtube.googleapis.com/credentials
// gives like/dislike count

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

async function waitForElm(s) {
    while (!document.querySelector(s)) {
        await new Promise(r => requestAnimationFrame(r))
    }
    return;
}

async function init() {

    try {

        const data = document.querySelector("ytd-app").data;

        for (let p = 0; p < data.response.contents.twoColumnWatchNextResults.results.results.contents.length; p++) {

            if (typeof data.response.contents.twoColumnWatchNextResults.results.results.contents[p].videoPrimaryInfoRenderer != 'undefined') {

                var vidroot = data.response.contents.twoColumnWatchNextResults.results.results.contents[p];

            }

        }

        let l;
        if (vidroot.videoPrimaryInfoRenderer.videoActions.menuRenderer.topLevelButtons[0].toggleButtonRenderer.isToggled) {

            l = parseInt(vidroot.videoPrimaryInfoRenderer.videoActions.menuRenderer.topLevelButtons[0].toggleButtonRenderer.toggledText.accessibility.accessibilityData.label.replace(/( likes|,)/g, ""));

        } else {

            l = parseInt(vidroot.videoPrimaryInfoRenderer.videoActions.menuRenderer.topLevelButtons[0].toggleButtonRenderer.defaultText.accessibility.accessibilityData.label.replace(/( likes|,)/g, ""));

        }
        const r = data.playerResponse.videoDetails.averageRating;

        function calculateDislikes(l, r) {
            var d = Math.round(l*((5-r)/(r-1)));
            return d;
        }

        let dislikes;
        if (r != 0) {

            dislikes = await calculateDislikes(l, r);

        } else {

            dislikes = 0;

        }

        const dislikesfin = numberWithCommas(dislikes)
        const likesfin = numberWithCommas(l);
        // added bonus

        if (r != 0) {

            document.querySelector("yt-formatted-string#text.ytd-toggle-button-renderer").innerHTML = likesfin;

        } else {

            document.querySelector("yt-formatted-string#text.ytd-toggle-button-renderer").innerHTML = "0";

        }

        document.querySelectorAll("yt-formatted-string#text.ytd-toggle-button-renderer")[1].innerHTML = dislikesfin;

        document.querySelector("yt-formatted-string#text.ytd-toggle-button-renderer").onmouseup = function() {
            document.querySelector("yt-formatted-string#text.ytd-toggle-button-renderer").innerHTML = "";
        }

        document.querySelectorAll("yt-formatted-string#text.ytd-toggle-button-renderer")[1].onmouseup = function() {
            document.querySelectorAll("yt-formatted-string#text.ytd-toggle-button-renderer")[1].innerHTML = "";
        }


        const sentimentPercent = l / (l + dislikes);

        document.querySelector("ytd-sentiment-bar-renderer").removeAttribute("hidden");

        document.getElementById("like-bar").setAttribute("style", "width: " + (sentimentPercent * 100) + "%;");

    } catch(e) {};

}

waitForElm("yt-formatted-string#text.ytd-toggle-button-renderer").then(() => init());

window.addEventListener('yt-page-data-updated', init, false);
