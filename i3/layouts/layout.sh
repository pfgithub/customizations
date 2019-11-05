#!/usr/bin/env fish
set layout (ls ~/.config/i3/layouts/*.json | rofi -i -dmenu -no-custom -p "Select layout")
i3-msg append_layout $layout
