<script>
    import { config, id, style, debounce } from "./editor.js";
    import { onMount, createEventDispatcher } from "svelte";

    import EditorWorker from "monaco-editor/esm/vs/editor/editor.worker?worker";
    import TSWorker from "monaco-editor/esm/vs/language/typescript/ts.worker?worker";
    import JSONWorker from "monaco-editor/esm/vs/language/json/json.worker?worker";
    import CSSWorker from "monaco-editor/esm/vs/language/css/css.worker?worker";
    import HTMLWorker from "monaco-editor/esm/vs/language/html/html.worker?worker";

    let //
        monacoEl,
        editor;

    const dispatch = createEventDispatcher();
    onMount(() => {
        import("monaco-editor").then((monaco) => {
            editor = monaco.editor;
            editor.create(document.getElementById(id), config);

            editor.getModels()[0].onDidChangeContent(
                debounce((event) => {
                    const updated = editor.getModels()[0].getValue();
                    dispatch("code", updated);
                }, 500)
            );
        });

        window.MonacoEnvironment = {
            getWorker(_, label) {
                if (label === "typescript" || label === "javascript")
                    return new TSWorker();
                if (label === "json") return new JSONWorker();
                if (label === "css") return new CSSWorker();
                if (label === "html") return new HTMLWorker();
                return new EditorWorker();
            },
        };
    });
</script>

<div {id} {style} bind:this={monacoEl} />
