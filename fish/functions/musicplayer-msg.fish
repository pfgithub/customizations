# Defined in - @ line 1
function musicplayer-msg --wraps='node ~/Dev/Node/musicplayer/src/ipc.js' --description 'alias musicplayer-msg node ~/Dev/Node/musicplayer/src/ipc.js'
  node ~/Dev/Node/musicplayer/src/ipc.js $argv;
end
