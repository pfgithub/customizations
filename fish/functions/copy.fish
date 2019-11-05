function copy --description 'copy [filename]'
	if count $argv > /dev/null
		cat $argv | copy
	else
		xclip -selection clipboard
	end
end
