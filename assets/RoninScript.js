HTMLElement.prototype.write = function ( text ) {
    this.innerHTML = text;
};
const addScript = ( url ) => {
    const urls = ƒA( 'script' ).map( e => e.src );
    if ( urls.some( src => src === url ) ) return;

    const script = document.createElement( 'script' );
    script.src = url;
    document.head.appendChild( script );
};
const addStyle = ( url ) => {
    const urls = ƒA( 'link' ).map( e => e.href );
    if ( urls.some( src => src === url ) ) return;

    const link = document.createElement( 'link' );
    link.href = url;
    link.rel = 'stylesheet';
    document.head.appendChild( link );
};

const ƒ = ( x ) => document.querySelector( x );
const ƒA = ( x ) => [ ...document.querySelectorAll( x ) ];

const copyToClipboard = str => {
    const el = document.createElement( 'textarea' );
    el.value = str;
    el.setAttribute( 'readonly', '' );
    el.style.position = 'absolute';
    el.style.left = '-9999px';
    document.body.appendChild( el );
    const selected =
        document.getSelection().rangeCount > 0
            ? document.getSelection().getRangeAt( 0 )
            : false;
    el.select();
    document.execCommand( 'copy' );
    document.body.removeChild( el );
    if ( selected ) {
        document.getSelection().removeAllRanges();
        document.getSelection().addRange( selected );
    }
};

const String2HTML = str => str.replace(
    /[&<>'"]/g,
    tag =>
    ( {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        "'": '&#39;',
        '"': '&quot;'
    }[ tag ] || tag )
);

const HTML2String = str => str.replace(
    /&amp;|&lt;|&gt;|&#39;|&quot;/g,
    tag =>
    ( {
        '&amp;': '&',
        '&lt;': '<',
        '&gt;': '>',
        '&#39;': "'",
        '&quot;': '"'
    }[ tag ] || tag )
);