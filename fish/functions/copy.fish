function copy --argument filename
    if type -q pbcopy
        cat $argv | pbcopy
    else
        xclip -selection clipboard $argv
        xclip -selection primary $argv
    end
end
