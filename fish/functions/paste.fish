# Defined in - @ line 1
function paste --argument filename
	if type -q pbpaste
		if test -n "$filename"
			pbpaste > $filename;
		else
			pbpaste
		end
	else
		xclip -selection clipboard -o $argv
	end
end
