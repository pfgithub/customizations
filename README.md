# bookmarklets

click and drag a link to the bookmarks bar

<a href="javascript:(function()%7Bconst%20speed%20=+%20prompt(%22speed%22,%20%222.0%22);%0Aif(!speed)%20return;%0AArray.from(document.querySelectorAll(%22video,%20audio,%20media%22))%0A.forEach(elem=%3Eelem.playbackRate=speed);%7D)()">2x</a> - Set speed of videos on the page. - `javascript:(function()%7Bconst%20speed%20=+%20prompt(%22speed%22,%20%222.0%22);%0Aif(!speed)%20return;%0AArray.from(document.querySelectorAll(%22video,%20audio,%20media%22))%0A.forEach(elem=%3Eelem.playbackRate=speed);%7D)()`

<a href="javascript:(function()%7Bif(window.__invert_colors)%20%7B%0A%20%20%20%20window.__invert_colors.remove();%0A%20%20%20%20window.__invert_colors%20=%20null;%0A%7Delse%7B%0A%20%20%09window.__invert_colors%20=%20document.createElement(%22style%22);%0A%20%20%09window.__invert_colors.appendChild(document.createTextNode(%60html%7Bfilter:%20invert(100%25);%0A%20%20background:%20black;%7D%60));%0A%20%20%09document.head.appendChild(window.__invert_colors);%0A%7D%7D)()">Invert Colors</a> - Toggle invert page colors. - `javascript:(function()%7Bif(window.__invert_colors)%20%7B%0A%20%20%20%20window.__invert_colors.remove();%0A%20%20%20%20window.__invert_colors%20=%20null;%0A%7Delse%7B%0A%20%20%09window.__invert_colors%20=%20document.createElement(%22style%22);%0A%20%20%09window.__invert_colors.appendChild(document.createTextNode(%60html%7Bfilter:%20invert(100%25);%0A%20%20background:%20black;%7D%60));%0A%20%20%09document.head.appendChild(window.__invert_colors);%0A%7D%7D)()`

## Make your own

[link](https://pfg.pw/sitepages/bookmarklet)