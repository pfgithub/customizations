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

function keydata([kind, ...args], i) {
	if(kind === "⎄") {
		return keycard(...args);
	}else if(kind === "#") {
		return html`<h1>${args[0]}</h1>`;
	}else if(kind === "//") {
		return html`<pre class="commentblock">${args.join("\n")}</pre>`;
	}else {
		console.log("Unexpected `"+kind+"`");
		return html`a`;
	}
}

for(const keyinfo of data) {
	const fragment = document.createDocumentFragment();
	uhtml.render(fragment, keydata(keyinfo));
	document.body.appendChild(fragment);
}