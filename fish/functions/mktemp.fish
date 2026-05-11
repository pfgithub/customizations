#!/usr/bin/env fish

function mktemp
    set tmpdir (openssl rand -hex 16)
    mkcd ~/Temp/generated/$tmpdir/tmp
end
