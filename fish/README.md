configuration files for the fish shell

- `copy` and `paste` commands to copy to and paste from the xclip on linux or pbcopy/pbpaste on mac. `copy filename` copies a file, `somecmd | copy` copies the command. `paste filename` pastes to the filename, `paste` echos the clipboard.
- `ifconfig` replacement that shows only ip addresses. for all the information, use `ip addr` (arch linux) or the path to ifconfig on your system.
- press ctrl+c any time (even when you have not typed anything) and create a new line instead of just clearing the current command.
- `cpwd` and `ppwd` commands to copy your pwd between terminals when opening a new terminal doesn't keep the pwd
- `git-ls-files` to list all tracked files in the current directory. uses some hacks to not take ∞ time (node_modules is skipped and some other things are too). it would be better to write this in real code so it could read the .gitignore and run faster.
- `call` to create a fish -c to call fish functions from programs that exec other programs. for example with onchange, `onchange \*.zig -- (call zig-fmt '{{changed}}')`
- `format` to format code (`.zig` with zig fmt, `.cpp`, `.c`, `.h`, `.hpp` with clang-format, everything else with a global prettier installation)
- `onch` to apply an onchange watcher to all tracked files. does not auto update so it has to be restarted if files change. this doesn't work very well for zig code because zig run seems to mess with files somehow.
- `mkcd` to make a directory and cd to it. uses `mkdir -p`, so supports creating subdirectories. if multiple directories are specified, the last one will be cded to.
- `mktemp` to make a temp directory and cd to it in `~/Dev/Node/temp/generated/fdsanjkdnjfklaln`. does not `mkdir -p`, so it requires that you have a `~/Dev/Node/temp/generated` directory before use.

init script will make a temp directory if fish is launched and your cwd is at `~/Dev/Node/temp/waiting` 

prompt theme and motd is managed by oh-my-fish. screenshot is using `omf t bobthefish` with Iosevka Custom Regular 9pt on xfce4-terminal.

[![https://i.imgur.com/KuQ1SIp.png](https://i.imgur.com/KuQ1SIp.png)](https://i.imgur.com/KuQ1SIp.png)
