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
${max ? imports : "\timport { onMount } from 'svelte';"}
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
    : "Hi"
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
    const params = new URL(window.location).searchParams;
    isMinimal = params.has("minimal");

    let code = "";
    if (!isMinimal && window.location !== window.parent.location) return 0;
    if (window.location !== window.parent.location)
      code = atob(params.get("data"));
    else code = index(!isMinimal);

    const components = [
      {
        type: "svelte",
        name: "App",
        source: code,
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
{#if !isMinimal}
  <div
    class="config"
    style="position:fixed;bottom:5px;left:50%;transform:translate(-50%,0);width:200px;padding:10px;z-index:999999;color:#fff;background:#222;font:400 16px Helvetica;box-shadow:0 2px 5px 2px #0004;text-align:center;"
  >
    <button on:click={toggleMinimal}> Start Minimal Mode </button>
  </div>
{/if}
