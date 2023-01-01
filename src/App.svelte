<script>
  import Repl from "./REPL/Repl.svelte";
  import { onMount } from "svelte";
  let repl;

  const accumulator = `
  export { onMount } from "svelte";
  export {default as Markdown} from "./Markdown.svelte";
  `;
  const index =
    `<script>
  import {
  //  Markdown,
   Solid
 } from "./index.js";
<\/script>

<style` +
    `>
  :global(body) { background-color: #222;color: #fff; }
</style>


<!-- <Markdown>
  # Hello
  > there
</Markdown> -->
`;
  const md = `<script>
	import { marked } from "marked";
	let text;
	$: md = "";

	setInterval(()=>{
		md = marked.parse(text.innerHTML.replaceAll('&gt;','>'))
	}, 1e3)
<\/script>

<template bind:this={text}><slot/></template>
<div>{@html md}</div>
`;
  const solid = `function App() {
  return (
    <div class="">
      <header class="">
        <p>Edit <code>src/App.jsx</code> and save to reload.</p>
        <a
          href="https://github.com/solidjs/solid"
          target="_blank"
          rel="noopener noreferrer"
        >Learn Solid</a>
      </header>
    </div>
  );
}

export default App;
`;

  onMount(() => {
    repl.initialize({
      components: [
        {
          type: "svelte",
          name: "App",
          source: index.trim(),
        },
        {
          type: "svelte",
          name: "Markdown",
          source: md.trim(),
        },
        {
          type: "jsx",
          name: "Solid",
          source: solid.trim(),
        },
        {
          type: "js",
          name: "index",
          source: accumulator.trim(),
        },
      ],
    });
  });
</script>

<Repl bind:this={repl} workersUrl="workers" />

<style>
</style>
