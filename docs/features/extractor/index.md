---
prev:
  text: Attributes Transformer
  link: /features/transformer/attributes
next:
  text: TOC Extractor
  link: /features/extractor/toc
---

# Extractor

`Extractor` は、HTML文字列からデータを抽出する関数です。
見出し要素から目次を表示するためのデータを抽出したり、特定の要素からデータを抽出するために使用します。

## Type Definition

```ts
import type { CheerioAPI } from "cheerio";

export type Extractor<T> = ($: CheerioAPI) => Promise<T> | T;
```

## Creating Custom Extractor

このライブラリが提供しているExtractor以外にも、独自のExtractorを作成することができます。

以下の例では、リンク要素のPDFファイルのリンクを抽出するExtractorを作成しています。

```ts [extractor.ts]
import type { Extractor } from "microcms-rich-editor-handler";

export const pdfLinkExtractor: Extractor<string[]> = ($) => {
  const pdfLinks: string[] = [];

  $("a").each((_, element) => {
    const href = $(element).attr("href");

    if (href && href.endsWith(".pdf")) {
      pdfLinks.push(href);
    }
  });

  return pdfLinks;
};
```

このExtractorを使用するには、`microCMSRichEditorHandler`関数の`options.extractors`に追加します。

```ts [index.ts]
import { microCMSRichEditorHandler } from "microcms-rich-editor-handler";
import { pdfLinkExtractor } from "./extractor";

const html = `
  <a href="document.pdf">Document</a>
  <a href="image.jpg">Image</a>
`;

const main = async () => {
  const { data } = await microCMSRichEditorHandler(html, {
    extractors: {
      pdfLinks: [pdfLinkExtractor],
    },
  });

  console.log(data.pdfLinks);
};

main();
```

Output

```ts
["document.pdf"]
```
