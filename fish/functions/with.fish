function with
    #set -g __with_env_stack (env | string collect) $__with_env_stack
    if count $argv > /dev/null
        #nix-shell -p $argv --run env | setenv
        nix-shell -p $argv --run fish
    else
        #nix-shell --run env | setenv
        nix-shell --run fish
    end
    # unfortunately, once nix-shell exits, it cleans up after itself
    # which makes sense
    # but it means we can't nest shells
    # & probably random stuff will break
    # so for now we will be boring and just spawn subshells
    # subshells suck because they make the terminal confirm on exit
    # and we don't want that
end

