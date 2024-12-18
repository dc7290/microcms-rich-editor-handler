import { describe, expect, test } from "vitest";
import codeBlockFileNameTransformer from "../../src/transformer/code-block-file-name";
import { cheerioLoad } from "../test-utils";

describe("codeBlockFileNameTransformer", () => {
  test("正常系: コードブロックの前にファイル名が表示されること", async () => {
    const $ = cheerioLoad(`
      <div data-filename="test.js">
        <pre><code>console.log("test");</code></pre>
      </div>
    `);

    codeBlockFileNameTransformer()($);

    expect($.html()).toBe(`
      <div data-filename="test.js"><span>test.js</span>
        <pre><code>console.log("test");</code></pre>
      </div>
    `);
  });

  test("正常系: タグ名と属性が指定された場合、それが適用されること", async () => {
    const $ = cheerioLoad(`
      <div data-filename="test.js">
        <pre><code>console.log("test");</code></pre>
      </div>
    `);

    codeBlockFileNameTransformer({
      tagName: "p",
      attributes: {
        class: "test-class",
      },
    })($);

    expect($.html()).toBe(`
      <div data-filename="test.js"><p class="test-class">test.js</p>
        <pre><code>console.log("test");</code></pre>
      </div>
    `);
  });
});