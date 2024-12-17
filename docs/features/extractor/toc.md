# TOC Extractor

`TOC Extractor` は、HTML文字列から見出し要素を抽出して目次リストのデータを生成するExtractorです。

## Type Definition

```ts
import type { Extractor } from "./types";

const defaultTargetLevels = [1, 2, 3, 4, 5] as const;

type Options = {
 /**
  * 目次を生成する際に無視する見出しのレベル
  */
 ignoreLevels?: (typeof defaultTargetLevels)[number][];
};

type TocItem = {
 id: string;
 text: string;
 level: number;
};

// 目次リストを抽出する
const tocExtractor: (options?: Options | undefined) => Extractor<TocItem[]>
```

## Usage

```ts
import { microCMSRichEditorHandler, tocExtractor } from "microcms-rich-editor-handler";

const html = `
<h1 id="id1">Heading 1-1</h1>
<h2 id="id2">Heading 1-2</h2>
<h3 id="id3">Heading 1-3</h3>
<h1 id="id4">Heading 2-1</h1>
<h2 id="id5">Heading 2-2</h2>
<h3 id="id6">Heading 2-3</h3>
<h4 id="id7">Heading 2-4</h4>
<h5 id="id8">Heading 2-5</h5>
`;

const main = async () => {
 const { data } = await microCMSRichEditorHandler(html, {
   extractors: {
     toc: [tocExtractor()],
   },
 });

 console.log(data.toc);
};

main();
```

Output

```ts
[
  { id: "id1", text: "Heading 1-1", level: 1 },
  { id: "id2", text: "Heading 1-2", level: 2 },
  { id: "id3", text: "Heading 1-3", level: 3 },
  { id: "id4", text: "Heading 2-1", level: 1 },
  { id: "id5", text: "Heading 2-2", level: 2 },
  { id: "id6", text: "Heading 2-3", level: 3 },
  { id: "id7", text: "Heading 2-4", level: 4 },
  { id: "id8", text: "Heading 2-5", level: 5 },
]
```
