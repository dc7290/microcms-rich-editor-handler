import type { BundledLanguage, BundledTheme, CodeToHastOptions } from "shiki";

import type { Transformer } from "./types";

type Options = {
	/**
	 * 言語ごとのシンタックスハイライトの設定
	 */
	highlightOptions?:
		| Partial<
				Record<
					BundledLanguage,
					CodeToHastOptions<BundledLanguage, BundledTheme>
				>
		  >
		| undefined;
	/**
	 * highlightOptionsで設定していない言語やmicroCMSのコードブロックに言語が指定されていない場合の設定
	 */
	defaultHighlightOptions: CodeToHastOptions<BundledLanguage, BundledTheme>;
};

/**
 * preタグ内のコードブロックをshikiを使ってシンタックスハイライトする
 */
const syntaxHighlightingByShikiTransformer: (options: Options) => Transformer =
	(options) => async ($) => {
		// バリデーション
		if (!options) {
			throw new Error("options is required");
		}
		if (!options.defaultHighlightOptions) {
			throw new Error("defaultHighlightOptions is required");
		}

		// preタグを取得
		const preElements = $("pre");
		if (preElements.length === 0) {
			return;
		}

		const { bundledLanguages, codeToHtml } = await import("shiki");

		// それぞれのpreタグに対して処理を行う
		for (const preElement of preElements) {
			const $preElement = $(preElement);
			const $codeElement = $preElement.find("code");

			const code = $codeElement.text();

			const originalLanguageValue = $codeElement
				.attr("class")
				?.replace("language-", "");

			let html: string;

			// 言語が指定されていない場合はデフォルトのオプションでハイライト
			if (!assertLanguage(bundledLanguages, originalLanguageValue)) {
				html = await codeToHtml(code, options.defaultHighlightOptions);
			} else {
				const highlightOption =
					options.highlightOptions?.[originalLanguageValue];
				if (!highlightOption) {
					console.warn(
						`Highlight option for ${originalLanguageValue} is not found. Use default option.`,
					);
					html = await codeToHtml(code, options.defaultHighlightOptions);
				} else {
					html = await codeToHtml(code, highlightOption);
				}
			}

			// preタグを置換
			$preElement.replaceWith(html);
		}
	};

const assertLanguage = (
	bundledLanguages: typeof import("shiki").bundledLanguages,
	language?: string | undefined,
): language is BundledLanguage => {
	if (!language) {
		return false;
	}
	if (!Object.keys(bundledLanguages).includes(language)) {
		return false;
	}
	return true;
};

export default syntaxHighlightingByShikiTransformer;
