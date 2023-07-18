function pretty_ms_print
    # TODO
    # 250ms
    # 1sec
    # 10sec
    # 3.6min
    # 50min
    # 25hr
  set -l SEC 1000
  set -l MIN 60000
  set -l HOUR 3600000
  set -l DAY 86400000

  set -l ARG $argv[1]

  set -l num_days (math -s0 "$ARG / $DAY")
  set -l num_hours (math -s0 "$ARG % $DAY / $HOUR")
  set -l num_mins (math -s0 "$ARG % $HOUR / $MIN")
  set -l num_secs (math -s0 "$ARG % $MIN / $SEC")
  set -l num_millis (math -s0 "$ARG % $SEC")
  set -l cmd_duration_str ""
  if [ $num_days -gt 0 ]
    set cmd_duration_str {$cmd_duration_str}{$num_days}"d "
  end
  if [ $num_hours -gt 0 ]
    set cmd_duration_str {$cmd_duration_str}{$num_hours}"h "
  end
  if [ $num_mins -gt 0 ]
    set cmd_duration_str {$cmd_duration_str}{$num_mins}"m "
  end
  if [ $num_secs -gt 0 ]
    set cmd_duration_str {$cmd_duration_str}{$num_secs}"s "
  end
  if [ $ARG -lt 1000 ]
    echo $num_millis"ms"
    return
  end

  set -l num_millis_pretty ''
  set num_millis_pretty (printf '%03d' $num_millis)
  set cmd_duration_str {$cmd_duration_str}{$num_millis_pretty}
  echo $cmd_duration_str
end
