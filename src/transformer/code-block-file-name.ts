import type { Transformer } from "./types";

type Options = {
	/**
	 * ファイル名を表示する要素のタグ名
	 * デフォルトは span
	 */
	tagName?: string | undefined
	/**
	 * ファイル名を表示する要素に追加する属性
	 */
	attributes?: Record<string, string> | undefined;
};

/**
 * コードブロックのファイル名を表示する
 */
const codeBlockFileNameTransformer: (options?: Options | undefined) => Transformer =
	(options) => ($) => {

		const tagName = options?.tagName ?? "span";
		const attributes = options?.attributes ?? {};

		const $filenameElement = $(`<${tagName}>`).attr(attributes);

		// div[data-filename] それぞれの要素にファイル名を表示する
		$("div[data-filename]").each((_, elm) => {
			const $elm = $(elm);
			const filename = $elm.attr("data-filename")

			if (!filename) {
				return;
			}

			// コードブロックの前にファイル名を表示する
			$filenameElement.text(filename);
			$elm.prepend($filenameElement.clone());
		});
	};

export default codeBlockFileNameTransformer;