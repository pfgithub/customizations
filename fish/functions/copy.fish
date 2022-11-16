function copy --argument filename
    if type -q pbcopy
        cat $argv | pbcopy
    else if type -q xclip
        xclip -selection clipboard $argv
        xclip -selection primary $argv
    else if type -q termux-clipboard-set
        cat $argv | termux-clipboard-set
    else
        echo "clipboard not supported"
        false
    end
end
