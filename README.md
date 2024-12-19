
<p align="center"><h1 align="center">microCMS RichEditor Handler</h1></p>
<p align="center">
 <em>microCMSのリッチエディタコンテンツを変換したりデータを抽出します。</em>
</p>
<p align="center">
<a href="https://www.npmjs.com/package/microcms-rich-editor-handler" target="_blank"><img alt="npm" src="https://img.shields.io/npm/v/microcms-rich-editor-handler"></a>
<!-- <a href="https://npmcharts.com/compare/microcms-rich-editor-handler?minimal=true" target="_blank"><img alt="downloads" src="https://img.shields.io/npm/dt/microcms-rich-editor-handler"></a> -->
<a href="https://www.npmjs.com/package/microcms-rich-editor-handler" target="__blank"><img alt="License" src="https://img.shields.io/npm/l/microcms-rich-editor-handler?label=License"></a>
<a href="https://github.com/microcmsio/microcms-rich-editor-handler/actions/workflows/node.js.yml" target="_blank"><img alt="Node.js CI" src="https://github.com/microcmsio/microcms-rich-editor-handler/actions/workflows/node.js.yml/badge.svg"></a>
<!-- <a href="https://github.com/microcmsio/microcms-rich-editor-handler/stargazers" target="_blank"><img alt="GitHub Repo stars" src="https://img.shields.io/github/stars/microcmsio/microcms-rich-editor-handler?style=social"></a> -->
</p>

[ドキュメントサイト](https://microcms-rich-editor-handler.vercel.app)

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
