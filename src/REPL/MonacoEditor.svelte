<script>
  import { onMount } from "svelte";
  import * as monaco from "monaco-editor";
  import { createEventDispatcher } from "svelte";

  let editorDOM;
  let editor;

  export let readonly = false;

  export function createNewModel(text, type) {
    let model = monaco.editor.createModel(text, type);
    model.onDidChangeContent((e) => {
      dispatch("didContentChange", {
        value: model.getValue(),
      });
    });
    return model.uri;
  }

  export function setNewModel(model_uri) {
    let modelInstance = monaco.editor.getModel(model_uri);
    editor.setModel(modelInstance);
  }

  export function deleteModel(model_uri) {
    monaco.editor.getModel(model_uri).dispose();
  }

  export function focus() {
    editor.focus();
  }

  export function setValue(code) {
    editor.setValue(code);
  }

  export function layout() {
    console.log("cool");
  }

  const dispatch = createEventDispatcher();

  onMount(() => {
    editor = monaco.editor.create(editorDOM, {
      model: null,
      tabSize: 4,
      scrollBeyondLastLine: false,
      fontLigatures: true,
      fontFamily: "Fira Code",
      fontSize: 16,
      theme: "vs-dark",
      wordWrapColumn: 60,
      wordWrapMinified: true,
      wrappingIndent: "indent",
      scrollBeyondLastLine: false,
      readOnly: readonly,
      wordWrap: "on",
      automaticLayout: true,
      minimap: {
        enabled: false,
      },
    });
  });
</script>

<div id="container" bind:this={editorDOM} />

<style>
  div {
    width: 100%;
    height: 100%;
  }
</style>
