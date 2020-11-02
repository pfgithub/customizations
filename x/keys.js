const html = uhtml.html;

function reducer(t, k) {
	if(t[t.length - 1]) {
		const lastchar = (t[t.length - 1]).symbol + k.symbol;
		if(lastchar.match(/^[A-Za-z0-9]+$/)) {
			t[t.length - 1].symbol = lastchar;
			t[t.length - 1].name = undefined;
			return t;
		}
	}
	t.push(k);
	return t;
}

function displaykey(key) {
	if(key.symbol === " ") return html`<span class="light">⎵</span>`;
	if(key.symbol === "\u00a0") return html`<span class="light" style="position: relative"><span style="position: absolute">+</span>⎵</span>`;
	return html`<span>${key.symbol}</span>`;
}

function keycard({char, codepoint, name}, ...keysets) {const uchar = `${codepoint.toString(16).padStart(4, "0").toUpperCase()}`; return html`
	<div class="previewbox">
		<div class="info"><a title=${name} href=${"http://www.fileformat.info/info/unicode/char/"+uchar+"/index.htm"}>U+${uchar}</a></div>
		<input type="text" title=${name} value=${char} class="largepreview" readonly />
		${keysets.map(keys => html`<div class="sequence">${keys.reduce(reducer, []).map(key => html`<kbd title=${key.name}>${displaykey(key)}</kbd>`)}</div>`)}
	</div>
`}

let current_heading = undefined;

function keydata([kind, ...args], i) {
	const fragment = document.createDocumentFragment();
	if(kind === "⎄") {
		uhtml.render(fragment, keycard(...args));
	}else if(kind === "#") {
		const details = {};
		uhtml.render(fragment, html`<details ref=${details}><summary>${args[0]}</summary></details>`);
		current_heading = details.current;
	}else if(kind === "//") {
		uhtml.render(fragment, html`<pre class="commentblock">${args.join("\n")}</pre>`);
	}else {
		console.log("Unexpected `"+kind+"`");
		uhtml.render(fragment, html`error unexpected ${kind}`);
	}
	if(kind === "#" || !current_heading) {
		document.body.appendChild(fragment);
	}else{
		current_heading.appendChild(fragment);
	}
}


const fragment = document.createDocumentFragment();
uhtml.render(fragment, html`<p>Generated from <a href="https://github.com/pfgithub/customizations/blob/master/x/.XCompose">my .XCompose file</a>.</p>`);
document.body.appendChild(fragment);
(async () => {
	for(const keyinfo of data) {
		keydata(keyinfo);
		if(keyinfo[0] === "#") await new Promise(r => setTimeout(r, 0));
	}
	document.getElementById("loadingdeleteme").remove();
})()
