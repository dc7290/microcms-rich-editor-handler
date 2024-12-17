# Responsive Image Transformer

`Responsive Image` は、`<img>`要素を複数の拡張子とサイズに対応するレスポンシブ画像に変換するTransformerです。

## Type Definition

```ts
const validFormats = ["default", "webp", "avif"] as const;

type Options = {
 /**
  * imgタグの属性に指定する値
  */
 attributes?: {
  [key: string]: string | undefined;
  /**
   * imgタグのsizes属性に指定する値
   * デフォルトは100vw
   */
  sizes?: string;
  /**
   * imgタグのloading属性に指定する値
   * デフォルトはlazy
   */
  loading?: "lazy" | "eager";
  /**
   * imgタグのdecoding属性に指定する値
   * デフォルトはasync
   */
  decoding?: "sync" | "async" | "auto";
 };
 /**
  * サポートする画像の拡張子
  * 先頭の要素がフォールバックの拡張子になり、それ以降順番に優先度が高く最後の要素が最も優先して表示を試みる拡張子になる
  * デフォルトは["default", "webp"]
  */
 formats?: (typeof validFormats)[number][] | undefined;
 /**
  * サポートするデバイスの幅
  * この幅に合わせて画像のサイズが生成される
  * デフォルトは[640, 750, 828, 1080, 1200, 1920, 2048, 3840]
  */
 deviceSizes?: number[] | undefined;
};

/**
 * imgタグをpictureタグを使用したレスポンシブ画像(解像度の切り替え)に変換する
 * https://developer.mozilla.org/ja/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images
 */
const responsiveImageTransformer: (
 options?: Options | undefined,
) => Transformer
```

## Usage

```ts
import { microCMSRichEditorHandler, responsiveImageTransformer } from "microcms-rich-editor-handler";

const html = `
  <img src="https://images.microcms-assets.io/assets/image.png width="1200" height="600" alt="">
`;

const main = async () => {
  const { html: transformedHtml } = await microCMSRichEditorHandler(html, {
    transformers: [responsiveImageTransformer()],
  });

  console.log(transformedHtml); 
};

main();
```

Output

```html
<picture>
 <source 
   type="image/webp"
   srcset="https://images.microcms-assets.io/assets/image.png?w=640&fm=webp 640w, https://images.microcms-assets.io/assets/image.png?w=750&fm=webp 750w, https://images.microcms-assets.io/assets/image.png?w=828&fm=webp 828w, https://images.microcms-assets.io/assets/image.png?w=1080&fm=webp 1080w, https://images.microcms-assets.io/assets/image.png?w=1200&fm=webp 1200w, https://images.microcms-assets.io/assets/image.png?w=1920&fm=webp 1920w, https://images.microcms-assets.io/assets/image.png?w=2048&fm=webp 2048w, https://images.microcms-assets.io/assets/image.png?w=3840&fm=webp 3840w"
   width="1200"
   height="600"
   sizes="100vw"
 >
 <img 
   src="https://images.microcms-assets.io/assets/image.png?w=3840"
   srcset="https://images.microcms-assets.io/assets/image.png?w=640 640w, https://images.microcms-assets.io/assets/image.png?w=750 750w, https://images.microcms-assets.io/assets/image.png?w=828 828w, https://images.microcms-assets.io/assets/image.png?w=1080 1080w, https://images.microcms-assets.io/assets/image.png?w=1200 1200w, https://images.microcms-assets.io/assets/image.png?w=1920 1920w, https://images.microcms-assets.io/assets/image.png?w=2048 2048w, https://images.microcms-assets.io/assets/image.png?w=3840 3840w"
   alt=""
   loading="lazy"
   decoding="async"
   sizes="100vw"
   width="1200"
   height="600"
 >
</picture>
```
