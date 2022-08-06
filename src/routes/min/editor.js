const initial = `<svg viewbox="0 0 512 512" width="512" height="512" xmlns="http://www.w3.org/2000/svg">
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
[p, h4, h5] = ['p', 'h4', 'h5'].map(ƒ);

p.innerHTML = 1;
</script>`;

export const id = "DEBUG_MONACO_EDITOR";
export const config = {
  value: initial,
  language: "html",
  theme: "vs-dark",
  minimap: {
    enabled: false,
  },
  scrollBeyondLastLine: false,
  fontSize: 16,
  wordWrap: true,
  wordWrapMinified: true,
  wrappingIndent: 'indent'
};

export const style = [
  "width: 100%;",
  "height: 100% ;",
].join( ";" )

export const debounce = function ( fn, wait = 1 ) {
  let timeout
  return function ( ...args ) {
    clearTimeout( timeout )
    timeout = setTimeout( () => fn.call( this, ...args ), wait )
  }
}