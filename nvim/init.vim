set number relativenumber
set mouse=a

set tabstop=4 shiftwidth=4 expandtab softtabstop=4

set noswapfile

set listchars=eol: ,tab:⇥ ,trail:·,extends:>,precedes:<,space: 
set list

command! W write
" I typo this so often

au VimLeave * set guicursor=a:ver1-blinkon0
nnoremap <CR> :noh<CR><CR>

nnoremap d "_d
vnoremap d "_d
" use x to cut

nnoremap , @a

set autoread
au FocusGained * :checktime

" vvvvv doesn't work for some reason, idk why
"au FileType lang set filetype=resyn
autocmd BufRead,BufNewFile *.lang set filetype=resyn
