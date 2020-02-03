function onch
        echo "command:" $res
        if count $argv > /dev/null
                set cmd $argv
        else
                set cmd format '{{changed}}'
        end
        set tracked (git-ls-tracked)
        echo "Ready!"
        onchange $tracked -- (call $cmd)
end
