function bgrun -d "run a command in the background (eg bgrun feh img.png)."
    test -z "$argv" && echo (set_color red)'Usage:'(set_color normal)' '(set_color --bold)'bgrun'(set_color normal)' '(set_color cyan)'some command'(set_color normal) && return
    set logdir ~/Logs
    set logfile $logdir/(date +%s)-(openssl rand -hex 16).log
    mkdir -p $logdir
    echo $logfile
    setsid -f $argv 2>$logfile >$logfile
    #setsid -f $argv | less +FG
end
