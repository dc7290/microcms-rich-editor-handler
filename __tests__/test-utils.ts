import * as cheerio from "cheerio";

export const cheerioLoad = (html: string) => cheerio.load(html, {}, false);
