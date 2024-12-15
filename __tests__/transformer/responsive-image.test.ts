import { describe, expect, test, vi } from "vitest";
import responsiveImageTransformer from "../../src/transformer/responsive-image";
import { cheerioLoad } from "../test-utils";

describe("ResponsiveImageTransformer", () => {
	test("正常系: imgタグの属性を使ってpictureタグに置き換わること", () => {
		const $ = cheerioLoad(`<figure>
      <img
        src="https://images.microcms-assets.io/assets/88f12f69f3bd4e13b769561fe720d255/04a3790c7ab94dff9379025420f60040/blog-template.png"
        alt=""
        width="1200"
        height="630"
      >
    </figure>`);

		responsiveImageTransformer({
			attributes: { sizes: "(max-width: 640px) 100vw, 1200px" },
		})($);

		// <picture>タグの中の <source>タグを抽出
		const sourceTags = $("picture source");

		// ここでは srcset 属性を比較
		const srcset = sourceTags.attr("srcset");
		const expectedSrcset =
			"https://images.microcms-assets.io/assets/88f12f69f3bd4e13b769561fe720d255/04a3790c7ab94dff9379025420f60040/blog-template.png?w=640&fm=webp 640w, https://images.microcms-assets.io/assets/88f12f69f3bd4e13b769561fe720d255/04a3790c7ab94dff9379025420f60040/blog-template.png?w=750&fm=webp 750w, https://images.microcms-assets.io/assets/88f12f69f3bd4e13b769561fe720d255/04a3790c7ab94dff9379025420f60040/blog-template.png?w=828&fm=webp 828w, https://images.microcms-assets.io/assets/88f12f69f3bd4e13b769561fe720d255/04a3790c7ab94dff9379025420f60040/blog-template.png?w=1080&fm=webp 1080w, https://images.microcms-assets.io/assets/88f12f69f3bd4e13b769561fe720d255/04a3790c7ab94dff9379025420f60040/blog-template.png?w=1200&fm=webp 1200w, https://images.microcms-assets.io/assets/88f12f69f3bd4e13b769561fe720d255/04a3790c7ab94dff9379025420f60040/blog-template.png?w=1920&fm=webp 1920w, https://images.microcms-assets.io/assets/88f12f69f3bd4e13b769561fe720d255/04a3790c7ab94dff9379025420f60040/blog-template.png?w=2048&fm=webp 2048w, https://images.microcms-assets.io/assets/88f12f69f3bd4e13b769561fe720d255/04a3790c7ab94dff9379025420f60040/blog-template.png?w=3840&fm=webp 3840w";

		expect(srcset).toEqual(expectedSrcset);

		// <picture>タグ内の <img>タグの srcset 属性を比較
		const imgTags = $("picture img");
		const imgSrcset = imgTags.attr("srcset");
		const expectedImgSrcset =
			"https://images.microcms-assets.io/assets/88f12f69f3bd4e13b769561fe720d255/04a3790c7ab94dff9379025420f60040/blog-template.png?w=640 640w, https://images.microcms-assets.io/assets/88f12f69f3bd4e13b769561fe720d255/04a3790c7ab94dff9379025420f60040/blog-template.png?w=750 750w, https://images.microcms-assets.io/assets/88f12f69f3bd4e13b769561fe720d255/04a3790c7ab94dff9379025420f60040/blog-template.png?w=828 828w, https://images.microcms-assets.io/assets/88f12f69f3bd4e13b769561fe720d255/04a3790c7ab94dff9379025420f60040/blog-template.png?w=1080 1080w, https://images.microcms-assets.io/assets/88f12f69f3bd4e13b769561fe720d255/04a3790c7ab94dff9379025420f60040/blog-template.png?w=1200 1200w, https://images.microcms-assets.io/assets/88f12f69f3bd4e13b769561fe720d255/04a3790c7ab94dff9379025420f60040/blog-template.png?w=1920 1920w, https://images.microcms-assets.io/assets/88f12f69f3bd4e13b769561fe720d255/04a3790c7ab94dff9379025420f60040/blog-template.png?w=2048 2048w, https://images.microcms-assets.io/assets/88f12f69f3bd4e13b769561fe720d255/04a3790c7ab94dff9379025420f60040/blog-template.png?w=3840 3840w";

		expect(imgSrcset).toEqual(expectedImgSrcset);

		// sizes 属性が正しいかをチェック
		const sizes = sourceTags.attr("sizes");
		const expectedSizes = "(max-width: 640px) 100vw, 1200px";

		expect(sizes).toEqual(expectedSizes);

		// width 属性が正しいかをチェック
		const width = sourceTags.attr("width");
		const expectedWidth = "1200";

		expect(width).toEqual(expectedWidth);

		// height 属性が正しいかをチェック
		const height = sourceTags.attr("height");
		const expectedHeight = "630";

		expect(height).toEqual(expectedHeight);
	});

	test("正常系: 指定したattributesが使われること", () => {
		const $ = cheerioLoad(`<figure>
			<img
				src="https://images.microcms-assets.io/assets/88f12f69f3bd4e13b769561fe720d255/04a3790c7ab94dff9379025420f60040/blog-template.png"
				alt=""
				width="1200"
				height="630"
			>
		</figure>`);

		responsiveImageTransformer({
			attributes: {
				style: "border: 1px solid red",
			},
		})($);

		// <picture>タグの中の <img>タグを抽出
		const sourceTags = $("picture img");

		// style 属性が正しいかをチェック
		const style = sourceTags.attr("style");
		const expectedStyle = "border: 1px solid red";

		expect(style).toEqual(expectedStyle);
	});

	test("正常系: formats が指定されている場合はそれを使う", () => {
		const $ = cheerioLoad(`<figure>
      <img
        src="https://images.microcms-assets.io/assets/88f12f69f3bd4e13b769561fe720d255/04a3790c7ab94dff9379025420f60040/blog-template.png"
        alt=""
        width="1200"
        height="630"
      >
    </figure>`);

		responsiveImageTransformer({
			attributes: { sizes: "(max-width: 640px) 100vw, 1200px" },
			formats: ["webp", "avif"],
		})($);

		// <picture>タグの中の <source>タグを抽出
		const sourceTags = $("picture source");

		// ここでは srcset 属性を比較
		const srcset = sourceTags.attr("srcset");
		const expectedSrcset =
			"https://images.microcms-assets.io/assets/88f12f69f3bd4e13b769561fe720d255/04a3790c7ab94dff9379025420f60040/blog-template.png?w=640&fm=avif 640w, https://images.microcms-assets.io/assets/88f12f69f3bd4e13b769561fe720d255/04a3790c7ab94dff9379025420f60040/blog-template.png?w=750&fm=avif 750w, https://images.microcms-assets.io/assets/88f12f69f3bd4e13b769561fe720d255/04a3790c7ab94dff9379025420f60040/blog-template.png?w=828&fm=avif 828w, https://images.microcms-assets.io/assets/88f12f69f3bd4e13b769561fe720d255/04a3790c7ab94dff9379025420f60040/blog-template.png?w=1080&fm=avif 1080w, https://images.microcms-assets.io/assets/88f12f69f3bd4e13b769561fe720d255/04a3790c7ab94dff9379025420f60040/blog-template.png?w=1200&fm=avif 1200w, https://images.microcms-assets.io/assets/88f12f69f3bd4e13b769561fe720d255/04a3790c7ab94dff9379025420f60040/blog-template.png?w=1920&fm=avif 1920w, https://images.microcms-assets.io/assets/88f12f69f3bd4e13b769561fe720d255/04a3790c7ab94dff9379025420f60040/blog-template.png?w=2048&fm=avif 2048w, https://images.microcms-assets.io/assets/88f12f69f3bd4e13b769561fe720d255/04a3790c7ab94dff9379025420f60040/blog-template.png?w=3840&fm=avif 3840w";

		expect(srcset).toEqual(expectedSrcset);

		// <picture>タグ内の <img>タグの srcset 属性を比較
		const imgTags = $("picture img");
		const imgSrcset = imgTags.attr("srcset");
		const expectedImgSrcset =
			"https://images.microcms-assets.io/assets/88f12f69f3bd4e13b769561fe720d255/04a3790c7ab94dff9379025420f60040/blog-template.png?w=640&fm=webp 640w, https://images.microcms-assets.io/assets/88f12f69f3bd4e13b769561fe720d255/04a3790c7ab94dff9379025420f60040/blog-template.png?w=750&fm=webp 750w, https://images.microcms-assets.io/assets/88f12f69f3bd4e13b769561fe720d255/04a3790c7ab94dff9379025420f60040/blog-template.png?w=828&fm=webp 828w, https://images.microcms-assets.io/assets/88f12f69f3bd4e13b769561fe720d255/04a3790c7ab94dff9379025420f60040/blog-template.png?w=1080&fm=webp 1080w, https://images.microcms-assets.io/assets/88f12f69f3bd4e13b769561fe720d255/04a3790c7ab94dff9379025420f60040/blog-template.png?w=1200&fm=webp 1200w, https://images.microcms-assets.io/assets/88f12f69f3bd4e13b769561fe720d255/04a3790c7ab94dff9379025420f60040/blog-template.png?w=1920&fm=webp 1920w, https://images.microcms-assets.io/assets/88f12f69f3bd4e13b769561fe720d255/04a3790c7ab94dff9379025420f60040/blog-template.png?w=2048&fm=webp 2048w, https://images.microcms-assets.io/assets/88f12f69f3bd4e13b769561fe720d255/04a3790c7ab94dff9379025420f60040/blog-template.png?w=3840&fm=webp 3840w";

		expect(imgSrcset).toEqual(expectedImgSrcset);
	});

	test("正常系: deviceSizes が指定されている場合はそれを使う", () => {
		const $ = cheerioLoad(`<figure>
      <img
        src="https://images.microcms-assets.io/assets/88f12f69f3bd4e13b769561fe720d255/04a3790c7ab94dff9379025420f60040/blog-template.png"
        alt=""
        width="1200"
        height="630"
      >
    </figure>`);

		responsiveImageTransformer({
			attributes: { sizes: "(max-width: 640px) 100vw, 1200px" },
			deviceSizes: [640, 750, 828],
		})($);

		// <picture>タグの中の <source>タグを抽出
		const sourceTags = $("picture source");

		// ここでは srcset 属性を比較
		const srcset = sourceTags.attr("srcset");
		const expectedSrcset =
			"https://images.microcms-assets.io/assets/88f12f69f3bd4e13b769561fe720d255/04a3790c7ab94dff9379025420f60040/blog-template.png?w=640&fm=webp 640w, https://images.microcms-assets.io/assets/88f12f69f3bd4e13b769561fe720d255/04a3790c7ab94dff9379025420f60040/blog-template.png?w=750&fm=webp 750w, https://images.microcms-assets.io/assets/88f12f69f3bd4e13b769561fe720d255/04a3790c7ab94dff9379025420f60040/blog-template.png?w=828&fm=webp 828w";

		expect(srcset).toEqual(expectedSrcset);

		// <picture>タグ内の <img>タグの srcset 属性を比較
		const imgTags = $("picture img");
		const imgSrcset = imgTags.attr("srcset");
		const expectedImgSrcset =
			"https://images.microcms-assets.io/assets/88f12f69f3bd4e13b769561fe720d255/04a3790c7ab94dff9379025420f60040/blog-template.png?w=640 640w, https://images.microcms-assets.io/assets/88f12f69f3bd4e13b769561fe720d255/04a3790c7ab94dff9379025420f60040/blog-template.png?w=750 750w, https://images.microcms-assets.io/assets/88f12f69f3bd4e13b769561fe720d255/04a3790c7ab94dff9379025420f60040/blog-template.png?w=828 828w";

		expect(imgSrcset).toEqual(expectedImgSrcset);
	});

	test("正常系: imgタグが存在しない場合は何もしない", () => {
		const $ = cheerioLoad("<div></div>");

		responsiveImageTransformer({
			attributes: { sizes: "(max-width: 640px) 100vw, 1200px" },
			formats: ["default", "webp"],
		})($);

		expect($.html()).toEqual("<div></div>");
	});

	test("異常系: formats に不正な値が含まれている場合はエラー", () => {
		const $ = cheerioLoad("<div></div>");

		expect(() =>
			responsiveImageTransformer({
				attributes: { sizes: "(max-width: 640px) 100vw, 1200px" },
				// @ts-ignore
				formats: ["default", "invalid"],
			})($),
		).toThrowError("Invalid format: invalid");
	});

	test("異常系: formats に重複する値が含まれている場合は警告", () => {
		const $ = cheerioLoad("<div></div>");

		const consoleWarnSpy = vi.spyOn(console, "warn");

		responsiveImageTransformer({
			attributes: { sizes: "(max-width: 640px) 100vw, 1200px" },
			formats: ["default", "default"],
		})($);

		expect(consoleWarnSpy).toHaveBeenCalledWith(
			"Duplicate formats are removed",
		);

		consoleWarnSpy.mockRestore();
	});

	test("異常系: deviceSizes に重複する値が含まれている場合は警告", () => {
		const $ = cheerioLoad("<div></div>");

		const consoleWarnSpy = vi.spyOn(console, "warn");

		responsiveImageTransformer({
			attributes: { sizes: "(max-width: 640px) 100vw, 1200px" },
			deviceSizes: [640, 640],
		})($);

		expect(consoleWarnSpy).toHaveBeenCalledWith(
			"Duplicate deviceSizes are removed",
		);

		consoleWarnSpy.mockRestore();
	});

	test("異常系: formats が空の場合はエラー", () => {
		const $ = cheerioLoad(`<figure>
      <img
        src="https://images.microcms-assets.io/assets/88f12f69f3bd4e13b769561fe720d255/04a3790c7ab94dff9379025420f60040/blog-template.png"
        alt=""
        width="1200"
        height="630"
      >
    </figure>`);

		expect(() =>
			responsiveImageTransformer({
				attributes: { sizes: "(max-width: 640px) 100vw, 1200px" },
				formats: [],
			})($),
		).toThrowError("At least one format must be specified");
	});
});
