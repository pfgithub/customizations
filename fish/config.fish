# This is meant to be bound to something like \cC.
function __fish_cancel_commandline
    # Close the pager if it's open (#4298)
    commandline -f cancel

    commandline -C 1000000
    if set -q fish_color_cancel
        echo -ns (set_color $fish_color_cancel) "^C" (set_color normal)
    else
        echo -ns "^C"
    end
    if command -sq tput
        # Clear to EOL (to erase any autosuggestion).
        echo -n (tput el; or tput ce)
    end
    for i in (seq (commandline -L))
        echo ""
    end
    commandline ""
    commandline -f repaint
end

function ifconfig
	node -e "var os=require(\"os\"),ifaces=os.networkInterfaces();Object.keys(ifaces).forEach((e)=>{var o=0;ifaces[e].forEach((s)=>{!1===s.internal&&(console.log(`\${s.family} - \${s.address} - \${o>=1?e+\":\"+o:e}`),++o)})});"
end

if [ (pwd) = ~/Dev/Node/temp/waiting ]
	mktemp
end

