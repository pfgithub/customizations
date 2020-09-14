function vflag
    for flnm in $argv
        set splits (string match -r "^( *)(.*)\$" $flnm)
        set color $splits[3]
        echo $splits[2](set_color --background $color)(string repeat -n 25 " ")(set_color normal)
    end
end
