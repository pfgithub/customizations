# Defined in - @ line 1
function paste --argument filename
	if type -q pbpaste
		pbpaste
	else
		xclip -selection clipboard -o
	end
end
