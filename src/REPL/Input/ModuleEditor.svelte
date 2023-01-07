<script>
  import { createEventDispatcher, onMount } from "svelte";
  import MonacoEditor from "../MonacoEditor.svelte";
  import Message from "../Message.svelte";

  export let bundle;
  export let selected;
  let dark = false;

  let editor;
  const dispatch = createEventDispatcher();

  onMount(() => dispatch("ready"));

  function debounce(fn, wait = 1000) {
    let timeout;
    return function (...args) {
      clearTimeout(timeout);
      timeout = setTimeout(() => fn.call(this, ...args), wait);
    };
  }

  const darkset = `:global(body) { background-color: #222;color: #fff; }`;
  const handleEditorChange = ({ detail: { value } }) => {
    if (dark) {
      if (value.includes("</style>"))
        value = value.replace("</style>", darkset + "</style>");
      else value += `<style>${darkset}</style>`;
    }
    dispatch("didContentChange", { value });
  };

  export const register_editor = () => editor;
  onMount(() => {
    dark = new URL(window.location.href).searchParams.has("dark");
  });
</script>

<div class="editor-wrapper">
  <div class="editor" translate="no">
    <MonacoEditor
      bind:this={editor}
      on:didContentChange={debounce(handleEditorChange, 1000)}
    />
  </div>

  <div class="info">
    {#if bundle}
      {#if bundle.error}
        <Message
          kind="error"
          details={bundle.error}
          filename="{selected.name}.{selected.type}"
        />
      {:else if bundle.warnings.length > 0}
        {#each bundle.warnings as warning}
          <Message
            kind="warning"
            details={warning}
            filename="{selected.name}.{selected.type}"
          />
        {/each}
      {/if}
    {/if}
  </div>
</div>

<style>
  .editor-wrapper {
    z-index: 5;
    background: var(--back-light);
    display: flex;
    flex-direction: column;
  }

  .editor {
    height: 0;
    flex: 1 1 100%;
  }

  .info {
    background-color: var(--second);
    max-height: 50%;
    overflow: auto;
  }

  :global(.columns) .editor-wrapper {
    /* make it easier to interact with scrollbar */
    padding-right: 8px;
    height: auto;
    /* height: 100%; */
  }
</style>
