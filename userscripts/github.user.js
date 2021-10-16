{
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

if(window.__c_style) window.__c_style.remove();
window.__c_style = document.createElement("style");
window.__c_style.textContent = `
.ContributionCalendar.days-selected .ContributionCalendar-day.active {
    outline: 2px solid yellow;
	outline-offset: -2px;
}
.ContributionCalendar.days-selected .ContributionCalendar-day {
    opacity: 1;
}
.ContributionCalendar-day[data-level="0"] {
	opacity: 0 !important;
}
`;
document.head.appendChild(window.__c_style);
}
