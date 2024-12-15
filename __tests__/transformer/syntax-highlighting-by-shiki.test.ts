import { describe, expect, test } from "vitest";
import syntaxHighlightingByShikiTransformer from "../../src/transformer/syntax-highlighting-by-shiki";
import { cheerioLoad } from "../test-utils";

describe("syntaxHighlightingByShikiTransformer", () => {
	test("正常系: 設定した言語のシンタックスハイライトが適用され、コードブロックに言語が指定されていない場合はdefaultHighlightOptionsが適用されること", async () => {
		const $ = cheerioLoad(`
      <pre><code class="language-javascript">console.log("Hello, World!")</code></pre>
      <pre><code>console.log("Hello, World!")</code></pre>
    `);

		await syntaxHighlightingByShikiTransformer({
			highlightOptions: {
				javascript: {
					lang: "javascript",
					theme: "github-dark",
				},
			},
			defaultHighlightOptions: {
				lang: "text",
				theme: "vitesse-dark",
			},
		})($);

		expect($.html()).toBe(`
      <pre class="shiki github-dark" style="background-color:#24292e;color:#e1e4e8" tabindex="0"><code><span class="line"><span style="color:#E1E4E8">console.</span><span style="color:#B392F0">log</span><span style="color:#E1E4E8">(</span><span style="color:#9ECBFF">"Hello, World!"</span><span style="color:#E1E4E8">)</span></span></code></pre>
      <pre class="shiki vitesse-dark" style="background-color:#121212;color:#dbd7caee" tabindex="0"><code><span class="line"><span>console.log("Hello, World!")</span></span></code></pre>
    `);
	});

	test("正常系: highlightOptionsに指定した言語が存在しない場合はdefaultHighlightOptionsが適用されること", async () => {
		const $ = cheerioLoad(`
      <pre><code class="language-javascript">console.log("Hello, World!")</code></pre>
    `);

		await syntaxHighlightingByShikiTransformer({
			defaultHighlightOptions: {
				lang: "text",
				theme: "vitesse-dark",
			},
		})($);

		expect($.html()).toBe(`
      <pre class="shiki vitesse-dark" style="background-color:#121212;color:#dbd7caee" tabindex="0"><code><span class="line"><span>console.log("Hello, World!")</span></span></code></pre>
    `);
	});

	test("異常系: optionsが指定されていない場合はエラーが発生すること", async () => {
		const $ = cheerioLoad(`
      <pre><code class="language-javascript">console.log("Hello, World!")</code></pre>
    `);

		await expect(() =>
			// @ts-ignore
			syntaxHighlightingByShikiTransformer(undefined)($),
		).rejects.toThrowError("options is required");
	});

	test("異常系: defaultHighlightOptionsが指定されていない場合はエラーが発生すること", async () => {
		const $ = cheerioLoad(`
      <pre><code class="language-javascript">console.log("Hello, World!")</code></pre>
    `);

		await expect(() =>
			// @ts-ignore
			syntaxHighlightingByShikiTransformer({})($),
		).rejects.toThrowError("defaultHighlightOptions is required");
	});
});
