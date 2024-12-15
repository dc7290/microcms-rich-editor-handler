import { describe, expect, test } from "vitest";
import attributesTransformer from "../../src/transformer/attributes";
import { cheerioLoad } from "../test-utils";

describe("attributesTransformer", () => {
	test("正常系: 要素に属性が追加されること", async () => {
		const $ = cheerioLoad(`
      <div id="id"></div>
    `);

		await attributesTransformer({
			elements: {
				div: {
					addAttributes: {
						class: "test-class",
						"data-test": "test-value",
						id: ($element) => {
							const originalId = $element.attr("id");
							return `${originalId}-modified`;
						},
					},
				},
			},
		})($);

		expect($.html()).toBe(`
      <div id="id-modified" class="test-class" data-test="test-value"></div>
    `);
	});
});
