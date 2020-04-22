" Vim syntax file
" Language: resyn
" Maintainer: pfg
" Latest Revision: today

if exists("b:current_syntax")
  finish
endif

syn match resynMagic /\\[a-zA-Z]\+/
syn match resynChars /[:=#^]/
syn match resynError /[,]/
syn match resynParens /[()[\]{};]/
syn match resynGet /\.[a-zA-Z]*/
syn match resynKw /[a-zA-Z]\+/
syn match resynNumber /[0-9]\+/
syn match resynAt /@[a-zA-Z]*/
syn match resynString /"[^"]*"/
syn match resynComment /\/\/.*$/

let b:current_syntax = "resyn"

hi def link resynMagic Statement
hi def link resynChars Statement
hi def link resynError Error
hi def link resynAt Type
hi def link resynString Constant
hi def link resynNumber Constant
hi def link resynComment Comment
hi def link resynParens Ignore
"hi def link resynGet Title
"hi def link resynKw Identifier
