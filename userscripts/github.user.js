// TODO userscript
// for profile pages

Array.from(document.querySelectorAll(".ContributionCalendar-day")).forEach(item => {
    if(item.width.baseVal.value === 11) {

        item.width.baseVal.value += 4;
        item.height.baseVal.value += 4;
        item.x.baseVal.value -= 2;
        item.y.baseVal.value -= 2;
        
    }

    item.rx.baseVal.value = 0;
    item.ry.baseVal.value = 0;
});
