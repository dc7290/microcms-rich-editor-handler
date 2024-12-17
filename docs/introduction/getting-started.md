# Getting Started

## Installation

### Prerequisites

- Node.js バージョン18以上
- npm, yarn, pnpmのいずれか
- microCMSからデータを取得する実装

::: code-group

```sh [npm]
npm install microcms-rich-editor-handler
```

```sh [yarn]
yarn add microcms-rich-editor-handler
```

```sh [pnpm]
pnpm add microcms-rich-editor-handler
```

:::

## Usage

次のように使用します。

```js
import {
 microCMSRichEditorHandler,
 responsiveImageTransformer,
 tocExtractor
} from 'microcms-rich-editor-handler';

const { html, data } = await microCMSRichEditorHandler(
 dataFromMicroCMS, // MicroCMSから取得したデータのリッチエディタのHTML文字列
 {
  transformers: [responsiveImageTransformer()],
  extractors: {
   toc: [tocExtractor(), { phase: "before" }],
  },
 },
);

console.log(html); // 変換後のHTML文字列
console.log(data); // 抽出したデータ
console.log(data.toc); // tocExtractorによって抽出した目次リストのデータ
```

`microCMSRichEditorHandler` が基本となる関数で、第1引数にMicroCMSから取得したデータのリッチエディタのHTML文字列、第2引数にオプションを渡します。オプションには `transformers` と `extractors` を指定できます。

`transformers` はリッチエディタのHTML文字列を変換する関数の配列です。  
`extractors` はリッチエディタのHTML文字列からデータを抽出する関数の集合です。

これらに渡す関数はライブラリが提供しているもの以外にも、独自の関数を作成して指定することができます。
