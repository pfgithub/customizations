function start_terminal
    argparse --name=start_terminal 't/title=' 'c/cwd=' 'x/command=' 'P/private' 'z-zoom=' -- $argv; or return
    if set -q _flag_c; else
        set _flag_c ~/Dev/Node/temp/waiting
    end
    set zoom_level
    if set -q _flag_zoom
        set zoom_level --zoom $_flag_zoom
    end
    xfce4-terminal $zoom_level --working-directory=$_flag_c --initial-title=$_flag_t -x env _shell_preload_command=$_flag_x fish $_flag_P
end

# example
#
# start_terminal -t ": termname :" -x "termcommand" -c ~/Directory
