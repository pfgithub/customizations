function without
    if set -q __with_env_stack[1]
        set -l prev $__with_env_stack[1]
        printf "%s\n" $prev | setenv
        set -e __with_env_stack[1]
    else
        return 1
    end
end
