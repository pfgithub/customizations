const fs = require("fs");
const composefile = "\n\n" + fs.readFileSync(__dirname + "/.XCompose", "utf-8") + "\n\n## Builtin\n\n" + fs.readFileSync("/usr/share/X11/locale/en_US.UTF-8/Compose", "utf-8");
const unicodedata = fs.readFileSync(__dirname + "/deps/UnicodeData.txt", "utf-8");

const codepoint_to_name = [];
for(const codepointname of unicodedata.split("\n")) {
	if(!codepointname.trim()) continue;
	const [codepoint, name, general_category, combining_class, bidi_class, decomposition_type, decomposition_mapping,
		numeric_type, numeric_value, bidi_mirrored, unused, iso_comment, simple_uppercase_mapping, simple_lowercase_mapping,
		simple_titlecase_mapping] = codepointname.trim().split(";");
	codepoint_to_name[parseInt(codepoint, 16)] = name;
}

// xev to get the key name for a new key
// for line in (cat keylist); xdotool type \"$line\":" "\"; xdotool key $line quotedbl comma Return; end;
// xdotool key Greek_upsilon; copytxt (read -n 1)
const unkeys = require("./unkeys.js");

function unkey(v) {
	if(v.length == 1) return v;
	if(v.startsWith("U")) {
		const codepoint = parseInt(v.substring(1), 16);
		if(!isNaN(codepoint) && v.toUpperCase().endsWith(codepoint.toString(16).toUpperCase())) {
			return String.fromCodePoint(codepoint);
		}
	}
	if(v.startsWith("KP_")) return "<Keypad "+v.substring(3)+">";
	if(!unkeys[v]) {
		if(!v.startsWith("dead_")) console.log(""+v+"");
		unkeys[v] = "#<"+v+">";
	}
	return unkeys[v];
}

const result = [];
for(const line of composefile.split("\n")) {
	if(line.startsWith("##")) {
		result.push(["#", line.substring(2).trim()]);
		continue;
	}
	if(line.trim().startsWith("#")) {
		const commenttext = line.substring(1);
		const prevresult = result[result.length - 1];
		if(prevresult[0] === "//") prevresult.push(commenttext);
		else result.push(["//", commenttext]);
		continue;
	}
	if(!line.trim()) continue;
	if(line.trim().startsWith("#")) continue;
	if(!line.startsWith("<")) continue;
	// also do headings in the future
	const [lhs, ...rhsall] = line.split(":");
	const rhs = JSON.parse(rhsall.join(" : ").trim().match(/^(".*").*$/)[1]);
	const keyentries = lhs.trim().match(/<[A-Za-z0-9_]+>/g);
	const thisentry = [];
	for(const item of keyentries) {
		const v = item.substring(1, item.length - 1);
		thisentry.push({symbol: unkey(v), name: v});
	}
	const prevresult = result[result.length - 1];
	if(prevresult && prevresult[0] === "⎄" && prevresult[1].char === rhs) {
		prevresult.push(thisentry);
	}else{
		const codepoint = rhs.codePointAt();
		const name = codepoint_to_name[codepoint] || "#UNKNOWN";
		result.push(["⎄", {char: rhs, codepoint, name}, thisentry]);
	}
}

fs.writeFileSync(__dirname+"/../docs/x/keysdata.js", "const data = [\n" + result.map(l => "    " + JSON.stringify(l)).join(",\n") + "\n]", "utf-8");