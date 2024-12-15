import type { Transformer } from "./types";

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
) => Transformer = (options) => ($) => {
	// バリデーション
	if (options?.formats) {
		for (const format of options.formats) {
			if (!validFormats.includes(format)) {
				throw new Error(`Invalid format: ${format}`);
			}
		}
		const uniqueFormats = [...new Set(options.formats)];
		if (uniqueFormats.length !== options.formats.length) {
			console.warn("Duplicate formats are removed");
		}
	}
	if (options?.deviceSizes) {
		const uniqueDeviceSizes = [...new Set(options.deviceSizes)];
		if (uniqueDeviceSizes.length !== options.deviceSizes.length) {
			console.warn("Duplicate deviceSizes are removed");
		}
	}

	const attributes = {
		...options?.attributes,
		sizes: options?.attributes?.sizes ?? "100vw",
		loading: options?.attributes?.loading ?? "lazy",
		decoding: options?.attributes?.decoding ?? "async",
	};

	// deviceSizesが指定されている場合は、それを使う
	const deviceSizes = options?.deviceSizes?.sort((a, b) => a - b) ?? [
		640, 750, 828, 1080, 1200, 1920, 2048, 3840,
	];
	// formatsが指定されている場合は、それを使う
	const formats = options?.formats ?? ["default", "webp"];

	// imgタグを取得
	const imgElements = $("img");
	if (!imgElements.length) {
		return;
	}

	// それぞれのimgタグに対して処理を行う
	imgElements.each((_, img) => {
		const $img = $(img);
		const src = $img.attr("src");
		if (!src) {
			return;
		}

		// 画像の幅と高さを取得
		const width = $img.attr("width");
		const height = $img.attr("height");

		// pictureタグを生成
		const $picture = $("<picture>");

		// sourceタグを生成
		const sourceFormats = formats.slice(1);
		const defaultFormat = formats[0];
		if (defaultFormat === undefined) {
			throw new Error("At least one format must be specified");
		}
		if (sourceFormats.length > 0) {
			for (const format of sourceFormats.reverse()) {
				const $source = $("<source>");
				if (format !== "default") {
					$source.attr("type", `image/${format}`);
				}
				$source.attr("sizes", attributes.sizes);
				$source.attr("width", width);
				$source.attr("height", height);
				$source.attr("srcset", buildSrcset(src, deviceSizes, format));
				$picture.append($source);
			}
		}

		// imgタグを生成
		const $imgClone = $img.clone();
		for (const [key, value] of Object.entries(attributes)) {
			$imgClone.attr(key, value);
		}
		$imgClone.attr("width", width);
		$imgClone.attr("height", height);
		$imgClone.attr("srcset", buildSrcset(src, deviceSizes, defaultFormat));
		$picture.append($imgClone);

		// imgタグをpictureタグに置き換える
		$img.replaceWith($picture);
	});
};

const buildSrcset = (src: string, deviceSizes: number[], format: string) => {
	return deviceSizes
		.map(
			(size) =>
				`${src}?w=${size}${format === "default" ? "" : `&fm=${format}`} ${size}w`,
		)
		.join(", ");
};

export default responsiveImageTransformer;
