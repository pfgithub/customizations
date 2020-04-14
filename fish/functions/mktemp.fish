#!/usr/bin/env fish

function mktemp
	set tmpdir (openssl rand -base64 12)
	mkdir ~/Dev/Node/temp/generated/$tmpdir
	cd ~/Dev/Node/temp/generated/$tmpdir
end
