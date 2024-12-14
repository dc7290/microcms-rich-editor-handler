import type { CheerioAPI } from "cheerio";

export type Extractor<T> = ($: CheerioAPI) => Promise<T>;
