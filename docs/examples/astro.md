# Astro Example

`microcms-rich-editor-handler`をAstroで使用する例です。
フロントマッターでMicroCMSから取得したリッチエディタのHTMLコンテンツを処理し、目次を生成して表示します。

```astro {25-33}
---
import type { MicroCMSListContent } from "microcms-js-sdk";
import { createClient } from "microcms-js-sdk";
import {
 microCMSRichEditorHandler,
 responsiveImageTransformer,
 tocExtractor,
} from "microcms-rich-editor-handler";

const client = createClient({
 serviceDomain: import.meta.env.MICROCMS_SERVICE_DOMAIN,
 apiKey: import.meta.env.MICROCMS_API_KEY,
});

export type Blog = {
 title: string;
 content: string;
} & MicroCMSListContent;

const blogContent = await client.getListDetail<Blog>({
 endpoint: "blogs",
 contentId: "id001",
});

const {
 html,
 data: { toc },
} = await microCMSRichEditorHandler(blogContent.content, {
 transformers: [responsiveImageTransformer()],
 extractors: {
  toc: [tocExtractor(), { phase: "before" }],
 },
});

blogContent.content = html;
---

<main>
  <nav>
    {toc.map((item) => (
      <a href={`#${item.id}`}>{item.text}</a>
    ))}
  </nav>
  <section>
    <h1>{blogContent.title}</h1>
    <div set:html={blogContent.content}></div>
  </section>
</main>
```
