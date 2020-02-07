window.__style && window.__style.remove();
window.__style = document.createElement("style");

window.__style.appendChild(document.createTextNode(`
:root{
--background-modifier-hover: rgba(79,84,92,0);
--background-mentioned-hover: rgba(250,166,26,0.05);
--background-message-hover: rgba(4,4,5,0.0);
}

.compact-T3H92H{
padding-top: 0;
padding-bottom: 0;
}

.groupStart-23k01U{
margin-top: 0.5rem;
}

.buttons-cl5qTG.container-3npvBV{
display: none;
}
`));
document.head.appendChild(window.__style);
