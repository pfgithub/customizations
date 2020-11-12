#!/usr/bin/env fish

echo (date -u +"%Y-%m-%dT%H:%M:%S%Z") $argv >> ~/Logs/xdg.log

set av1 $argv[1]

if not test $av1
    set av1 "__NO_LINK__"
end

if yad --info --text $av1 --button Close:1 --button Copy:0
    copytxt $av1
end
echo
