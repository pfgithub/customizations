function setenv
    # 1. Handle traditional usage: setenv KEY VALUE
    if set -q argv[1]
        set -gx $argv[1] $argv[2..-1]
        return
    end

    # 2. Handle piped usage: env | setenv
    set -l old_vars (set -nx)
    set -l seen_vars
    # List of variables Fish manages itself that we should never try to 'set'
    set -l protected_vars PWD SHLVL _ FISH_VERSION
    
    while read -l line
        if test -z "$line"; continue; end

        set -l kv (string split -m 1 = -- $line)
        
        if set -q kv[2]
            set -l key $kv[1]
            set -l value $kv[2]

            # SKIP if the variable is read-only/internal to Fish
            if contains -- $key $protected_vars
                set -a seen_vars $key
                continue
            end

            set -gx $key $value
            set -a seen_vars $key
        end
    end

    # 3. Clean up: Remove variables that were NOT in the new input
    if set -q seen_vars[1]
        for var in $old_vars
            # Don't erase critical system/shell variables
            if contains -- $var $protected_vars HOME USER SHELL PATH
                continue
            end

            if not contains -- $var $seen_vars
                set -e $var
            end
        end
    end
end
