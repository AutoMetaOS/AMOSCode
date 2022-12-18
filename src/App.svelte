<script>
  import Repl from "./REPL/Repl.svelte";
  import { onMount } from "svelte";
  let repl;

  const code_1 =
    `<script>
//
<\/script>

<styl` +
    `e>` +
    `
  :global(body) {
    background-color: #222;
    color: #fff;
  }
  svg{border: 1px solid green;}
</style>

<button on:click={()=>count--}>-</button>
{count}
<button on:click={()=>count++}>+</button>
`;

  onMount(() => {
    repl.initialize({
      components: [
        {
          type: "svelte",
          name: "App",
          source: code_1,
        },
        // {
        //   type: "svelte",
        //   name: "C",
        //   source: "Test",
        // },
      ],
    });
  });
</script>

<Repl bind:this={repl} workersUrl="workers" />

<style>
</style>
