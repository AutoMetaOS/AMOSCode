<script>
  import Repl from "./REPL/Repl.svelte";
  import { onMount } from "svelte";
  import md from "./templates/md";
  import accumulator from "./templates";

  let repl;

  const imports = `import {\n Markdown,\n onMount, log, warn
} from "./index.js";\n\nonMount(()=>{});`;

  const index = (max) =>
    `<script>
${max ? imports : ""}
<\/script>

<style` +
    `>
  :global(body) { background-color: #222;color: #fff; }
</style>

${
  max
    ? `<Markdown>
# Hello
> there
\`\`\`mermaid
graph LR
    A --- B
    B-->C[fa:fa-ban forbidden]
    B-->D(fa:fa-spinner);
\`\`\`
</Markdown>`
    : ""
}`;

  let isMinimal = false;
  const nonMins = [
    {
      type: "svelte",
      name: "Markdown",
      source: md,
    },
    {
      type: "js",
      name: "index",
      source: accumulator,
    },
  ];

  onMount(() => {
    isMinimal = new URL(window.location).searchParams.has("minimal");
    const components = [
      {
        type: "svelte",
        name: "App",
        source: index(!isMinimal),
      },
    ];
    if (!isMinimal) nonMins.forEach((e) => components.push(e));

    repl.initialize({ components });
  });

  const toggleMinimal = () =>
    (window.location.href = !isMinimal
      ? window.location.href + "?minimal"
      : window.location.href.replace("?minimal", ""));
</script>

<Repl bind:this={repl} workersUrl="workers" />
<div
  class="config"
  style="position:fixed;bottom:5px;left:50%;transform:translate(-50%,0);width:200px;padding:10px;z-index:999999;display:flex;justify-content:space-around;color:#fff;background:#222;font-family:Helvetica;font-size:16px;box-shadow:0 2px 5px 2px #0004;"
>
  <span />
  <button on:click={toggleMinimal}>
    {isMinimal ? "Minimal" : "Maximal"} Mode
  </button>
  <span />
</div>
