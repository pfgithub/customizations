function commit -d "commit to git"
    git add --all && git status && git commit -m $argv
end
