# Lazy Loading Example

`img`要素と`iframe`要素に`loading="lazy"`属性を追加する例です。
AttributesTransformerを使用して、`img`要素と`iframe`要素に`loading="lazy"`属性を追加します。

```ts
import { microCMSRichEditorHandler, attributesTransformer } from "microcms-rich-editor-handler";

const html = `
  <img src="image.jpg" alt="Image">
  <iframe src="https://www.youtube.com/embed/VIDEO_ID" title="YouTube video" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"></iframe>
`;

const main = async () => {
  const { html: transformedHtml } = await microCMSRichEditorHandler(html, {
    transformers: [
      attributesTransformer({
        elements: {
          img: {
            addAttributes: {
              loading: "lazy",
            },
          },
          iframe: {
            addAttributes: {
              loading: "lazy",
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
<img src="image.jpg" alt="Image" loading="lazy">
<iframe src="https://www.youtube.com/embed/VIDEO_ID" title="YouTube video" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" loading="lazy"></iframe>
```
