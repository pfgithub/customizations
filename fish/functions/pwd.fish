function cpwd --description 'copy current directory'
	pwd > ~/.config/fish/_pwd.temp;
end
function ppwd --description 'paste current directory'
	cd (cat ~/.config/fish/_pwd.temp);
end
