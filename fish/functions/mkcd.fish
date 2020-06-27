#!/usr/bin/env fish

function mkcd
    for a in $argv
        mkdir -p $a
        set final $a
    end
    cd $final
end
