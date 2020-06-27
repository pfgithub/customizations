function git-ls-tracked
    for file in (find . -type f -not -path '*node_modules*' -not -path '*.git*' -not -path './junk*')
        git check-ignore $file -q
        if test $status -eq 0
        else
            echo $file
        end
    end
end
