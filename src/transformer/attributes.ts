import type { Cheerio, SelectorType } from "cheerio";
import type { Element } from "domhandler";
import type { Transformer } from "./types";

type Options = {
	/**
	 * 処理したい要素の一覧
	 */
	elements: {
		/**
		 * 要素名
		 */
		[tagName: string]: {
			/**
			 * 追加した属性名と値の一覧
			 * 単純文字列のほかに対象の要素を引数に取る関数を指定することもできる
			 */
			addAttributes: {
				[attributeName: string]:
					| string
					| (($element: Cheerio<Element>) => string);
			};
		};
	};
};

/**
 * 任意の要素に対して属性を追加したり変更したりする
 */
const attributesTransformer: (options: Options) => Transformer =
	(options) => ($) => {
		for (const [_tagName, { addAttributes }] of Object.entries(
			options.elements,
		)) {
			const tagName = _tagName as SelectorType;

			$(tagName).each((_, element) => {
				const $element = $(element);
				for (const [attributeName, attributeValue] of Object.entries(
					addAttributes,
				)) {
					if (typeof attributeValue === "string") {
						$element.attr(attributeName, attributeValue);
					} else {
						$element.attr(attributeName, attributeValue($element));
					}
				}
			});
		}
	};

export default attributesTransformer;
