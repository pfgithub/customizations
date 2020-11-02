const fs = require("fs");

const bmfile = fs.readFileSync(__dirname + "/bookmarks.js", "utf-8");

var resfile = `# bookmarklets

click and drag a link to the bookmarks bar`;

for(const line of bmfile.split("//!")) {
	if(!line.trim()) continue;
	const [title, ...rest] = line.split("\n");
	const code = "javascript:"+encodeURI("(function(){"+rest.join("\n").trim()+"})()");
	const [name, desc] = title.split("::").map(q => q.trim());
	resfile += "\n\n" + "<a href=\""+code+"\""+">"+name+"</a> - "+desc+" - `"+code+"`";
}

resfile += `

## Make your own

[link](https://pfg.pw/sitepages/bookmarklet)`;

fs.writeFileSync(__dirname+"/../../docs/README.md", resfile, "utf-8");