source ~/.config/fish/personal_config.fish

bind --user (echo -ne "\e")"[3;5~" kill-word
bind --user (echo -ne "\x08") backward-kill-word

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
# v required because fish switched the default keybind
bind --user \cc __fish_cancel_commandline

if [ (pwd) = ~/Dev/Node/temp/waiting ]
    mktemp
end

functions -c fish_prompt __old_fish_prompt

function fish_prompt
    __old_fish_prompt $argv
    if set -q _shell_preload_command
        commandline --replace $_shell_preload_command
        set -e _shell_preload_command
    end
end

