function uncommit -d "undo last commit"
    git log -n 1 && git reset --soft HEAD^
end
