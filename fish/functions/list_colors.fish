function list_colors;
    for color in (set_color -c)
        for col2 in (set_color -c)
            echo -n (set_color $col2 --background $color)"x "
        end
        echo -n (set_color normal)"  "(set_color --background $color)"  "(set_color normal)"  "
        echo (set_color $color)"set_color "$color(set_color normal)
    end
end
