import * as cheerio from "cheerio/slim";
import type { Extractor } from "./extractor/types";
import type { Transformer } from "./transformer/types";

type DefaultGenerics = Record<
	string,
	[
		extractor: Extractor<unknown>,
		options?: MicroCMSRichEditorHandlerExtractorOptions,
	]
>;

type MicroCMSRichEditorHandlerExtractorOptions = {
	phase?: "before" | "after" | undefined;
};
type MicroCMSRichEditorHandlerOptions<T extends DefaultGenerics> = {
	transformers?: Transformer[] | undefined;
	extractors?: T | undefined;
};
type MicroCMSRichEditorHandlerReturn<T extends DefaultGenerics> = {
	html: string;
	data: {
		[K in keyof T]: T[K][0] extends Extractor<infer R> ? R : never;
	};
};

export const microCMSRichEditorHandler = async <T extends DefaultGenerics>(
	html: string,
	options: MicroCMSRichEditorHandlerOptions<T>,
): Promise<MicroCMSRichEditorHandlerReturn<T>> => {
	const $ = cheerio.load(html, {}, false);

	const data: Record<string, unknown> = {};

	if (options.extractors) {
		for (const [key, [extractor, extractorOptions]] of Object.entries(
			options.extractors,
		)) {
			if (extractorOptions?.phase === "before") {
				const $clone = cheerio.load($.html(), {}, false);
				const result = await extractor($clone);
				data[key] = result;
			}
		}
	}

	if (options.transformers) {
		for (const transformer of options.transformers) {
			await transformer($);
		}
	}

	if (options.extractors) {
		for (const [key, [extractor, extractorOptions]] of Object.entries(
			options.extractors,
		)) {
			if (
				extractorOptions?.phase === "after" ||
				extractorOptions?.phase === undefined
			) {
				const $clone = cheerio.load($.html(), {}, false);
				const result = await extractor($clone);
				data[key] = result;
			}
		}
	}

	return {
		html: $.html(),
		data: data as MicroCMSRichEditorHandlerReturn<T>["data"],
	};
};

export * from "./transformer";
export * from "./extractor";
