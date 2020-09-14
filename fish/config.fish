source ~/.config/fish/personal_config.fish

set -g theme_nerd_fonts yes
set -g theme_display_date no
functions -c __bobthefish_glyphs __bobthefish_glyphs__base
function __bobthefish_glyphs -S
    __bobthefish_glyphs__base
    set -x branch_glyph \uE0A0
    set -x detached_glyph \u27A6
    set -x tag_glyph \u2302
end
function __bobthefish_timestamp
    echo "no"
end

function __fish_cancel_commandline
    commandline -f cancel

    commandline -C 1000000
    if set -q fish_color_cancel
        echo -ns (set_color $fish_color_cancel) "^C" (set_color normal)
    else
        echo -ns "^C"
    end
    if command -sq tput
        echo -n (tput el; or tput ce)
    end
    for i in (seq (commandline -L))
        echo ""
    end
    commandline ""
    commandline -f repaint
end

if [ (pwd) = ~/Dev/Node/temp/waiting ]
    mktemp
end

