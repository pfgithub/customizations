au VimLeave * set guicursor=a:ver1-blinkon0
nnoremap <CR> :noh<CR><CR>
set mouse=a

set tabstop=4 shiftwidth=4 expandtab softtabstop=4

set listchars=eol: ,tab:⇥ ,trail:·,extends:>,precedes:<,space: 
set list

set noswapfile

set number relativenumber

call plug#begin('~/.vim/plugged')

Plug 'glacambre/firenvim', { 'do': { _ -> firenvim#install(0) } }

call plug#end()
