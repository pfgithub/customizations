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
autocmd BufRead,BufNewFile *.resyn set filetype=resyn
autocmd BufRead,BufNewFile *.uil set filetype=uilang

autocmd BufRead,BufNewFile *.fish set filetype=fish

nnoremap <F7> :echo "hi<" . synIDattr(synID(line("."),col("."),1),"name") . '> trans<'
\ . synIDattr(synID(line("."),col("."),0),"name") . "> lo<"
\ . synIDattr(synIDtrans(synID(line("."),col("."),1)),"name") . ">"<CR>

let g:markdown_fenced_languages = ['zig', 'uil=uilang', 'js=javascript', 'html', 'json', 'diff']

nmap <buffer><silent> <leader>p "+p
autocmd FileType markdown nmap <buffer><silent> <leader>p :call mdip#MarkdownClipboardImage()<CR>
" there are some defaults for image directory and image name, you can change them
" let g:mdip_imgdir = 'img'
let g:mdip_imgname = 'img'
let g:mdip_random_name = 'yes'

" nvm "imap jj <Esc>
noremap <Leader>s :w<CR>

let g:zig_fmt_autosave = 0
