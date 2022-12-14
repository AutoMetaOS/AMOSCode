<script>
  import { setContext, createEventDispatcher } from "svelte";
  import { writable } from "svelte/store";
  import SplitPane from "./SplitPane.svelte";
  import ComponentSelector from "./Input/ComponentSelector.svelte";
  import ModuleEditor from "./Input/ModuleEditor.svelte";
  import Output from "./Output/index.svelte";
  import Bundler from "./Bundler.js";
  import { is_browser } from "./env.js";

  export let workersUrl;
  export let packagesUrl = "https://unpkg.com";
  export let svelteUrl = `${packagesUrl}/svelte`;
  export let embedded = false;
  export let orientation = "columns";
  export let relaxed = false;
  export let fixed = false;
  export let fixedPos = 50;
  export let injectedJS = "";
  export let injectedCSS = "";

  export function toJSON() {
    return {
      imports: $bundle.imports,
      components: $components,
    };
  }

  // this gets called by the parent component on initialization, typically using onMount

  export function initialize(data) {
    if (output_ready && module_editor_ready) set(data);
    else setTimeout(initialize.bind(null, data), 0);
  }

  function set(data) {
    data.components.forEach((component) => {
      component.model = module_editor.createNewModel(
        component.source,
        component.type === "svelte" ? "html" : component.type
      );
    });

    components.set(data.components);
    selected.set(data.components[0]);

    rebundle();

    injectedCSS = data.css || "";
    output.set($selected, $compile_options);
    module_editor.setNewModel(data.components[0].model);
  }

  export function update(data) {
    const { name, type } = $selected || {};

    components.set(data.components);
    data.components.forEach((component) => {
      if (!component.model) {
        component.model = module_editor.createNewModel(
          component.source,
          component.type === "svelte" ? "html" : component.type
        );
      }
    });

    const matched_component = data.components.find(
      (file) => file.name === name && file.type === type
    );
    selected.set(matched_component || data.components[0]);

    injectedCSS = data.css || "";

    if (matched_component) {
      output.update(matched_component, $compile_options);
      module_editor.setNewModel(matched_component.model);
    } else {
      output.set(data.components[0], $compile_options);
      module_editor.setNewModel(data.components[0]);
    }
  }

  if (!workersUrl) {
    throw new Error(`You must supply workersUrl prop to <Repl>`);
  }

  const dispatch = createEventDispatcher();

  const components = writable([]);
  const selected = writable(null);
  const bundle = writable(null);

  const compile_options = writable({
    generate: "dom",
    dev: false,
    css: false,
    hydratable: false,
    customElement: false,
    immutable: false,
    legacy: false,
  });

  let input;
  let output;
  let module_editor;
  let output_ready = false;
  let module_editor_ready = false;

  function register_module_editor() {
    module_editor = input.register_editor();
    module_editor_ready = true;
  }

  let current_token;
  async function rebundle() {
    const token = (current_token = {});
    const result = await bundler.bundle($components);
    if (result && token === current_token) bundle.set(result);
  }

  function handleContentChange(event) {
    selected.update((component) => {
      // TODO this is a bit hacky ??? we're relying on mutability
      // so that updating components works... might be better
      // if a) components had unique IDs, b) we tracked selected
      // *index* rather than component, and c) `selected` was
      component.source = event.detail.value;
      return component;
    });

    components.update((c) => c);

    // recompile selected component
    output.update($selected, $compile_options);

    rebundle();

    dispatch("change", { components: $components });
  }

  setContext("REPL", {
    components,
    selected,
    bundle,
    compile_options,
    rebundle,

    navigate: (item) => {
      const match = /^(.+)\.(\w+)$/.exec(item.filename);
      if (!match) return; // ???

      const [, name, type] = match;
      const component = $components.find(
        (c) => c.name === name && c.type === type
      );
      handle_select(component);

      // TODO select the line/column in question
    },

    handle_delete: (component) => {
      console.log(component);
      module_editor.deleteModel(component);
    },

    request_focus() {
      module_editor.focus();
    },
  });

  function handle_select(component) {
    //creates a model and adds it to the component object for new components
    if (!component.model) {
      component.model = module_editor.createNewModel(
        component.source,
        component.type === "svelte" ? "html" : component.type
      );
    }
    module_editor.setNewModel(component.model);
    selected.set(component);
    output.set($selected, $compile_options);
  }

  let status = null;

  const bundler =
    is_browser &&
    new Bundler({
      workersUrl,
      packagesUrl,
      svelteUrl,
      onstatus: (message) => {
        status = message;
      },
    });

  $: if (output && $selected) {
    output.update($selected, $compile_options);
  }
</script>

<div class="container" class:orientation>
  <SplitPane
    type={orientation === "rows" ? "vertical" : "horizontal"}
    pos={fixed ? fixedPos : orientation === "rows" ? 60 : 50}
    {fixed}
  >
    <section slot="a">
      <ComponentSelector {handle_select} />
      <ModuleEditor
        bind:this={input}
        on:ready={register_module_editor}
        on:didContentChange={handleContentChange}
        bundle={$bundle}
        selected={$selected}
      />
    </section>

    <section slot="b" style="height: 100%;">
      <Output
        bind:this={output}
        on:ready={() => (output_ready = true)}
        {svelteUrl}
        {workersUrl}
        {status}
        {embedded}
        {relaxed}
        {injectedJS}
        {injectedCSS}
      />
    </section>
  </SplitPane>
</div>

<style>
  .container {
    position: relative;
    width: 100%;
    height: 100%;
  }

  .container :global(section) {
    position: relative;
    padding: 42px 0 0 0;
    height: 100%;
    box-sizing: border-box;
  }

  .container :global(section) > :global(*):first-child {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 42px;
    box-sizing: border-box;
  }

  .container :global(section) > :global(*):last-child {
    width: 100%;
    height: 100%;
  }
</style>
