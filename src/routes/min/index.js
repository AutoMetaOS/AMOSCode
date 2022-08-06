export const wordCount = ( str ) =>
  str
    .replace( /(^\s*)|(\s*$)/gi, "" )
    .replace( /[ ]{2,}/gi, " " )
    .replace( /\n /, "\n" )
    .split( ' ' ).length;

const darkStyle = `<style>
    body {
        font: 16px 100 Helvetica;
        background: #1e1e1e;
        color: #fff;
    }
</style>`;

export const context = ( html ) => {
  html = html
    .replace( /\n/g, "" )
    .replace( "const ", "" )
    .replace( "let ", "" )
    .replace( "var ", "" );

  return html;
};

export const preprocess = ( data, dark ) => data + ( dark ? darkStyle : "" );