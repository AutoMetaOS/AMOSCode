export default {
	name: 'json',
	transform: ( code, id ) => !id.endsWith( '.json' ) ? null : { code: `export default ${ code };`, map: null }
};