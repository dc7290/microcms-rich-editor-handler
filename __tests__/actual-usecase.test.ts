import { describe, expect, test } from "vitest";
import {
	microCMSRichEditorHandler,
	responsiveImageTransformer,
	tocExtractor,
} from "../src";

describe("microCMSRichEditorHandler", () => {
	test("実際に使用するときと同様の処理フロー", async () => {
		expect(() =>
			microCMSRichEditorHandler(
				'<figure><img src="https://images.microcms-assets.io/assets/88f12f69f3bd4e13b769561fe720d255/04a3790c7ab94dff9379025420f60040/blog-template.png" alt="" width="1200" height="630"></figure><h1 id="hoge">hoge</h1><p>test</p>',
				{
					transformers: [responsiveImageTransformer()],
					extractors: {
						test: [tocExtractor(), { phase: "before" }],
					},
				},
			),
		).not.toThrow();
	});
});
