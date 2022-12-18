<script>
  import Repl from "./REPL/Repl.svelte";
  import { onMount } from "svelte";
  let repl;

  const code_1 =
    `<script>
  // import Markdown from "./markdown.svelte";
  import {uuid} from "predefined";
  import {a} from "./funcs.js";
<\/script>
{uuid()}
<styl` +
    `e>` +
    `
  :global(body) {background-color: #222;color: #fff;}
</style>

<!-- <Markdown>
  # Hello
  > there
</Markdown> -->

<br/> {a}

`;
  const md = `<script>
	import {marked} from "marked";
	let text;
	$: md = "";

	setInterval(()=>{
		md = marked.parse(text.innerHTML.replaceAll('&gt;','>'));
	},1000)
<\/script>

<div bind:this={text} style="display:none;">
	<slot/>
</div>

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
          source: code_1,
        },
        {
          type: "js",
          name: "funcs",
          source: `export const a = 1;`,
        },
        {
          type: "svelte",
          name: "markdown",
          source: md,
        },
      ],
    });
  });
</script>

<Repl bind:this={repl} workersUrl="workers" />

<style>
</style>
