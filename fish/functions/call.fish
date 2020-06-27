# eg
# onchange file -- (call fishfunction '{{changed}}')
function call --description 'call a fish function in another command'
    echo fish
    echo -c
    echo (echo $argv)
end
