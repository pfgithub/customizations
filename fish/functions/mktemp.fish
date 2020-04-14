#!/usr/bin/env fish

function mktemp
	set tmpdir (openssl rand -hex 16)
	mkcd ~/Dev/Node/temp/generated/$tmpdir/tmp
end
