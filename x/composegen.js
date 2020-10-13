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
	backslash: "\\",
	comma: ",",
	quotedbl: "\"",
	apostrophe: "'",
	parenleft: "(",
	parenright: ")",
	numbersign: "#",
	bracketleft: "[",
	bracketright: "]",
	braceleft: "{",
	braceright: "}",
	division: "÷", // idk what key this is
	diaeresis: "¨",
	asterisk: "*",
	includedin: "⊂",
	includes: "⊃",
	"percent": "%",
	"Cyrillic_ES": "с",
	"Cyrillic_IE": "е",
	"Cyrillic_ZE": "з",
	"Cyrillic_ze": "з",
	"Cyrillic_pe": "п",
	"Cyrillic_a": "а",
	"Cyrillic_EN": "н",
	"Cyrillic_o": "о",
	"Cyrillic_O": "о",
	"underbar": "_",
	"acute": "´",
	"cedilla": "¸",
	"macron": "¯",
	"breve": "˘",
	"udiaeresis": "ü",
	"Adiaeresis": "ä",
	"adiaeresis": "ä",
	"AE": "æ",
	"ae": "æ",
	"EZH": "Ʒ",
	"ezh": "ʒ",
	"Aring": "å",
	"aring": "å",
	"Ooblique": "ø",
	"oslash": "ø",
	"Odiaeresis": "ö",
	"odiaeresis": "ö",
	"Otilde": "õ",
	"otilde": "õ",
	"Greek_ALPHA": "α",
	"Greek_EPSILON": "ε",
	"Greek_ETA": "η",
	"Greek_IOTA": "ι",
	"Greek_OMICRON": "ο",
	"Greek_UPSILON": "υ",
	"Greek_OMEGA": "ω",
	"Greek_iotadieresis": "ϊ",
	"Greek_iota": "ι",
	"Greek_accentdieresis": "#<Greek_accentdieresis>",
	"Greek_alpha": "α",
	"Greek_epsilon": "ε",
	"Greek_eta": "η",
	"Greek_upsilondieresis": "ϋ",
	"Greek_upsilon": "υ",
	"Greek_omicron": "ο",
	"Greek_omega": "ω",
	"Cyrillic_GHE": "г",
	"Ukrainian_I": "і",
	"Cyrillic_KA": "к",
	"Cyrillic_I": "и",
	"Cyrillic_U": "у",
	"Cyrillic_i": "и",
	"Cyrillic_ie": "е",
	"Cyrillic_ghe": "г",
	"Ukrainian_i": "і",
	"Cyrillic_ka": "к",
	"Cyrillic_u": "у",
	"Cyrillic_ZHE": "ж",
	"Cyrillic_zhe": "ж",
	"Cyrillic_A": "а",
	"Cyrillic_E": "э",
	"Cyrillic_e": "э",
	"Cyrillic_CHE": "ч",
	"Cyrillic_che": "ч",
	"Cyrillic_YERU": "ы",
	"Cyrillic_yeru": "ы",
	"Arabic_alef": "ا",
	"Arabic_waw": "و",
	"Arabic_yeh": "ي",
	"Ccedilla": "Ç",
	"ccedilla": "ç",
	"Emacron": "Ē",
	"emacron": "ē",
	"Idiaeresis": "Ï",
	"idiaeresis": "ï",
	"Omacron": "Ō",
	"omacron": "ō",
	"Sacute": "Ś",
	"sacute": "ś",
	"Scaron": "Š",
	"scaron": "š",
	"Utilde": "Ũ",
	"utilde": "ũ",
	"Umacron": "Ū",
	"umacron": "ū",
	"Acircumflex": "Â",
	"acircumflex": "â",
	"Abreve": "Ă",
	"abreve": "ă",
	"Ecircumflex": "Ê",
	"ecircumflex": "ê",
	"Ocircumflex": "Ô",
	"ocircumflex": "ô",
	"Ohorn": "Ơ",
	"ohorn": "ơ",
	"Uhorn": "Ư",
	"uhorn": "ư",
	"Greek_alphaaccent": "ά",
	"Greek_etaaccent": "ή",
	"Greek_rho": "ρ",
	"Greek_RHO": "ρ",
	"Greek_omegaaccent": "ώ",
	"leftarrow": "←",
	"rightarrow": "→",
	"approximate": "≅",
	"identical": "≡",
	"leftcaret": "<",
	"rightcaret": ">",
	"lessthanequal": "≤",
	"greaterthanequal": "≥",
	"leftshoe": "⊂",
	"rightshoe": "⊃",
	"righttack": "⊢",
	"hebrew_yod": "י",
	"hebrew_shin": "ש",
	"hebrew_aleph": "א",
	"hebrew_bet": "ב",
	"hebrew_beth": "ב",
	"hebrew_gimel": "ג",
	"hebrew_gimmel": "ג",
	"hebrew_dalet": "ד",
	"hebrew_daleth": "ד",
	"hebrew_he": "ה",
	"hebrew_waw": "ו",
	"hebrew_zain": "ז",
	"hebrew_zayin": "ז",
	"hebrew_tet": "ט",
	"hebrew_teth": "ט",
	"hebrew_finalkaph": "ך",
	"hebrew_kaph": "כ",
	"hebrew_lamed": "ל",
	"hebrew_mem": "מ",
	"hebrew_nun": "נ",
	"hebrew_samech": "ס",
	"hebrew_samekh": "ס",
	"hebrew_finalpe": "ף",
	"hebrew_pe": "פ",
	"hebrew_zade": "צ",
	"hebrew_zadi": "צ",
	"hebrew_kuf": "ק",
	"hebrew_qoph": "ק",
	"hebrew_resh": "ר",
	"hebrew_taf": "ת",
	"hebrew_taw": "ת",
	"Cyrillic_er": "р",
	"Cyrillic_ER": "р",
	Multi_key: "⎄",
};

function unkey(v) {
	if(v.length == 1) return v;
	if(v.startsWith("U")) {
		const codepoint = parseInt(v.substring(1), 16);
		if(!isNaN(codepoint)) return String.fromCodePoint(codepoint);
	}
	if(v.startsWith("KP_")) return "<Keypad "+v.substring(3)+">";
	if(!unkeys[v]) {
		if(!v.startsWith("dead_") && !v.startsWith("kana_")) console.log(""+v+"");
		unkeys[v] = "#<"+v+">";
	}
	return unkeys[v];
}

const result = [];
mflp: for(const line of composefile.split("\n")) {
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
	const rhs = rhsall.join(" : ").trim().match(/^"(.*)".*$/)[1];
	const keyentries = lhs.trim().match(/<[A-Za-z0-9_]+>/g);
	const thisentry = [];
	for(const item of keyentries) {
		const v = item.substring(1, item.length - 1);
		thisentry.push({symbol: unkey(v), name: v});
		// for now
		if(unkey(v).startsWith("#<dead_")) continue mflp;
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