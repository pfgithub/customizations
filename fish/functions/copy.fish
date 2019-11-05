# Defined in - @ line 1
function copy --description 'alias copy=xclip -selection clipboard'
	xclip -selection clipboard $argv;
end
