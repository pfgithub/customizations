" Vim syntax file
" Language: resyn
" Maintainer: pfg
" Latest Revision: today

if exists("b:current_syntax")
  finish
endif

syn match resynMagic /\v\\[a-zA-Z_\-]+/
syn match resynChars /[:=#^|.?]/
syn match resynColName /:[a-zA-Z_\-]\+/
syn match resynError /[,]/
syn match resynParens /[()[\]{};]/
syn match resynGet /\.[a-zA-Z_\-]\+/
syn match resynName /<[^>]*>/
syn match resynKw /[a-zA-Z_\-]\+/
syn match resynNumber /[0-9]\+/
syn match resynAt /@[a-zA-Z_\-]*/
syn match resynHash /#[a-zA-Z_\-]*/
syn match resynString /"[^"]*"/
syn match resynStringSquot /'[^']*'/
syn match resynComment /\/\/.*$/

let b:current_syntax = "resyn"

hi Brackets ctermfg=240

hi def link resynMagic Statement
hi def link resynChars Statement
hi def link resynColName Special
hi def link resynError Error
hi def link resynAt Type
hi def link resynHash Type
hi def link resynString Constant
hi def link resynStringSquot Constant
hi def link resynNumber Constant
hi def link resynComment Comment
hi def link resynParens Brackets
hi def link resynName NonText
"hi def link resynGet Title
"hi def link resynKw Identifier
