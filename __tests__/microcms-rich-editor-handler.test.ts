import type { CheerioAPI } from "cheerio";
import { describe, expect, test, vi } from "vitest";
import { microCMSRichEditorHandler } from "../src";

describe("microCMSRichEditorHandler", () => {
	test("指定したtransformerが実行されること", async () => {
		const testTransformer = vi.fn();

		await microCMSRichEditorHandler("<p>test</p>", {
			transformers: [testTransformer],
		});

		expect(testTransformer).toHaveBeenCalledTimes(1);
	});

	test("transformerは配列に渡した順番通りに実行されること", async () => {
		const testTransformer1 = vi.fn(async ($: CheerioAPI) => {
			$("p").text("transformed1");
		});
		const testTransformer2 = vi.fn(async ($: CheerioAPI) => {
			$("p").text("transformed2");
		});

		const { html } = await microCMSRichEditorHandler("<p>test</p>", {
			transformers: [testTransformer1, testTransformer2],
		});

		expect(testTransformer1).toHaveBeenCalledTimes(1);
		expect(testTransformer2).toHaveBeenCalledTimes(1);
		expect(html).toBe("<p>transformed2</p>");
	});

	test("指定したextractorが実行されて、dataで返ること", async () => {
		const testExtractor = vi.fn(async () => "test");

		const { data } = await microCMSRichEditorHandler("<p>test</p>", {
			extractors: {
				test: [testExtractor],
			},
		});

		expect(testExtractor).toHaveBeenCalledTimes(1);
		expect(data.test).toBe("test");
	});

	test("extractorのphaseが指定されている場合、そのphaseで実行されること", async () => {
		const testTransformer = vi.fn(async ($: CheerioAPI) => {
			$("p").text("transformed");
		});
		const testExtractor = vi.fn(async ($: CheerioAPI) => $("p").text());

		const { html, data } = await microCMSRichEditorHandler("<p>test</p>", {
			transformers: [testTransformer],
			extractors: {
				test: [testExtractor, { phase: "before" }],
			},
		});

		expect(testExtractor).toHaveBeenCalledTimes(1);
		expect(data.test).toBe("test");
		expect(html).toBe("<p>transformed</p>");
	});

	test("extractor内でHTMLに処理を加えても返すhtmlに影響がないこと", async () => {
		const testExtractor = vi.fn(async ($: CheerioAPI) => {
			$("p").text("extracted");
			return $("p").text();
		});

		const { html, data } = await microCMSRichEditorHandler("<p>test</p>", {
			extractors: {
				test: [testExtractor],
			},
		});

		expect(testExtractor).toHaveBeenCalledTimes(1);
		expect(data.test).toBe("extracted");
		expect(html).toBe("<p>test</p>");
	});
});
