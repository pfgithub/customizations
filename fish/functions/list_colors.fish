function list_colors
    echo
    for color in (set_color -c)
        echo -n "  "
        for col2 in (set_color -c)
            echo -n (set_color $col2 --background $color)" x"
        end
        echo -n " "
        echo -n (set_color normal)"  "(set_color --background $color)"  "(set_color normal)"  "
        echo -n (set_color $color)"set_color "$color(set_color normal)
        echo -n (string repeat -n (math 10 - (string length $color)) ' ') ' '
        echo -n (set_color brwhite)'"'(set_color brgreen)
        echo -n (string replace -a (echo -ne '\x1b') (set_color brblue)'\\x1b'(set_color brgreen) (set_color $color))
        echo (set_color brwhite)"\""(set_color normal)
    end
    echo
end
