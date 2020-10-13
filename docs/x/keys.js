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

function keycard(result, keys) {return html`
	<div class="previewbox">
		<input type="text" value="${result}" class="largepreview" readonly />
		<div class="sequence"><kbd>⎄</kbd>${keys.reduce(reducer, []).map(key => html`<kbd>${key}</kbd>`)}</div>
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