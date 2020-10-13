const fs = require("fs");
const composefile = fs.readFileSync(__dirname + "/.XCompose", "utf-8");

const unkeys = {
	asciicircum: "^",
	slash: "/",
	bar: "|",
	minus: "-",
	question: "?",
	colon: ":",
	equal: "=",
	grave: "`",
	greater: ">",
	less: "<",
	underscore: "_",
	semicolon: ";",
	period: ".",
	asciitilde: "~",
	space: " ",
	exclam: "!",
	plus: "+",
};

function unkey(v) {
	if(v.length == 1) return v;
	if(!unkeys[v]) {
		console.log("Missing <"+v+">");
		unkeys[v] = "#MISSING";
	}
	return unkeys[v];
}

const result = [];
for(const line of composefile.split("\n")) {
	if(line.startsWith("##")) {
		result.push(["#", line.substring(2).trim()]);
		continue;
	}
	if(!line.startsWith("<Multi_key>")) continue;
	// also do headings in the future
	const [lhs, ...rhsall] = line.split(" : ");
	const rhs = rhsall.join(" : ").match(/^"(.*)".*#?.*$/)[1];
	const keyentries = lhs.match(/<[A-Za-z0-9_]+>/g);
	const thisentry = [];
	result.push(["⎄", rhs, thisentry]);
	for(const item of keyentries) {
		const v = item.substring(1, item.length - 1);
		if(v === "Multi_key") continue;
		thisentry.push(unkey(v));
	}
}

fs.writeFileSync(__dirname+"/../docs/x/keysdata.js", "const data = [\n" + result.map(l => "    " + JSON.stringify(l)).join(",\n") + "\n]", "utf-8");