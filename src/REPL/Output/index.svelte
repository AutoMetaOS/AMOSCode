<script>
  import { createEventDispatcher, onMount } from "svelte";
  import { marked } from "marked";
  import Viewer from "./Viewer.svelte";
  import Compiler from "./Compiler.js";
  import { is_browser } from "../env.js";
  import { uuid } from "predefined";

  const dispatch = createEventDispatcher();

  onMount(() => dispatch("ready"));

  export let svelteUrl;
  export let workersUrl;
  export let status;
  export let runtimeError = null;
  export let relaxed = false;
  export let injectedJS;
  export let injectedCSS;

  const genid = () => `${uuid().split("-")[0]}-${(+new Date()).toString(36)}`;
  $: render_id = genid();

  export async function set(selected, options) {
    selected_type = selected.type;

    if (selected.type === "js" || selected.type === "json") {
      js_editor.setValue(`/* Select a component to see its compiled code */`);
      css_editor.setValue(`/* Select a component to see its compiled code */`);

      return;
    }

    if (selected.type === "md") {
      markdown = marked(selected.source);
      return;
    }

    const compiled = await compiler.compile(selected, options);
    if (!js_editor) return; // unmounted

    if (!jsModel) {
      jsModel = js_editor.createNewModel(compiled.js, "javascript");
      cssModel = css_editor.createNewModel(compiled.css, "css");
      js_editor.setNewModel(jsModel);
      css_editor.setNewModel(cssModel);
    } else {
      js_editor.setValue(compiled.js);
      css_editor.setValue(compiled.css);
    }
  }

  export async function update(selected, options) {
    render_id = genid();
    if (selected.type === "js" || selected.type === "json") return;

    if (selected.type === "md") return (markdown = marked(selected.source));

    const compiled = await compiler.compile(selected, options);
    if (!js_editor) return; // unmounted

    js_editor.setValue(compiled.js);
    css_editor.setValue(compiled.css);
  }

  const compiler = is_browser && new Compiler(workersUrl, svelteUrl);

  // refs
  let js_editor;
  let css_editor;
  let jsModel;
  let cssModel;

  let view = "result";
  let selected_type = "";
  let markdown = "";
</script>

<div class="view-toggle">
  {#if selected_type === "md"}
    <button class="active">Markdown</button>
  {:else}
    <button class:active={view === "result"} on:click={() => (view = "result")}>
      Result: {render_id}
    </button>
  {/if}
</div>

<div
  class="tab-content"
  class:visible={selected_type !== "md" && view === "result"}
>
  <Viewer
    bind:error={runtimeError}
    {status}
    {relaxed}
    {injectedJS}
    {injectedCSS}
  />
</div>

<!-- markdown output -->
<div class="tab-content" class:visible={selected_type === "md"}>
  <iframe title="Markdown" srcdoc={markdown} />
</div>

<style>
  .view-toggle {
    height: var(--pane-controls-h);
    background: #222;
    border-bottom: 1px solid #fff2;
    white-space: nowrap;
    box-sizing: border-box;
  }

  button {
    text-align: left;
    position: relative;
    font: 400 12px/1.5 var(--font);
    border: none;
    border-bottom: 3px solid transparent;
    padding: 12px 12px 8px 12px;
    color: #ccc;
    border-radius: 0;
  }

  button.active {
    border-bottom: 3px solid var(--prime);
    color: #fff;
  }

  .tab-content {
    position: absolute;
    width: 100%;
    height: calc(100% - 42px) !important;
    opacity: 0;
    pointer-events: none;
  }

  .tab-content.visible {
    /* can't use visibility due to a weird painting bug in Chrome */
    opacity: 1;
    pointer-events: all;
  }
  iframe {
    width: 100%;
    height: 100%;
    border: none;
    display: block;
  }
</style>
