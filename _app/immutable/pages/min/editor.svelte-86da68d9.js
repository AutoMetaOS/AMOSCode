import{_ as f}from"../../chunks/preload-helper-c28b9807.js";import{S as w,i as m,s as g,l as k,m as W,p as _,h as c,q as d,b as v,n as a,K as y,o as x,L as E}from"../../chunks/index-c9098884.js";const j=`<svg viewbox="0 0 512 512" width="512" height="512" xmlns="http://www.w3.org/2000/svg">
<defs>
    <linearGradient id="a" x1="0" y1="0" x2="60%" y2="60%">
      <stop offset="0" stop-color="#F59"/>
      <stop offset="1" stop-color="#96F"/>
    </linearGradient>
  </defs>
<rect fill="url(#a)" x="0" y="0" width="100%" height="100%"  rx="15%"/>
<g fill="#fff">
  <path transform="scale(0.8) translate(75,90)" d="M380 125l-9-1s-96-7-134 119c-34 110-111 105-115 105h-5a102 102 0 015-204c35 0 67 18 86 47l16-11a122 122 0 10-100 188c17 0 97-6 132-119 33-110 111-105 115-105h7a102 102 0 11-94 157l-16 11a122 122 0 10112-187z"/>
 </g>
</svg>
<style>
svg{
    width: 700px;
    height: 700px;
    border: 1px solid #aaa8;
    border-radius:10px;
}
</style>
<h4></h4>
<h5></h5>
<p></p>
<script>
[p, h4, h5] = ['p', 'h4', 'h5'].map(\u0192);

p.innerHTML = 1;
<\/script>`,p="DEBUG_MONACO_EDITOR",b={value:j,language:"html",theme:"vs-dark",minimap:{enabled:!1},scrollBeyondLastLine:!1,fontSize:16,wordWrap:!0,wordWrapMinified:!0,wrappingIndent:"indent"},M=["width: 100%;","height: 100% ;"].join(";"),D=function(s,e=1){let t;return function(...r){clearTimeout(t),t=setTimeout(()=>s.call(this,...r),e)}};function $(){return new Worker("/assets/editor.worker.b9a77fdc.js")}function I(){return new Worker("/assets/ts.worker.004cbed0.js")}function L(){return new Worker("/assets/json.worker.d7a83544.js")}function T(){return new Worker("/assets/css.worker.b6775041.js")}function C(){return new Worker("/assets/html.worker.c5234aec.js")}function O(s){let e;return{c(){e=k("div"),this.h()},l(t){e=W(t,"DIV",{id:!0,style:!0}),_(e).forEach(c),this.h()},h(){d(e,"id",p),d(e,"style",M)},m(t,r){v(t,e,r),s[1](e)},p:a,i:a,o:a,d(t){t&&c(e),s[1](null)}}}function B(s,e,t){let r,i;const l=y();x(()=>{f(()=>import("../../chunks/editor.main-53f2e50d.js").then(n=>n.e),["_app/immutable/chunks/editor.main-53f2e50d.js","_app/immutable/assets/editor-64bd492a.css","_app/immutable/chunks/preload-helper-c28b9807.js"]).then(n=>{i=n.editor,i.create(document.getElementById(p),b),i.getModels()[0].onDidChangeContent(D(o=>{const u=i.getModels()[0].getValue();l("code",u)},500))}),window.MonacoEnvironment={getWorker(n,o){return o==="typescript"||o==="javascript"?new I:o==="json"?new L:o==="css"?new T:o==="html"?new C:new $}}});function h(n){E[n?"unshift":"push"](()=>{r=n,t(0,r)})}return[r,h]}class V extends w{constructor(e){super(),m(this,e,B,O,g,{})}}export{V as default};
