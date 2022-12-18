export default {
	name: 'glsl',
	transform: ( code, id ) => !id.endsWith( '.glsl' ) ? null : { code: `export default ${ JSON.stringify( code ) };`, map: null }
};