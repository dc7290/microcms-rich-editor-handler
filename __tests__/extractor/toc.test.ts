import { describe, expect, test } from "vitest";
import tocExtractor from "../../src/extractor/toc";
import { cheerioLoad } from "../test-utils";

describe("tocExtractor", () => {
	test("正常系: 目次が抽出できる", async () => {
		const html = `
      <h1 id="h1">見出し1</h1>
      <h2 id="h2">見出し2</h2>
      <h3 id="h3">見出し3</h3>
    `;
		const $ = cheerioLoad(html);
		const result = await tocExtractor()($);
		expect(result).toEqual([
			{ id: "h1", text: "見出し1", level: 1 },
			{ id: "h2", text: "見出し2", level: 2 },
			{ id: "h3", text: "見出し3", level: 3 },
		]);
	});

	test("正常系: ignoreLevelsが指定された場合、その見出しを除外する", async () => {
		const html = `
			<h1 id="h1">見出し1</h1>
			<h2 id="h2">見出し2</h2>
			<h3 id="h3">見出し3</h3>
			<h4 id="h4">見出し4</h4>
			<h5 id="h5">見出し5</h5>
		`;
		const $ = cheerioLoad(html);
		const result = await tocExtractor({ ignoreLevels: [4, 5] })($);
		expect(result).toEqual([
			{ id: "h1", text: "見出し1", level: 1 },
			{ id: "h2", text: "見出し2", level: 2 },
			{ id: "h3", text: "見出し3", level: 3 },
		]);
	});

	test("異常系: ignoreLevelsに不正な値が指定された場合はエラー", async () => {
		const html = `
			<h1 id="h1">見出し1</h1>
			<h2 id="h2">見出し2</h2>
			<h3 id="h3">見出し3</h3>
			<h4 id="h4">見出し4</h4>
			<h5 id="h5">見出し5</h5>
		`;
		const $ = cheerioLoad(html);
		await expect(() =>
			// @ts-ignore
			tocExtractor({ ignoreLevels: [6] })($),
		).rejects.toThrowError("Invalid level: 6");
	});
});
