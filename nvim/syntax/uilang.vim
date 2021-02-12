" Vim syntax file
" Language: resyn
" Maintainer: pfg
" Latest Revision: today

if exists("b:current_syntax")
  finish
endif

syn match uilangMagic /\\[a-zA-Z0-9_\-]\+/
syn match uilangChars /[:=#^|.!»><«+\-*/&‥≤≥≠]/
syn match uilangColName /:[a-zA-Z0-9_\-]\+/
syn match uilangError /[©]/
syn match uilangParens /[()[\]{};,]/
syn match uilangGet /\.[a-zA-Z0-9_\-]\+/
syn match uilangName /<[^>]*>/
syn match uilangKw /[a-zA-Z_][a-zA-Z0-9]*/
syn match uilangNumber /[0-9]\+/
syn match uilangAt /@[a-zA-Z0-9_\-]*/
syn match uilangHash /#[a-zA-Z0-9_\-]*/
syn match uilangString /"[^"]*"/
syn match uilangStringSquot /'[^']*'/
syn match uilangComment /\/\/.*$/
syn match uilangMultilineString /\\\\.*$/
syn keyword uilangKeywords widget fn if else return while switch for or and try catch orelse defer once
syn keyword uilangVarKeywords pub const state memo var let trigger
syn keyword uilangTypeKw html string attribute f64 i51 void number int
syn keyword uilangConstKw null false true

let b:current_syntax = "uilang"

hi Brackets ctermfg=240

hi def link uilangMagic Statement
hi def link uilangChars Statement
hi def link uilangColName Special
hi def link uilangError Error
hi def link uilangAt Identifier
hi def link uilangHash Statement
hi def link uilangString Constant
hi def link uilangStringSquot Constant
hi def link uilangNumber Constant
hi def link uilangConstKw Constant
hi def link uilangComment Comment
hi def link uilangMultilineString Constant
hi def link uilangParens Brackets
hi def link uilangName NonText
hi def link uilangGet Special
"Title
hi def link uilangKeywords Keyword
hi def link uilangVarKeywords Type
hi def link uilangTypeKw Type

