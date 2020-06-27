function format
    for file in $argv
        echo "Formatting" $file
        set --local extension (echo $file | awk -F. '{print $NF}')
        switch $extension
            case "zig"
                zig fmt $file
            case "cpp" "c" "h" "hpp"
                clang-format -i $file
            case "fish"
                fish_indent -w $file
            case '*'
                prettier --write $file
        end
        echo "Done"
    end
end
