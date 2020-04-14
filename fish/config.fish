source ~/.config/fish/personal_config.fish

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

