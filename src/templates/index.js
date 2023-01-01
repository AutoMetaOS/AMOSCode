export default /*js*/`
export {default as Markdown} from "./Markdown.svelte";

export { onMount } from "svelte";
export const log = console.log;
export const warn = console.log;
`.trim();