<script>
    import Iframe from "./frame.svelte";
    import Editor from "./editor.svelte";
    import Switch from "./switch.svelte";

    import { wordCount, preprocess, context } from ".";

    // TODO https://github.com/rsms/markdown-wasm
    import MarkdownIt from "markdown-it";
    const mkd = new MarkdownIt();

    let //
        frame,
        md = false,
        dark = true,
        words = "Code",
        oldHT = "";

    const handleCode = ({ detail }) => {
        const htmlURI = md ? mkd.render(detail) : context(detail);
        if (oldHT === htmlURI) return 0;
        oldHT = htmlURI;

        const content = preprocess(htmlURI, dark);
        frame.contentWindow.document.open();
        frame.contentWindow.document.write(content);
        frame.contentWindow.document.close();

        words = md ? wordCount(htmlURI) : "Code";
    };
</script>

<nav class="w-100 ƒ ∆-ar fade-down">
    <div class="fw1 p10" style="font-size: 1.25em;">DEBUG</div>
    <div class="p10">{words}</div>
    <div class="ƒ ∆-ar" style="align-items:center;">
        <Switch bind:checked={dark} label="🌝 🌚" />
        <hr class="m10 h-50 o-25" />
        <Switch bind:checked={md} label="Ⓜ️ ⬇️" />
    </div>
</nav>
<div class="ƒ" id="container">
    <div class="editor fade-right">
        <Editor on:code={handleCode} />
    </div>
    <div id="frame" class="fade-left">
        <Iframe bind:frame />
    </div>
</div>

<style lang="scss">
    :root {
        --navHeight: 50px;
    }

    nav {
        border-bottom: 1px solid #fff2;
        height: calc(var(--navHeight) - 1px);
        background: #1e1e1e;
        div {
            flex: 1;
            text-align: center;
        }
    }

    #container {
        width: 100vw;
        height: calc(100vh - var(--navHeight));
        overflow: hidden;
    }

    #frame,
    .editor {
        width: 50vw;
        height: 100%;
    }
</style>
