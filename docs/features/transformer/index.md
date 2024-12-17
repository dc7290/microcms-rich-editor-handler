---
prev:
  text: Handler
  link: /features/handler
next: 
  text: Responsive Image
  link: /features/transformer/responsive-image
---

# Transformer

TransformerはHTML文字列を変換するための関数です。

## Type Definition

```ts
import type { CheerioAPI } from "cheerio";

export type Transformer = ($: CheerioAPI) => Promise<void> | void;
```

## Creating Custom Transformer

このライブラリが提供しているTransformer以外にも、独自のTransformerを作成することができます。

以下の例では、`<img>`要素に`loading="lazy"`属性を追加するTransformerを作成しています。

```ts [transformer.ts]
import type { Transformer } from "microcms-rich-editor-handler";

export const lazyLoadImageTransformer: Transformer = ($) => {
  $("img").attr("loading", "lazy");
};
```

このTransformerを使用するには、`microCMSRichEditorHandler`関数の`options.transformers`に追加します。

```ts [index.ts]
import { microCMSRichEditorHandler } from "microcms-rich-editor-handler";
import { lazyLoadImageTransformer } from "./transformer";

const html = `
  <img src="image.jpg" alt="Image">
`;

const main = async () => {
  const { html: transformedHtml } = await microCMSRichEditorHandler(html, {
    transformers: [lazyLoadImageTransformer],
  });

  console.log(transformedHtml);
};

main();
```

Output

```html
<img src="image.jpg" alt="Image" loading="lazy">
```
