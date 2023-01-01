<script>
  import Repl from "./REPL/Repl.svelte";
  import { onMount } from "svelte";
  let repl;

  const accumulator = `
  export {default as Solid} from "./Solid.svelte";
  export {default as Markdown} from "./Markdown.svelte";
  `;
  const index =
    `<script>
  //  import {
  //  Markdown,
    // Solid
  // } from "./index.js";
<\/script>

<styl` +
    `e>` +
    `
  :global(body) { background-color: #222;color: #fff; }
</style>


<!-- <Solid>
  render(
    <div>
      HI THERE!!!
    </div>,
  )
</Solid>

<Markdown>
  # Hello
  > there
</Markdown> -->
`;
  const md = `<script>
	import { marked } from "marked";
	let text;
	$: md = "";

	setInterval(()=>
		md = marked.parse(text.innerHTML.replaceAll('&gt;','>'))
	, 1e3)
<\/script>

<template bind:this={text}><slot/></template>

<div>
	{@html md}
</div>
`;
  const solid = `<script>
  import { renderToString } from "solid-js/web";

	let text;
	$: md = "";

	setInterval(()=>
		md = renderToString(text.innerHTML.replaceAll('&gt;','>'))
	, 1e3)
<\/script>

<template bind:this={text}><slot/></template>

<div>
	{@html md}
</div>
`;

  onMount(() => {
    repl.initialize({
      components: [
        {
          type: "svelte",
          name: "App",
          source: index,
        },
        {
          type: "svelte",
          name: "Markdown",
          source: md,
        },
        {
          type: "svelte",
          name: "Solid",
          source: solid,
        },
        {
          type: "js",
          name: "index",
          source: accumulator,
        },
      ],
    });
  });
</script>

<Repl bind:this={repl} workersUrl="workers" />

<style>
</style>
