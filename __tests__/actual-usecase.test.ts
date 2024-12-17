import { describe, expect, test } from "vitest";
import {
	microCMSRichEditorHandler,
	responsiveImageTransformer,
	syntaxHighlightingByShikiTransformer,
	tocExtractor,
} from "../src";

describe("microCMSRichEditorHandler", () => {
	test("実際に使用するときと同様の処理フロー", async () => {
		const { html, data } = await microCMSRichEditorHandler(
			'<h1 id="ha879678dfe">見出し1</h1><h2 id="had7ce3f1cb">見出し2</h2><figure><img src="https://images.microcms-assets.io/assets/88f12f69f3bd4e13b769561fe719d255/04a3790c7ab94dff9379027920f60040/blog-template.png" alt="" width="1200" height="630"></figure><div data-filename="aaa"><pre><code class="language-javascript">import aaa from &apos;ccc&apos;;\n\naaa();</code></pre></div><pre><code>import aaa from &apos;ccc&apos;;\n\naaa();</code></pre><div style="left: 0; width: 100%; height: 0; position: relative; padding-bottom: 56.25%;"><iframe src="https://www.youtube.com/embed/zknKqGwCiSs?rel=0" style="top: 0; left: 0; width: 100%; height: 100%; position: absolute; border: 0;" allowfullscreen scrolling="no" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share;"></iframe></div>',
			{
				transformers: [
					responsiveImageTransformer(),
					syntaxHighlightingByShikiTransformer({
						defaultHighlightOptions: {
							lang: "text",
							theme: "vitesse-light",
						},
					}),
				],
				extractors: {
					toc: [tocExtractor(), { phase: "before" }],
				},
			},
		);

		console.log(html);

		expect(html).toBe(
			'<h1 id="ha879678dfe">&#x898b;&#x51fa;&#x3057;1</h1><h2 id="had7ce3f1cb">&#x898b;&#x51fa;&#x3057;2</h2><figure><picture><source type="image/webp" sizes="100vw" width="1200" height="630" srcset="https://images.microcms-assets.io/assets/88f12f69f3bd4e13b769561fe719d255/04a3790c7ab94dff9379027920f60040/blog-template.png?w=640&amp;fm=webp 640w, https://images.microcms-assets.io/assets/88f12f69f3bd4e13b769561fe719d255/04a3790c7ab94dff9379027920f60040/blog-template.png?w=750&amp;fm=webp 750w, https://images.microcms-assets.io/assets/88f12f69f3bd4e13b769561fe719d255/04a3790c7ab94dff9379027920f60040/blog-template.png?w=828&amp;fm=webp 828w, https://images.microcms-assets.io/assets/88f12f69f3bd4e13b769561fe719d255/04a3790c7ab94dff9379027920f60040/blog-template.png?w=1080&amp;fm=webp 1080w, https://images.microcms-assets.io/assets/88f12f69f3bd4e13b769561fe719d255/04a3790c7ab94dff9379027920f60040/blog-template.png?w=1200&amp;fm=webp 1200w, https://images.microcms-assets.io/assets/88f12f69f3bd4e13b769561fe719d255/04a3790c7ab94dff9379027920f60040/blog-template.png?w=1920&amp;fm=webp 1920w, https://images.microcms-assets.io/assets/88f12f69f3bd4e13b769561fe719d255/04a3790c7ab94dff9379027920f60040/blog-template.png?w=2048&amp;fm=webp 2048w, https://images.microcms-assets.io/assets/88f12f69f3bd4e13b769561fe719d255/04a3790c7ab94dff9379027920f60040/blog-template.png?w=3840&amp;fm=webp 3840w"><img src="https://images.microcms-assets.io/assets/88f12f69f3bd4e13b769561fe719d255/04a3790c7ab94dff9379027920f60040/blog-template.png?w=3840" alt width="1200" height="630" sizes="100vw" loading="lazy" decoding="async" srcset="https://images.microcms-assets.io/assets/88f12f69f3bd4e13b769561fe719d255/04a3790c7ab94dff9379027920f60040/blog-template.png?w=640 640w, https://images.microcms-assets.io/assets/88f12f69f3bd4e13b769561fe719d255/04a3790c7ab94dff9379027920f60040/blog-template.png?w=750 750w, https://images.microcms-assets.io/assets/88f12f69f3bd4e13b769561fe719d255/04a3790c7ab94dff9379027920f60040/blog-template.png?w=828 828w, https://images.microcms-assets.io/assets/88f12f69f3bd4e13b769561fe719d255/04a3790c7ab94dff9379027920f60040/blog-template.png?w=1080 1080w, https://images.microcms-assets.io/assets/88f12f69f3bd4e13b769561fe719d255/04a3790c7ab94dff9379027920f60040/blog-template.png?w=1200 1200w, https://images.microcms-assets.io/assets/88f12f69f3bd4e13b769561fe719d255/04a3790c7ab94dff9379027920f60040/blog-template.png?w=1920 1920w, https://images.microcms-assets.io/assets/88f12f69f3bd4e13b769561fe719d255/04a3790c7ab94dff9379027920f60040/blog-template.png?w=2048 2048w, https://images.microcms-assets.io/assets/88f12f69f3bd4e13b769561fe719d255/04a3790c7ab94dff9379027920f60040/blog-template.png?w=3840 3840w"></picture></figure><div data-filename="aaa"><pre class="shiki vitesse-light" style="background-color:#ffffff;color:#393a34" tabindex="0"><code><span class="line"><span>import aaa from &apos;ccc&apos;;</span></span>\n<span class="line"><span></span></span>\n<span class="line"><span>aaa();</span></span></code></pre></div><pre class="shiki vitesse-light" style="background-color:#ffffff;color:#393a34" tabindex="0"><code><span class="line"><span>import aaa from &apos;ccc&apos;;</span></span>\n<span class="line"><span></span></span>\n<span class="line"><span>aaa();</span></span></code></pre><div style="left: 0; width: 100%; height: 0; position: relative; padding-bottom: 56.25%;"><iframe src="https://www.youtube.com/embed/zknKqGwCiSs?rel=0" style="top: 0; left: 0; width: 100%; height: 100%; position: absolute; border: 0;" allowfullscreen scrolling="no" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share;"></iframe></div>',
		);
		expect(data).toEqual({
			toc: [
				{
					id: "ha879678dfe",
					level: 1,
					text: "見出し1",
				},
				{
					id: "had7ce3f1cb",
					level: 2,
					text: "見出し2",
				},
			],
		});
	});
});
