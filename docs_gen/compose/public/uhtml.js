/// μhtml
/// 
/// ISC License
///
/// Copyright (c) 2020, Andrea Giammarchi, @WebReflection
///
/// Permission to use, copy, modify, and/or distribute this software for any
/// purpose with or without fee is hereby granted, provided that the above
/// copyright notice and this permission notice appear in all copies.
///
/// THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
/// REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
/// AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
/// INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
/// LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE
/// OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
/// PERFORMANCE OF THIS SOFTWARE.
window.uhtml=function(e){"use strict";function t(e){return{get:function(t){return e.get(t)},set:function(t,n){
return e.set(t,n),n}}}function n(e,t,n){return s.test(t)?e:"<".concat(t).concat(n.replace(p,""),"></").concat(t,">")}
function r(e,t,r){for(var a=[],o=e.length,c=function(n){var r=e[n-1];a.push(l.test(r)&&function e(t,n){return 0<n--&&(
f.test(t[n])||!d.test(t[n])&&e(t,n))}(e,n)?r.replace(l,function(e,r,a){return"".concat(t).concat(n-1,"=").concat(a||'"'
).concat(r).concat(a?"":'"')}):"".concat(r,"\x3c!--").concat(t).concat(n-1,"--\x3e"))},i=1;i<o;i++)c(i);a.push(e[o-1])
;var u=a.join("").trim();return r?u:u.replace(v,n)}function a(e,t){return 111===e.nodeType?1/t<0?t?(r=(n=e).firstChild,
a=n.lastChild,(o=document.createRange()).setStartAfter(r),o.setEndAfter(a),o.deleteContents(),r
):e.lastChild:t?e.valueOf():e.firstChild:e;var n,r,a,o}var o,c,i,u,l=/([^\s\\>"'=]+)\s*=\s*(['"]?)$/,
s=/^(?:area|base|br|col|embed|hr|img|input|keygen|link|menuitem|meta|param|source|track|wbr)$/i,f=/<[a-z][^>]+$/i,
d=/>[^<>]*$/,v=/<([a-z]+[a-z0-9:._-]*)([^>]*?)(\/>)/gi,p=/\s+$/,h=Array.isArray,g=[],m=g.indexOf,y=g.slice,w=(o=document
,c="fragment",u="content"in N(i="template")?function(e){var t=N(i);return t.innerHTML=e,t.content}:function(e){var t,
n=N(c),r=N(i);return b(n,/^[^\S]*?<(col(?:group)?|t(?:head|body|foot|r|d|h))/i.test(e)?(t=RegExp.$1,
r.innerHTML="<table>"+e+"</table>",r.querySelectorAll(t)):(r.innerHTML=e,r.childNodes)),n},function(e,t){return(
"svg"===t?function(e){var t=N(c),n=N("div");return n.innerHTML='<svg xmlns="http://www.w3.org/2000/svg">'+e+"</svg>",b(t
,n.firstChild.childNodes),t}:u)(e)});function b(e,t){for(var n=t.length;n--;)e.appendChild(t[0])}function N(e){
return e===c?o.createDocumentFragment():o.createElementNS("http://www.w3.org/1999/xhtml",e)}function C(e,t){
return e.childNodes[t]}function x(e){for(var t=[],n=e.parentNode;n;)t.push(m.call(n.childNodes,e)),n=(e=n).parentNode
;return t}function k(e,t,n){return function(e,t,n,r,a){for(var o=n.length,c=t.length,i=o,u=0,l=0,s=null;u<c||l<i;)if(
c===u)for(var f=i<o?l?r(n[l-1],-0).nextSibling:r(n[i-l],0):a;l<i;)e.insertBefore(r(n[l++],1),f);else if(i===l)for(;u<c;
)s&&s.has(t[u])||e.removeChild(r(t[u],-1)),u++;else if(t[u]===n[l])u++,l++;else if(t[c-1]===n[i-1])c--,i--;else if(
t[u]===n[i-1]&&n[l]===t[c-1]){var d=r(t[--c],-1).nextSibling;e.insertBefore(r(n[l++],1),r(t[u++],-1).nextSibling),
e.insertBefore(r(n[--i],1),d),t[c]=n[i]}else{if(!s){s=new Map;for(var v=l;v<i;)s.set(n[v],v++)}if(s.has(t[u])){
var p=s.get(t[u]);if(l<p&&p<i){for(var h=u,g=1;++h<c&&h<i&&s.get(t[h])===p+g;)g++;if(p-l<g)for(var m=r(t[u],0);l<p;
)e.insertBefore(r(n[l++],1),m);else e.replaceChild(r(n[l++],1),r(t[u++],-1))}else u++}else e.removeChild(r(t[u++],-1))}
return n}(e.parentNode,t,n,a,e)}var A=document,E=A.createTreeWalker,T=A.importNode,L=1!=T.length,M=L?function(e,t){
return T.call(document,w(e,t),!0)}:w,S=L?function(e){return E.call(document,e,129,null,!1)}:function(e){return E.call(
document,e,129)};function O(e){var t,n,r,a,o,c,i=e.type,u=e.path.reduceRight(C,this);return"node"===i?(r=u,c=[],
function e(t){switch(typeof t){case"string":case"number":case"boolean":a!==t&&(a=t,
o?o.textContent=t:o=document.createTextNode(t),c=k(r,c,[o]));break;case"object":case"undefined":if(null==t){a!=t&&(a=t,
c=k(r,c,[]));break}if(h(t)){0===(a=t).length?c=k(r,c,[]):"object"==typeof t[0]?c=k(r,c,t):e(String(t));break}
"ELEMENT_NODE"in t&&a!==t&&(c=k(r,c,11===(a=t).nodeType?y.call(t.childNodes):[t]))}}):"attr"===i?function(e,t){
return"ref"===t?(n=e,function(e){"function"==typeof e?e(n):e.current=n}):"aria"===t?(r=e,function(e){for(var t in e
)r.setAttribute("role"===t?t:"aria-".concat(t),e[t])}):".dataset"===t?(a=e.dataset,function(e){for(var t in e)a[t]=e[t]}
):"."===t.slice(0,1)?(o=e,c=t.slice(1),function(e){o[c]=e}):"on"===t.slice(0,2)?(i=e,s=(u=t).slice(2),!(u in i
)&&u.toLowerCase()in i&&(s=s.toLowerCase()),function(e){var t=h(e)?e:[e,!1];l!==t[0]&&(l&&i.removeEventListener(s,l,t[1]
),(l=t[0])&&i.addEventListener(s,l,t[1]))}):(f=e,d=t,p=!0,g=document.createAttributeNS(null,d),function(e){v!==e&&(
null==(v=e)?p||(f.removeAttributeNode(g),p=!0):(g.value=e,p&&(f.setAttributeNodeNS(g),p=!1)))});var n,r,a,o,c,i,u,l,s,f,
d,v,p,g}(u,e.name):(t=u,function(e){n!=e&&(n=e,t.textContent=null==e?"":e)})}function $(e,t){var n=t.type,r=t.template,
a=t.values,o=a.length;W(e,a,o);var c,i,u,l=e.entry;l&&l.template===r&&l.type===n||(e.entry=(u=B(c=n,i=r),l={type:c,
template:i,content:u.content,updates:u.updates,wire:null}));for(var s=l.content,f=l.updates,d=l.wire,v=0;v<o;v++)f[v](
a[v]);return d||(l.wire=function(e){var t=e.childNodes,n=t.length;if(n<2)return t[0];var r=y.call(t,0);return{
ELEMENT_NODE:1,nodeType:111,firstChild:r[0],lastChild:r[n-1],valueOf:function(){if(t.length!==n)for(var a=0;a<n;
)e.appendChild(r[a++]);return e}}}(s))}var j="isµ",H=t(new WeakMap),B=function(e,t){var n=H.get(t)||H.set(t,function(e,t
){for(var n=r(t,j,"svg"===e),a=M(n,e),o=S(a),c=[],i=t.length-1,u=0,l="".concat(j).concat(u);u<i;){var s=o.nextNode();if(
!s)throw"bad template: ".concat(n);if(8===s.nodeType)s.textContent===l&&(c.push({type:"node",path:x(s)}),l="".concat(j
).concat(++u));else{for(;s.hasAttribute(l);)c.push({type:"attr",path:x(s),name:s.getAttribute(l)}),s.removeAttribute(l),
l="".concat(j).concat(++u);/^(?:style|textarea)$/i.test(s.tagName)&&s.textContent.trim()==="\x3c!--".concat(l,"--\x3e"
)&&(c.push({type:"text",path:x(s)}),l="".concat(j).concat(++u))}}return{content:a,nodes:c}}(e,t)),a=n.content,o=n.nodes,
c=T.call(document,a,!0);return{content:c,updates:o.map(O,c)}},W=function e(t,n,r){for(var a=t.stack,o=0;o<r;o++){
var c=n[o];c instanceof z?n[o]=$(a[o]||(a[o]={stack:[],entry:null,wire:null}),c):h(c)?e(a[o]||(a[o]={stack:[],
entry:null,wire:null}),c,c.length):a[o]=null}r<a.length&&a.splice(r)};function z(e,t,n){this.type=e,this.template=t,
this.values=n}function D(e){var n=t(new WeakMap);return _(function(t){for(var n=arguments.length,r=new Array(1<n?n-1:0),
a=1;a<n;a++)r[a-1]=arguments[a];return new z(e,t,r)},{for:{value:function(t,r){var a,o=n.get(t)||n.set(t,R(null))
;return o[r]||(o[r]=(a={stack:[],entry:null,wire:null},function(t){for(var n=arguments.length,r=new Array(1<n?n-1:0),
o=1;o<n;o++)r[o-1]=arguments[o];return $(a,{type:e,template:t,values:r})}))}},node:{value:function(t){for(
var n=arguments.length,r=new Array(1<n?n-1:0),a=1;a<n;a++)r[a-1]=arguments[a];return $({stack:[],entry:null,wire:null},{
type:e,template:t,values:r}).valueOf()}}})}var R=Object.create,_=Object.defineProperties,q=t(new WeakMap),F=D("html"),
P=D("svg");return e.Hole=z,e.html=F,e.render=function(e,t){var n="function"==typeof t?t():t,r=q.get(e)||q.set(e,{stack:[
],entry:null,wire:null}),a=n instanceof z?$(r,n):n;return a!==r.wire&&(r.wire=a,e.textContent="",e.appendChild(
a.valueOf())),e},e.svg=P,e}({});