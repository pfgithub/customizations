# Defined in - @ line 1
function paste --description 'alias paste=xclip -o'
	xclip -selection clipboard -o $argv;
end
