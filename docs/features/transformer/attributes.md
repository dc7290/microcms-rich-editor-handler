# Attributes Transformer

`Attributes Transformer` は、HTML要素の属性に値を追加したり、元々の値を変更するTransformerです。

## Type Definition

```ts
import type { Cheerio, SelectorType } from "cheerio";
import type { Element } from "domhandler";
import type { Transformer } from "./types";

type Options = {
 /**
  * 処理したい要素の一覧
  */
 elements: {
  /**
   * 要素名
   */
  [tagName: string]: {
   /**
    * 追加・変更したい属性名と値の一覧
    * 単純な文字列のほかに対象の要素を引数に取る関数を指定することもできる
    */
   addAttributes: {
    [attributeName: string]:
     | string
     | (($element: Cheerio<Element>) => string);
   };
  };
 };
};

/**
 * 任意の要素に対して属性を追加したり変更したりする
 */
const attributesTransformer: (options: Options) => Transformer
```

## Usage

```ts
import { microCMSRichEditorHandler, attributesTransformer } from "microcms-rich-editor-handler";

const html = `
  <p>Text<span class="custom-class1">Text</span></p>
`;

const main = async () => {
  const { html: transformedHtml } = await microCMSRichEditorHandler(html, {
    transformers: [
      attributesTransformer({
        elements: {
          p: {
            addAttributes: {
              class: "text-gray-500",
            },
          },
          span: {
            addAttributes: {
              style: ($element) => {
                const className = $element.attr("class");
                if (className === "custom-class1") {
                  return "color: red;";
                }

                return "";
              },
            },
          },
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
<p class="text-gray-500">Text<span class="custom-class1" style="color: red;">Text</span></p>
```
