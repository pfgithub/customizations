# bookmarklets

click and drag a link to the bookmarks bar

<a href="javascript:(function()%7Bconst%20defaults=%22defaults(__2.0_1.5__)%22.split(%22_%22).filter(w=%3E+w);%0Aif(window.__2x_click_time%20+%201000%20%3C%20Date.now()%20%7C%7C%20!window.__2x_state)%20window.__2x_state%20=%200;%0Awindow.__2x_click_time%20=%20Date.now();%0Aconst%20speed%20=%20defaults%5Bwindow.__2x_state%5D%20%7C%7C+%20prompt(%22speed%22,%20%222.0%22);%0Awindow.__2x_state%20+=%201;%0Aif(!speed)%20return;%0AArray.from(document.querySelectorAll(%22video,%20audio,%20media%22))%0A.forEach(elem=%3Eelem.playbackRate=speed);%0Aconst%20notif%20=%20document.createElement(%22div%22);%0Anotif.setAttribute(%22style%22,%20%22position:%20fixed;%20z-index:%2010000000000000000;%20top:%200;%20left:%200;%22%0A+%22background-color:%20black;%20color:%20white;%20padding:%2010px;%22);%0Anotif.innerText%20=%20%22%22%20+%20speed%20+%20%22x%22;%0Adocument.body.appendChild(notif);%0AsetTimeout(()%20=%3E%20notif.remove(),%20200);%7D)()">2x</a> - Set speed of videos on the page. 1 click = 2x, 2 click = 1.5x, 3+ click = prompt - `javascript:(function()%7Bconst%20defaults=%22defaults(__2.0_1.5__)%22.split(%22_%22).filter(w=%3E+w);%0Aif(window.__2x_click_time%20+%201000%20%3C%20Date.now()%20%7C%7C%20!window.__2x_state)%20window.__2x_state%20=%200;%0Awindow.__2x_click_time%20=%20Date.now();%0Aconst%20speed%20=%20defaults%5Bwindow.__2x_state%5D%20%7C%7C+%20prompt(%22speed%22,%20%222.0%22);%0Awindow.__2x_state%20+=%201;%0Aif(!speed)%20return;%0AArray.from(document.querySelectorAll(%22video,%20audio,%20media%22))%0A.forEach(elem=%3Eelem.playbackRate=speed);%0Aconst%20notif%20=%20document.createElement(%22div%22);%0Anotif.setAttribute(%22style%22,%20%22position:%20fixed;%20z-index:%2010000000000000000;%20top:%200;%20left:%200;%22%0A+%22background-color:%20black;%20color:%20white;%20padding:%2010px;%22);%0Anotif.innerText%20=%20%22%22%20+%20speed%20+%20%22x%22;%0Adocument.body.appendChild(notif);%0AsetTimeout(()%20=%3E%20notif.remove(),%20200);%7D)()`

<a href="javascript:(function()%7Bif(window.__invert_colors)%20%7B%0A%20%20%20%20window.__invert_colors.remove();%0A%20%20%20%20window.__invert_colors%20=%20null;%0A%7Delse%7B%0A%20%20%09window.__invert_colors%20=%20document.createElement(%22style%22);%0A%20%20%09window.__invert_colors.appendChild(document.createTextNode(%60html%7Bfilter:%20invert(100%25);%0A%20%20background:%20black;%7D%60));%0A%20%20%09document.head.appendChild(window.__invert_colors);%0A%7D%7D)()">Invert Colors</a> - Toggle invert page colors. - `javascript:(function()%7Bif(window.__invert_colors)%20%7B%0A%20%20%20%20window.__invert_colors.remove();%0A%20%20%20%20window.__invert_colors%20=%20null;%0A%7Delse%7B%0A%20%20%09window.__invert_colors%20=%20document.createElement(%22style%22);%0A%20%20%09window.__invert_colors.appendChild(document.createTextNode(%60html%7Bfilter:%20invert(100%25);%0A%20%20background:%20black;%7D%60));%0A%20%20%09document.head.appendChild(window.__invert_colors);%0A%7D%7D)()`

<a href="javascript:(function()%7Bdocument.querySelector(%22.html5-main-video%22).style.transform%20=%20%22%22%20+%20prompt(%22transform%22,%20document.querySelector(%22.html5-main-video%22).style.transform)%7D)()">Youtube Transform</a> - Apply css transformations to youtube videos. - `javascript:(function()%7Bdocument.querySelector(%22.html5-main-video%22).style.transform%20=%20%22%22%20+%20prompt(%22transform%22,%20document.querySelector(%22.html5-main-video%22).style.transform)%7D)()`

## Make your own

[link](https://pfg.pw/sitepages/bookmarklet)