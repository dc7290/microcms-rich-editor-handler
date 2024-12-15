import type { CheerioAPI } from "cheerio";

export type Transformer = ($: CheerioAPI) => Promise<void> | void;
