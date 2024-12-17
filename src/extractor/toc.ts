import type { Extractor } from "./types";

const defaultTargetLevels = [1, 2, 3, 4, 5] as const;

type Options = {
	/**
	 * 目次を生成する際に無視する見出しのレベル
	 */
	ignoreLevels?: (typeof defaultTargetLevels)[number][];
};

type TocItem = {
	id: string;
	text: string;
	level: number;
};

// 目次リストを抽出する
const tocExtractor: (options?: Options | undefined) => Extractor<TocItem[]> =
	(options) => async ($) => {
		// バリデーション
		if (options?.ignoreLevels) {
			for (const level of options.ignoreLevels) {
				if (!defaultTargetLevels.includes(level)) {
					throw new Error(`Invalid level: ${level}`);
				}
			}
		}

		const toc: TocItem[] = [];

		const ignoreLevels = options?.ignoreLevels ?? [];
		const targetLevels = defaultTargetLevels
			.filter((level) => !ignoreLevels.includes(level))
			.map((level) => `h${level}`)
			.join(", ");

		$(targetLevels).each((_, heading) => {
			const $heading = $(heading);
			const id = $heading.attr("id");
			if (!id) {
				return;
			}
			const text = $heading.text();
			const level = parseHeadingLevel($heading.prop("tagName"));
			if (level === 0) {
				return;
			}
			toc.push({ id, text, level });
		});

		return toc;
	};

const parseHeadingLevel = (tagName: string | undefined) => {
	if (!tagName) {
		return 0;
	}
	return Number.parseInt(tagName.slice(1), 10);
};

export default tocExtractor;
