# Syntax Highlighting By Shiki Transformer

[`shiki`](https://shiki.style/) パッケージを使用してコードブロックのシンタックスハイライトを行う Transformer です。

## Type Definition

```ts
import type { BundledLanguage, BundledTheme, CodeToHastOptions } from "shiki";

import type { Transformer } from "./types";

type Options = {
 /**
  * 言語ごとのシンタックスハイライトの設定
  */
 highlightOptions?:
  | Partial<
    Record<
     BundledLanguage,
     CodeToHastOptions<BundledLanguage, BundledTheme>
    >
    >
  | undefined;
 /**
  * highlightOptionsで設定していない言語やmicroCMSのコードブロックに言語が指定されていない場合の設定
  */
 defaultHighlightOptions: CodeToHastOptions<BundledLanguage, BundledTheme>;
};

/**
 * preタグ内のコードブロックをshikiを使ってシンタックスハイライトする
 */
const syntaxHighlightingByShikiTransformer: (options: Options) => Transformer
```

## Usage

追加で`shiki`パッケージをインストールする必要があります。

::: code-group

```sh [npm]
npm install shiki
```

```sh [yarn]
yarn add shiki
```

```sh [pnpm]
pnpm add shiki
```

:::

```ts
import { microCMSRichEditorHandler, syntaxHighlightingByShikiTransformer } from "microcms-rich-editor-handler";

const html = `
  <pre><code class="language-javascript">console.log("Hello, World!")</code></pre>
  <pre><code>console.log("Hello, World!")</code></pre>
`;

const main = async () => {
  const { html: transformedHtml } = await microCMSRichEditorHandler(html, {
    transformers: [
      syntaxHighlightingByShikiTransformer({
        highlightOptions: {
          javascript: {
            lang: "javascript",
            theme: "github-dark",
          },
        },
        defaultHighlightOptions: {
          lang: "text",
          theme: "vitesse-dark",
        },
      }),
    ],
  });

  console.log(transformedHtml);
};

main();
```

Output

```html
<pre class="shiki github-dark" style="background-color:#24292e;color:#e1e4e8" tabindex="0"><code><span class="line"><span style="color:#E1E4E8">console.</span><span style="color:#B392F0">log</span><span style="color:#E1E4E8">(</span><span style="color:#9ECBFF">"Hello, World!"</span><span style="color:#E1E4E8">)</span></span></code></pre>
<pre class="shiki vitesse-dark" style="background-color:#121212;color:#dbd7caee" tabindex="0"><code><span class="line"><span>console.log("Hello, World!")</span></span></code></pre>
```

見た目は以下のようになります。

<pre class="shiki github-dark" style="background-color:#24292e;color:#e1e4e8" tabindex="0"><code><span class="line"><span style="color:#E1E4E8">console.</span><span style="color:#B392F0">log</span><span style="color:#E1E4E8">(</span><span style="color:#9ECBFF">"Hello, World!"</span><span style="color:#E1E4E8">)</span></span></code></pre>
<pre class="shiki vitesse-dark" style="background-color:#121212;color:#dbd7caee" tabindex="0"><code><span class="line"><span>console.log("Hello, World!")</span></span></code></pre>
