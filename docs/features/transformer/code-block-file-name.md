# Code Block File Name Transformer

`Code Block File Name` は、コードブロックのファイル名を表示するためのTransformerです。
microCMSではコードブロックにファイル名を指定することができ、そのファイル名を表示するために使用します。

## Type Definition

```ts
import type { Transformer } from "./types";

type Options = {
 /**
  * ファイル名を表示する要素のタグ名
  * デフォルトは span
  */
 tagName?: string | undefined
 /**
  * ファイル名を表示する要素に追加する属性
  */
 attributes?: Record<string, string> | undefined;
};

/**
 * コードブロックのファイル名を表示する
 */
const codeBlockFileNameTransformer: (options?: Options | undefined) => Transformer
```

## Usage

```ts
import { microCMSRichEditorHandler, codeBlockFileNameTransformer } from "microcms-rich-editor-handler";

const html = `
  <div data-filename="index.js">
    <pre><code>console.log("Hello, World!")</code></pre>
  </div>
`;

const main = async () => {
  const { html: transformedHtml } = await microCMSRichEditorHandler({
    transformers: [codeBlockFileNameTransformer()],
  });

  console.log(transformedHtml);
};

main();
```

Output:

```html
<div data-filename="index.js">
  <span>index.js</span>
  <pre><code>console.log("Hello, World!")</code></pre>
</div>
```
