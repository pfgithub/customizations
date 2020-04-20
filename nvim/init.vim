set number relativenumber
set mouse=a

set tabstop=4 shiftwidth=4 expandtab softtabstop=4

set noswapfile

set listchars=eol: ,tab:⇥ ,trail:·,extends:>,precedes:<,space: 
set list

au VimLeave * set guicursor=a:ver1-blinkon0
nnoremap <CR> :noh<CR><CR>

nnoremap d "_d
vnoremap d "_d
" use x to cut
