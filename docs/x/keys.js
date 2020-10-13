const keyspec = [["䷑", "H", "a", "A"]];

const html = uhtml.html;

function reducer(t, k) {
	if(t[t.length - 1]) {
		const lastchar = t[t.length - 1] + k;
		if(lastchar.match(/^[A-Za-z0-9]+$/)) {
			t[t.length - 1] = lastchar;
			return t;
		}
	}
	t.push(k);
	return t;
}

function displaykey(key) {
	if(key === " ") return html`<kbd class="light">⎵</kbd>`;
	return html`<kbd>${key}</kbd>`;
}

function keycard({char, codepoint, name}, ...keysets) {const uchar = `${codepoint.toString(16).padStart(4, "0").toUpperCase()}`; return html`
	<div class="previewbox">
		<div class="info"><a title=${name} href=${"http://www.fileformat.info/info/unicode/char/"+uchar+"/index.htm"}>U+${uchar}</a></div>
		<input type="text" title=${name} value=${char} class="largepreview" readonly />
		${keysets.map(keys => html`<div class="sequence">${keys.reduce(reducer, []).map(displaykey)}</div>`)}
	</div>
`}

function keydata([kind, ...args]) {
	if(kind === "⎄") {
		return keycard(...args);
	}else if(kind === "#") {
		return html`<h1>${args[0]}</h1>`;
	}else {
		console.log("Unexpected `"+kind+"`");
		return html`a`;
	}
}

uhtml.render(document.body, html`
	${data.map(keydata)}
`);