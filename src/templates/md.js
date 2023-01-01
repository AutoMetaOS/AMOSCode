export default /*html*/`<script>
import { afterUpdate } from "svelte";
import { marked } from "marked";

let text;

$: oldText="";
$: md = "";

setInterval(()=>{
    const raw = text.innerHTML;
    if(oldText===raw) return 0;

    oldText = raw;
    md = marked.parse(raw.replaceAll('&gt;','>'))
}, 1e3)

afterUpdate(() => {
    mermaid = window.mermaid || null;
    mermaid?.init({
        securityLevel: 'loose',
        theme: 'base'
    }, ".language-mermaid");
});
<\/script>

<svelte:head>
    <script
        src="https://cdnjs.cloudflare.com/ajax/libs/mermaid/9.2.2/mermaid.min.js"
        integrity="sha512-IX+bU+wShHqfqaMHLMrtwi4nK6W/Z+QdZoL4kPNtRxI2wCLyHPMAdl3a43Fv1Foqv4AP+aiW6hg1dcrTt3xc+Q=="
        crossorigin="anonymous"
        referrerpolicy="no-referrer"
    ></script>
</svelte:head>

<template bind:this={text}><slot/></template>
<div>{@html md}</div>
`.trim();