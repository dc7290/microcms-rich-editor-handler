
<p align="center"><h1 align="center">microCMS RichEditor Handler</h1></p>
<p align="center">
 <em>microCMSのリッチエディタコンテンツを変換したりデータを抽出します。</em>
</p>
<p align="center">
 <img src="https://img.shields.io/github/license/dc7290/microcms-rich-editor-handler?style=default&logo=opensourceinitiative&logoColor=white&color=0080ff" alt="license">
 <img src="https://img.shields.io/github/last-commit/dc7290/microcms-rich-editor-handler?style=default&logo=git&logoColor=white&color=0080ff" alt="last-commit">
 <img src="https://img.shields.io/github/languages/top/dc7290/microcms-rich-editor-handler?style=default&color=0080ff" alt="repo-top-language">
 <img src="https://img.shields.io/github/languages/count/dc7290/microcms-rich-editor-handler?style=default&color=0080ff" alt="repo-language-count">
</p>

## Table of Contents

- [Table of Contents](#table-of-contents)
- [Overview](#overview)
- [Getting Started](#getting-started)
  - [Installation](#installation)
  - [Usage](#usage)
- [License](#license)

## Overview

**MicroCMS Rich Editor Handler**は、MicroCMSのリッチエディタコンテンツを処理し、HTMLコンテンツを変換、データを抽出するためのユーティリティです。  
Cheerioを使用してHTMLコンテンツを解析し、imgタグから複数フォーマットをサポートするpictureタグに変換したり、コードブロックに対してシンタックスハイライトを適用したりします。また、HTMLコンテンツの内容から特定のデータを抽出する機能も提供しており、見出し要素から目次を生成することもできます。  
これらの機能はプラグインのように付け替え可能な設計になっているため、必要に応じて選択することもでき、さらにユーザー自身が独自の処理を追加することも可能です。

## Getting Started

### Installation

```sh
npm install microcms-rich-editor-handler
# or
yarn add microcms-rich-editor-handler
# or
pnpm add microcms-rich-editor-handler
```

### Usage

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

## License

microcms-rich-editor-handlerはMITライセンスで利用可能です。
