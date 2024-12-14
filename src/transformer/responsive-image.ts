import type { Transformer } from "./types";

const validFormats = ["default", "webp", "avif"] as const;

type Options = {
	/**
	 * img, sourceタグの属性に指定する値
	 * imgタグとsourceタグの両方に指定されるものとimgタグのみに指定されるものがある
	 */
	attributes?: {
		/**
		 * img, sourceタグのsizes属性に指定する値
		 */
		sizes?: string;
		/**
		 * imgタグのloading属性に指定する値
		 */
		loading?: "lazy" | "eager";

		[key: string]: string | undefined;
	};
	formats?: (typeof validFormats)[number][] | undefined;
	deviceSizes?: number[] | undefined;
};

// imgタグをpictureタグを使用したレスポンシブ画像に変換する
const responsiveImageTransformer: (
	options?: Options | undefined,
) => Transformer = (options) => async ($) => {
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
		$imgClone.attr("sizes", attributes.sizes);
		$imgClone.attr("loading", attributes.loading);
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
