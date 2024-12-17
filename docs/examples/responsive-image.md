# Responsive Image Example

`<img>`要素を複数の拡張子とサイズに対応するレスポンシブ画像に変換する例です。
`responsiveImageTransformer`を使用して、`<img>`要素をレスポンシブ画像に変換します。

```ts
import { microCMSRichEditorHandler, responsiveImageTransformer } from "microcms-rich-editor-handler";

const html = `
  <img src="https://images.microcms-assets.io/assets/image.png" width="1200" height="600" alt="">
`;

const main = async () => {
  const { html: transformedHtml } = await microCMSRichEditorHandler(html, {
    transformers: [
      responsiveImageTransformer({
        attributes: {
          sizes: "(min-width: 768px) 920px, 95vw"
        },
        formats: ["webp", "avif"],
        deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
      }),
    ],
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
  srcset="https://images.microcms-assets.io/assets/image.webp 640w, https://images.microcms-assets.io/assets/image.webp 750w, https://images.microcms-assets.io/assets/image.webp 828w, https://images.microcms-assets.io/assets/image.webp 1080w, https://images.microcms-assets.io/assets/image.webp 1200w, https://images.microcms-assets.io/assets/image.webp 1920w, https://images.microcms-assets.io/assets/image.webp 2048w, https://images.microcms-assets.io/assets/image.webp 3840w" 
  sizes="(min-width: 768px) 920px, 95vw" 
  width="1200" 
  height="600">
 <img 
  src="https://images.microcms-assets.io/assets/image.png?w=3840" 
  srcset="https://images.microcms-assets.io/assets/image.png?w=640 640w, https://images.microcms-assets.io/assets/image.png?w=750 750w, https://images.microcms-assets.io/assets/image.png?w=828 828w, https://images.microcms-assets.io/assets/image.png?w=1080 1080w, https://images.microcms-assets.io/assets/image.png?w=1200 1200w, https://images.microcms-assets.io/assets/image.png?w=1920 1920w, https://images.microcms-assets.io/assets/image.png?w=2048 2048w, https://images.microcms-assets.io/assets/image.png?w=3840 3840w" 
  alt="" 
  loading="lazy"
  decoding="async"
  sizes="(min-width: 768px) 920px, 95vw"
  width="1200"
  height="600">
</picture>
```
